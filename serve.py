#!/usr/bin/env python3
"""Serve this folder and proxy Volcengine Ark image calls.

Agent Plan's /api/plan/v3 does not allow the Authorization header in
browser CORS, so the page must go through this same-origin proxy.

  python3 serve.py
  open http://127.0.0.1:8765/
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import re
import ssl
import sys
import uuid
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import HTTPSHandler, ProxyHandler, Request, build_opener

ROOT = Path(__file__).resolve().parent
PROCESSED = ROOT / "processed"
ARK_API = "https://ark.cn-beijing.volces.com/api/v3/images/generations"
ARK_PLAN_API = "https://ark.cn-beijing.volces.com/api/plan/v3/images/generations"
CTX = ssl.create_default_context()
# Cursor/sandbox HTTP_PROXY would 403 CONNECT to volcengine; talk to Ark directly.
for _k in (
    "HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY",
    "http_proxy", "https_proxy", "all_proxy",
):
    os.environ.pop(_k, None)
OPENER = build_opener(ProxyHandler({}), HTTPSHandler(context=CTX))


def save_generated_image(raw: bytes) -> tuple[str, str]:
    PROCESSED.mkdir(parents=True, exist_ok=True)
    ext = ".png" if raw[:8] == b"\x89PNG\r\n\x1a\n" else ".jpg"
    name = datetime.now().strftime("%Y%m%d-%H%M%S") + "-" + uuid.uuid4().hex[:6] + ext
    path = PROCESSED / name
    path.write_bytes(raw)
    sys.stderr.write("saved %s (%d bytes)\n" % (path, len(raw)))
    return "/processed/" + name, str(path)


def persist_and_inline(data: bytes) -> bytes:
    try:
        payload = json.loads(data.decode("utf-8"))
    except Exception:
        return data
    items = payload.get("data")
    if isinstance(items, dict):
        items = [items]
    if not isinstance(items, list) or not items:
        return data
    item = items[0] if isinstance(items[0], dict) else {}
    raw = None
    b64 = item.get("b64_json") or item.get("base64")
    if isinstance(b64, str) and b64:
        try:
            raw = base64.b64decode(b64)
        except Exception:
            raw = None
    url = item.get("url")
    if raw is None and isinstance(url, str) and url.startswith("http"):
        try:
            with OPENER.open(url, timeout=60) as img:
                raw = img.read()
            item["b64_json"] = base64.b64encode(raw).decode("ascii")
            item.pop("url", None)
        except Exception as err:
            sys.stderr.write("inline image failed: %s\n" % err)
    if raw:
        local_url, local_path = save_generated_image(raw)
        item["local_url"] = local_url
        item["local_path"] = local_path
        if not item.get("b64_json"):
            item["b64_json"] = base64.b64encode(raw).decode("ascii")
        payload["data"] = [item]
        return json.dumps(payload).encode("utf-8")
    sys.stderr.write("ark response had no image bytes to save\n")
    return data


def cors(handler: SimpleHTTPRequestHandler) -> None:
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
    handler.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt: str, *args) -> None:
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def send_head(self):
        for key in ("If-Modified-Since", "If-None-Match"):
            if key in self.headers:
                try:
                    del self.headers[key]
                except Exception:
                    pass
        return super().send_head()

    def _send_index(self) -> None:
        html_path = ROOT / "index.html"
        css_m = int((ROOT / "styles.css").stat().st_mtime)
        js_m = int((ROOT / "app.js").stat().st_mtime)
        stamp = "%s-%s" % (css_m, js_m)
        html = html_path.read_text(encoding="utf-8")
        html = re.sub(r'href="styles\.css(\?[^"]*)?"', 'href="styles.css?v=%s"' % stamp, html)
        html = re.sub(r'src="app\.js(\?[^"]*)?"', 'src="app.js?v=%s"' % stamp, html)
        if "data-build=" in html:
            html = re.sub(r'data-build="[^"]*"', 'data-build="%s"' % stamp, html)
        else:
            html = html.replace("<html lang=\"zh-CN\">", '<html lang="zh-CN" data-build="%s">' % stamp, 1)
        raw = html.encode("utf-8")
        self.send_response(200)
        cors(self)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        cors(self)
        self.end_headers()

    def do_GET(self) -> None:
        for key in ("If-Modified-Since", "If-None-Match"):
            if self.headers.get(key):
                try:
                    del self.headers[key]
                except Exception:
                    pass
        route = self.path.split("?", 1)[0]
        if route in ("/", "/index.html"):
            self._send_index()
            return
        if route == "/ark/ok":
            payload = b'{"ok":true}'
            self.send_response(200)
            cors(self)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()

    def do_POST(self) -> None:
        if self.path.split("?", 1)[0] != "/ark/images":
            self.send_error(404)
            return
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length) if length else b"{}"
        auth = self.headers.get("Authorization") or ""
        token = auth.split(" ", 1)[-1].strip()
        try:
            parsed = json.loads(body.decode("utf-8"))
            img = parsed.get("image")
            if isinstance(img, str) and img.startswith("data:"):
                parsed["image"] = [img]
            refs = parsed.get("image") or parsed.get("images") or []
            sys.stderr.write("ark refs=%s model=%s size=%s\n" % (
                len(refs) if isinstance(refs, list) else int(bool(refs)),
                parsed.get("model"),
                parsed.get("size"),
            ))
            body = json.dumps(parsed).encode("utf-8")
        except Exception:
            pass
        upstream = ARK_PLAN_API if token.lower().startswith("ark-") else ARK_API
        headers = {"Content-Type": "application/json"}
        if auth:
            headers["Authorization"] = auth
        req = Request(upstream, data=body, headers=headers, method="POST")
        try:
            with OPENER.open(req, timeout=180) as resp:
                data = persist_and_inline(resp.read())
                self.send_response(resp.status)
                cors(self)
                self.send_header("Content-Type", resp.headers.get("Content-Type", "application/json"))
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
        except HTTPError as err:
            data = err.read() or json.dumps({"error": {"message": str(err)}}).encode()
            self.send_response(err.code)
            cors(self)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except URLError as err:
            data = json.dumps({"error": {"message": "连不上火山方舟：%s" % err.reason}}).encode()
            self.send_response(502)
            cors(self)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    PROCESSED.mkdir(parents=True, exist_ok=True)
    print("做本画册  http://127.0.0.1:%s/" % args.port)
    print("火山方舟改图走本地代理，避免浏览器跨域。")
    print("处理后的图会保存到  %s" % PROCESSED)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nstopped")


if __name__ == "__main__":
    main()
