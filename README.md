# 做本画册（chronological-images）

按年份整理的本地电子画册：把照片编成可翻页的相册，也可以填自己的 API Key，按选定风格生成处理后的图。风格里封装了一部分效果较好的 skill，也可以自行添加 prompt。


## 需要什么

- [Python 3](https://www.python.org/downloads/)
- 风格化处理服务需要 API Key
目前主要跑通了**火山方舟**；页面里也有其他厂商的填写位置，但那些 Key 尚未完整实测。

没有 Key 也能做画册、换滤镜、简单排版、导出 PDF，只是不能跑风格生图。

## 怎么开

```bash
git clone https://github.com/lithlab/chronological-images.git
cd chronological-images
python3 serve.py
```

换端口：

```bash
python3 serve.py --port 8765
```

Windows 一般用 `python`：

```bash
cd chronological-images
python serve.py
```

1. 先 clone 到你自己电脑，进入本目录，**再跑** `python3 serve.py`。等终端出现提示，再打开下面的地址。
2. 浏览器打开 **http://127.0.0.1:8765/** 。`127.0.0.1` 是你自己这台电脑，不是网上的网站。没跑 `serve.py` 就粘贴这个地址，页面打不开。
3. 不要直接双击 `index.html`。必须通过 `serve.py` 用这个地址打开。

## 填写 API Key

1. 打开一本画册，进入编辑。
2. 在「照片处理风格」下选一家厂商。
3. 把你自己的 Key 贴进 **apikey**。

Key **只存在本机浏览器**（不会上传到本仓库；本项目也没有云端账号系统）。换电脑或换浏览器需要重新填一次。

**火山方舟必须走 `serve.py` 代理**，不要指望双击 HTML 就能直连。

