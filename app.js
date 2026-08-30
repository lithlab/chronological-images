(() => {
  const STORE_KEY = "lithlab.html003.v1";
  const FOLD_KEY = "lithlab.html003.panelFold.v3";
  const STYLES = [
    { id: "polaroid", name: "宝丽来", mini: [[8, 10, 24, 48], [38, 18, 52, 34]] },
    { id: "scrapbook", name: "手帐拼贴", mini: [[8, 10, 38, 42], [42, 36, 46, 40]] },
    { id: "editorial", name: "杂志编辑", mini: [[0, 0, 48, 100], [52, 0, 48, 100]] },
  ];
  const STYLE_ALIAS = { film: "editorial", airy: "editorial" };
  const PAGE_ASPECT = 430 / 600;
  const POLAROID_FORMATS = {
    mini: { cardW: 54, cardH: 86 },
    square: { cardW: 72, cardH: 86 },
    wide: { cardW: 108, cardH: 86 },
  };
  const FILTERS = [
    { id: "none", name: "原片" },
    { id: "classic-chrome", name: "Classic Chrome" },
    { id: "pro-neg-hi", name: "Pro Neg Hi" },
    { id: "velvia", name: "Velvia" },
    { id: "astia", name: "Astia" },
    { id: "400h", name: "400H" },
  ];
  const PROCESS_STYLES = [
    { id: "none", name: "原片", note: "不处理" },
    { id: "surreal-pop-collage", name: "surreal-pop-collage", note: "超现实波普拼贴", skill: true },
    { id: "sunwoven-reverie", name: "sunwoven-reverie", note: "晴织画境插画", skill: true },
    { id: "selective-ink-sketch", name: "selective-ink-sketch", note: "取舍钢笔速写", skill: true },
    { id: "scene-to-art-lab", name: "scene-to-art-lab", note: "场景转艺术（水彩）", skill: true },
    { id: "travel-memory-sticker-card", name: "travel-memory-sticker-card", note: "旅行记忆贴纸卡", skill: true },
    { id: "travel-memory-card-duo", name: "travel-memory-card-duo", note: "旅行记忆双联卡", skill: true, hidden: true },
  ];
  const PROCESS_ALIAS = {
    "01": "surreal-pop-collage",
    "02": "sunwoven-reverie",
    "03": "selective-ink-sketch",
    "04": "scene-to-art-lab",
  };
  const CUSTOM_PROCESS_KEY = "lithlab.html003.customProcess.v1";
  const API_STORE = "lithlab.html003.api.v2";
  const API_KEY_STORE = "lithlab.html003.geminiKey.v1";
  const API_PROVIDERS = [
    { id: "doubao", name: "火山方舟", needKey: true, ready: true, hint: "方舟 API Key。开通 Seedream 后按张从账户余额扣，一般不用另买套餐。" },
    { id: "gemini", name: "Gemini", needKey: true, untested: true, hint: "Google AI Studio Key。出图需付费结算。" },
    { id: "openai", name: "OpenAI", needKey: true, untested: true, hint: "OpenAI API Key，用 gpt-image-1 按原图改。" },
    { id: "dashscope", name: "通义", needKey: true, untested: true, hint: "阿里云百炼 DashScope Key，国内可申请。" },
    { id: "siliconflow", name: "SiliconFlow", needKey: true, untested: true, hint: "硅基流动 Key，国内可申请，常有免费额度。" },
  ];
  const ARK_DEFAULT_MODEL = "doubao-seedream-4-5-251128";
  const ARK_PLAN_MODEL = "doubao-seedream-5.0-lite";
  const OUTPUT_MAX_LONG = 2048;
  const OUTPUT_MAX_SHORT = 2048;
  const ARK_API = "https://ark.cn-beijing.volces.com/api/v3/images/generations";
  const ARK_CONSOLE = "https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement";
  const ARK_APIKEY_CONSOLE = "https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey";
  const ARK_ENDPOINT_CONSOLE = "https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint";
  const ARK_RECHARGE = "https://console.volcengine.com/finance/fund/recharge";
  const SKILL_PROMPTS = {
    "surreal-pop-collage": `Image-to-image edit of the attached photograph. Keep the same scene, subject, pose, framing, and identity. Do not generate a different picture.

surreal pop collage, vertical 3:4
keep the main subject clearly recognizable but desaturated to black and white, preserving its texture; do not cover faces
replace the background with 2-3 huge FLAT matte color shapes derived from colors already in this photo (purify a scene color, use a complement, or invert the mood); no gradients and no volumetric shadows; never default to a red sun or generic blue sky
exactly ONE impossible giant element grown from this scene: enlarge a tiny object already in the photo, pick the semantically farthest object, invert scale, or if this is a cultural landmark turn its most famous anecdote into one visible object; never default to dolphin or whale
add a small flock of scene-native extras in 3-5 graduated sizes along one arc, plus a few white hand-drawn graffiti strokes
the black-and-white reality collides with the flat color world; keep the image bright; no text, no watermark, no second giant object`,
    "sunwoven-reverie": `Image-to-image edit of the attached photograph. Keep recognizable people, pets, places, pose, and identity. Rebuild, do not trace or filter.

Sunwoven Reverie editorial gouache illustration, illustration strength 8/10
bright granular pigment in sunlight, never neon glow or slick plastic highlights
cool atmosphere (blue, teal, blue-violet) with a warm landing (terracotta, apricot, sun-yellow)
at least 75% of the image from 10-14 deliberate readable color shapes; 5-8 major background shapes
exactly ONE memorable graphic event: a diagonal sunbeam, luminous arc, orange path, oversized cast shadow, or negative-space wedge
breathing edges, no universal outline, no chibi, no photorealism, no text, no watermark`,
    "selective-ink-sketch": `Image-to-image edit of the attached photograph into an original monochrome observational pen-and-ink sketch. Keep subject identity, structure, pose, and proportion. Do not vector-trace the photo.

selective ink sketch on warm white paper
delete about 40-60% of visible information; one main density center only
use blank paper as sky, water, wall, or cloth; no even hatching everywhere
near-black ink lines with searching strokes, broken contours, and a few corrective overdraws
heavy lines only at structure, overlap, or identity anchors
finished sketch only: no hand, sketchbook, desk, watermark, or color wash`,
    "scene-to-art-lab": `Image-to-image edit of the attached photograph into a vertical 3:4 art-directed watercolor poster, not a styled photo.

scene-to-art-lab: watercolor only — wet-into-wet washes, paper white, pigment blooms; no screenprint, oil, or digital gloss
preserve only the identity anchors: people, pets, vehicles, or landmarks that carry recognition
redesign composition, color, mark, and space; one focal area resolved, other regions simplified or lost into paper
intentional lost-edge, open artwork edge, fresh palette from this photo
no signatures, watermarks, invented logos, or extra people`,
    "travel-memory-sticker-card": `Image-to-image edit of the attached photograph into one finished 3:2 horizontal collectible memory card.

warm off-white textured paper, 4-5% outer margin
left 66-68%: one large unframed near-square illustration with a shallow paper footer
exactly three short English keywords under the illustration, dotted: scene · light · place
right 30-32%: exactly six source-derived die-cut journaling stickers with irregular warm-white borders
rebuild from 5-8 broad matte gouache / cut-paper color families; quiet negative space
preserve one identification anchor in the same medium; no photo patch, title, date, watermark, or signature`,
    "travel-memory-card-duo": `Image-to-image edit of the attached photograph into one finished 3:2 horizontal travel memory card (the card half of a card-plus-sticker duo).

warm off-white uncoated paper, 4-5% outer margin
left 66-68%: large unframed illustration plus three dotted English keywords on exposed paper
right 30-32%: exactly six source-derived die-cut stickers, same medium as the illustration
matte gouache / cut-paper, blunt shapes, quiet space, no photorealism
no title, date, postal marks, watermark, or signature`,
  };
  function loadCustomProcesses() {
    try {
      const raw = localStorage.getItem(CUSTOM_PROCESS_KEY);
      if (!raw) return [];
      const list = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      return list.filter((item) => item && item.id && item.name).map((item) => ({
        id: String(item.id),
        name: String(item.name).slice(0, 48),
        note: String(item.note || "").slice(0, 24),
        prompt: String(item.prompt || ""),
        skill: true,
        custom: true,
      }));
    } catch (_) {
      return [];
    }
  }
  function saveCustomProcesses() {
    localStorage.setItem(CUSTOM_PROCESS_KEY, JSON.stringify(customProcesses.map((item) => ({
      id: item.id,
      name: item.name,
      note: item.note,
      prompt: item.prompt,
    }))));
  }
  function allProcessStyles() {
    return PROCESS_STYLES.concat(customProcesses);
  }
  function skillPrompt(processId) {
    const id = normalizeProcess(processId);
    const custom = customProcesses.find((s) => s.id === id);
    if (custom) return String(custom.prompt || "").trim();
    return SKILL_PROMPTS[id] || "";
  }
  const PAGE_NUM_OPTS = [
    {
      id: "none",
      label: "不要页码",
      icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 10l12 12M22 10L10 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    },
    {
      id: "center",
      label: "页码居中",
      icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3.5" y="5.5" width="11.5" height="21" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="17" y="5.5" width="11.5" height="21" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7.2 23h4.1M20.7 23h4.1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    },
    {
      id: "sides",
      label: "页码两侧",
      icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3.5" y="5.5" width="11.5" height="21" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="17" y="5.5" width="11.5" height="21" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.3 23h3.2M23.5 23h3.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    },
  ];
  const DEFAULT_FOLDED = {
    maxPerPage: false,
    style: false,
    pageNum: false,
    filter: false,
    process: false,
  };

  const els = {
    shelf: document.getElementById("shelf"),
    coverGrid: document.getElementById("coverGrid"),
    shelfAdd: document.getElementById("shelfAdd"),
    shelfScrub: document.getElementById("shelfScrub"),
    shelfSlider: document.getElementById("shelfSlider"),
    reader: document.getElementById("reader"),
    bookStage: document.getElementById("bookStage"),
    backBtn: document.getElementById("backBtn"),
    pageLabel: document.getElementById("pageLabel"),
    bookTitle: document.getElementById("bookTitle"),
    pager: document.getElementById("pager"),
    pageSlider: document.getElementById("pageSlider"),
    prevPage: document.getElementById("prevPage"),
    nextPage: document.getElementById("nextPage"),
    jumpHome: document.getElementById("jumpHome"),
    jumpEdit: document.getElementById("jumpEdit"),
    exportPdf: document.getElementById("exportPdf"),
    flyLayer: document.getElementById("flyLayer"),
    coverModal: document.getElementById("coverModal"),
    coverForm: document.getElementById("coverForm"),
    coverPick: document.getElementById("coverPick"),
    coverPreview: document.getElementById("coverPreview"),
    coverPickHint: document.getElementById("coverPickHint"),
    coverName: document.getElementById("coverName"),
    coverYear: document.getElementById("coverYear"),
    coverYearChips: document.getElementById("coverYearChips"),
    coverFile: document.getElementById("coverFile"),
    coverCancel: document.getElementById("coverCancel"),
    readerMain: document.getElementById("readerMain"),
    editMenuBtn: document.getElementById("editMenuBtn"),
    editCloseBtn: document.getElementById("editCloseBtn"),
    editDrawer: document.getElementById("editDrawer"),
    photoBank: document.getElementById("photoBank"),
    addPhotosBtn: document.getElementById("addPhotosBtn"),
    photoFiles: document.getElementById("photoFiles"),
    maxPerPageRow: document.getElementById("maxPerPageRow"),
    styleCards: document.getElementById("styleCards"),
    pageNumRow: document.getElementById("pageNumRow"),
    filterCards: document.getElementById("filterCards"),
    processCards: document.getElementById("processCards"),
    processApiKey: document.getElementById("processApiKey"),
    processApiKeyToggle: document.getElementById("processApiKeyToggle"),
    apiKeyRow: document.getElementById("apiKeyRow"),
    apiProviderRow: document.getElementById("apiProviderRow"),
    apiHint: document.getElementById("apiHint"),
    arkModelInput: document.getElementById("arkModelInput"),
    processRegenBtn: document.getElementById("processRegenBtn"),
    processStopBtn: document.getElementById("processStopBtn"),
    processStatus: document.getElementById("processStatus"),
    processConfirmModal: document.getElementById("processConfirmModal"),
    processConfirmYes: document.getElementById("processConfirmYes"),
    processConfirmNo: document.getElementById("processConfirmNo"),
    customProcessNameModal: document.getElementById("customProcessNameModal"),
    customProcessNameForm: document.getElementById("customProcessNameForm"),
    customProcessNameEn: document.getElementById("customProcessNameEn"),
    customProcessNameZh: document.getElementById("customProcessNameZh"),
    customProcessNameCancel: document.getElementById("customProcessNameCancel"),
    customProcessPromptModal: document.getElementById("customProcessPromptModal"),
    customProcessPromptForm: document.getElementById("customProcessPromptForm"),
    customProcessPromptKicker: document.getElementById("customProcessPromptKicker"),
    customProcessPromptTitle: document.getElementById("customProcessPromptTitle"),
    customProcessPromptText: document.getElementById("customProcessPromptText"),
    customProcessPromptCancel: document.getElementById("customProcessPromptCancel"),
    processBusy: document.getElementById("processBusy"),
    processBusyText: document.getElementById("processBusyText"),
    managerModal: document.getElementById("managerModal"),
    managerTitle: document.getElementById("managerTitle"),
    managerCopy: document.getElementById("managerCopy"),
    managerClose: document.getElementById("managerClose"),
    editPhotosBtn: document.getElementById("editPhotosBtn"),
    editAddPhotosBtn: document.getElementById("editAddPhotosBtn"),
    rerollBtn: document.getElementById("rerollBtn"),
    randomAllBtn: document.getElementById("randomAllBtn"),
    replaceFile: document.getElementById("replaceFile"),
    deleteModal: document.getElementById("deleteModal"),
    deleteName: document.getElementById("deleteName"),
    deleteNo: document.getElementById("deleteNo"),
    deleteYes: document.getElementById("deleteYes"),
    yearWheel: document.getElementById("yearWheel"),
    yearWheelTrack: document.getElementById("yearWheelTrack"),
    magMenu: document.getElementById("magMenu"),
    magMenuYear: document.getElementById("magMenuYear"),
    magMenuDelete: document.getElementById("magMenuDelete"),
    yearModal: document.getElementById("yearModal"),
    yearMoveCopy: document.getElementById("yearMoveCopy"),
    yearMoveRow: document.getElementById("yearMoveRow"),
    yearMoveCancel: document.getElementById("yearMoveCancel"),
  };

  let customProcesses = loadCustomProcesses();
  let editingCustomId = null;
  let pendingPromptId = null;
  let pendingProcessAfterPrompt = false;
  let state = loadState();
  let draftCover = null;
  let openMagId = null;
  let pageFlip = null;
  let draft = null;
  let sliderLock = false;
  let isTurning = false;
  let replacePhotoId = null;
  let pickingCover = false;
  let customCover = false;
  let coverKind = 0;
  let dragPhotoId = null;
  let processRun = null;

  function uid(prefix) {
    return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        let dirty = false;
        (data.magazines || []).forEach((mag) => {
          const n = (mag.photos || []).length;
          const hadYear = mag.year != null;
          migrateMagazine(mag);
          if ((mag.photos || []).length !== n || !hadYear) dirty = true;
        });
        if (dirty) {
          try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (_) {}
        }
        return data;
      }
    } catch (_) {}
    return { magazines: [] };
  }
  function saveState() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("saveState failed", err);
    }
  }
  function magById(id) {
    return state.magazines.find((m) => m.id === id);
  }
  function currentYear() {
    return new Date().getFullYear();
  }
  function magYear(mag) {
    if (!mag) return currentYear();
    const y = Number(mag.year);
    if (Number.isFinite(y) && y >= 1800 && y <= 2200) return Math.round(y);
    if (mag.createdAt) {
      const d = new Date(mag.createdAt);
      if (!Number.isNaN(d.getTime())) return d.getFullYear();
    }
    return currentYear();
  }
  function yearList() {
    const set = new Set((state.magazines || []).map(magYear));
    if (!set.size) set.add(currentYear());
    return [...set].sort((a, b) => a - b);
  }
  function magazinesOfYear(year) {
    return state.magazines.filter((m) => magYear(m) === year);
  }
  function shelfMagazines() {
    return magazinesOfYear(shelfYear);
  }
  function nearestYear(from, years) {
    const list = years || yearList();
    if (!list.length) return currentYear();
    if (list.includes(from)) return from;
    return list.reduce((best, y) => (Math.abs(y - from) < Math.abs(best - from) ? y : best));
  }
  function clampYearValue(value, fallback = currentYear()) {
    const y = Number(value);
    if (!Number.isFinite(y)) return fallback;
    return Math.max(1800, Math.min(2200, Math.round(y)));
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function normalizeProcess(id) {
    const mapped = PROCESS_ALIAS[id] || id || "none";
    return allProcessStyles().some((s) => s.id === mapped) ? mapped : "none";
  }
  function processMeta(id) {
    return allProcessStyles().find((s) => s.id === id) || PROCESS_STYLES[0];
  }
  function originalSrc(photo) {
    return photo.originalSrc || photo.src;
  }
  function migratePhoto(photo) {
    const orig = originalSrc(photo);
    const processed = photo.processed && typeof photo.processed === "object" ? { ...photo.processed } : {};
    let versions = Array.isArray(photo.versions) ? photo.versions.map((v) => ({ ...v })) : [];
    Object.entries(processed).forEach(([processId, src]) => {
      if (!src) return;
      if (!versions.some((v) => v.src === src && v.processId === processId)) {
        versions.push({ id: uid("ver"), processId, src, createdAt: 0 });
      }
    });
    let activeVersionId = photo.activeVersionId || null;
    if (activeVersionId && !versions.some((v) => v.id === activeVersionId)) activeVersionId = null;
    const fromActive = versions.find((v) => v.id === activeVersionId);
    const process = normalizeProcess(photo.process || (fromActive && fromActive.processId) || "none");
    return {
      ...photo,
      originalSrc: orig,
      processed,
      versions,
      process,
      activeVersionId,
      role: photo.role === "cover" || photo.isCover ? "cover" : photo.role || "",
      coverOnly: !!photo.coverOnly,
    };
  }
  function isCoverPhoto(photo) {
    return !!(photo && (photo.role === "cover" || photo.isCover));
  }
  function innerPhotos(photos) {
    return (photos || []).filter((p) => !isCoverPhoto(p));
  }
  function coverPhotoOf(photos) {
    return (photos || []).find(isCoverPhoto) || null;
  }
  function coverSrcOf(mag) {
    if (!mag) return "";
    const ph = coverPhotoOf(mag.photos);
    return ph ? shownSrc(ph) : mag.cover || "";
  }
  function makeCoverPhoto(src, { name = "封面.jpg", coverOnly = true, w, h } = {}) {
    return migratePhoto({
      id: uid("ph"),
      src,
      originalSrc: src,
      processed: {},
      versions: [],
      process: "none",
      activeVersionId: null,
      role: "cover",
      coverOnly,
      w,
      h,
      name,
    });
  }
  function syncMagazineCover(mag) {
    if (!mag) return;
    const src = coverSrcOf(mag);
    if (src) mag.cover = src;
  }
  function migrateMagazine(mag) {
    mag.style = normalizeStyle(mag.style);
    mag.process = normalizeProcess(mag.process);
    mag.photos = (mag.photos || []).map((p) => migratePhoto(p));
    const extras = mag.photos.filter(isCoverPhoto).slice(1);
    extras.forEach((p) => {
      p.role = "";
      delete p.isCover;
    });
    if (!coverPhotoOf(mag.photos) && mag.cover) {
      mag.photos.unshift(makeCoverPhoto(mag.cover, { coverOnly: true, name: "封面.jpg" }));
    }
    syncMagazineCover(mag);
    mag.year = magYear(mag);
    return mag;
  }
  function setCoverFromPhoto(photos, photoId) {
    const next = (photos || []).find((p) => p.id === photoId);
    if (!next) return photos || [];
    const prev = coverPhotoOf(photos);
    if (prev && prev.id === next.id) return photos;
    let list = photos.slice();
    if (prev) {
      if (prev.coverOnly) {
        list = list.filter((p) => p.id !== prev.id);
      } else {
        const live = list.find((p) => p.id === prev.id);
        if (live) {
          live.role = "";
          live.coverOnly = false;
          delete live.isCover;
        }
      }
    }
    const live = list.find((p) => p.id === photoId);
    if (!live) return list;
    live.role = "cover";
    live.coverOnly = false;
    delete live.isCover;
    return [live, ...list.filter((p) => p.id !== live.id)];
  }
  function processCache(photo, processId) {
    const id = normalizeProcess(processId);
    if (id === "none") return "";
    const versions = photo.versions || [];
    if (photo.activeVersionId) {
      const active = versions.find((v) => v.id === photo.activeVersionId);
      if (active && active.processId === id) return active.src;
    }
    const same = versions.filter((v) => v.processId === id);
    if (same.length) return same[same.length - 1].src;
    return (photo.processed && photo.processed[id]) || "";
  }
  function shownSrc(photo, processId) {
    const id = normalizeProcess(processId != null ? processId : photo.process);
    if (id === "none") return originalSrc(photo);
    return processCache(photo, id) || originalSrc(photo);
  }
  function downloadShownPhoto(photo) {
    const src = shownSrc(photo);
    if (!src) return;
    const label = !photo.activeVersionId || normalizeProcess(photo.process) === "none"
      ? "original"
      : normalizeProcess(photo.process);
    const base = String(photo.name || photo.id).replace(/\.[^.]+$/, "").replace(/[^\w\u4e00-\u9fff-]+/g, "_");
    const a = document.createElement("a");
    a.download = `${base}-${label}.jpg`;
    a.rel = "noopener";
    if (src.startsWith("data:")) {
      a.href = src;
      a.click();
      return;
    }
    fetch(src).then((r) => r.blob()).then((blob) => {
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }).catch(() => {
      a.href = src;
      a.target = "_blank";
      a.click();
    });
  }
  function clonePhoto(photo) {
    const migrated = migratePhoto(photo);
    return {
      ...migrated,
      processed: { ...migrated.processed },
      versions: migrated.versions.map((v) => ({ ...v })),
    };
  }
  function displayPhoto(photo, processId) {
    const id = normalizeProcess(processId != null ? processId : photo.process);
    const next = clonePhoto(photo);
    next.process = id;
    if (id === "none") {
      next.activeVersionId = null;
    } else {
      const versions = next.versions || [];
      const active = versions.find((v) => v.id === next.activeVersionId);
      if (!active || active.processId !== id) {
        const same = versions.filter((v) => v.processId === id);
        next.activeVersionId = same.length ? same[same.length - 1].id : null;
      }
    }
    next.originalSrc = originalSrc(photo);
    next.src = shownSrc(next, id);
    return next;
  }
  function addPhotoVersion(photo, processId, src) {
    const ver = { id: uid("ver"), processId, src, createdAt: Date.now() };
    photo.versions = [...(photo.versions || []), ver];
    photo.processed = { ...(photo.processed || {}), [processId]: src };
    photo.activeVersionId = ver.id;
    photo.process = processId;
    photo.originalSrc = originalSrc(photo);
    Object.assign(photo, displayPhoto(photo, processId));
    return ver;
  }
  function applyPhotoVersion(photo, versionId) {
    if (!versionId) {
      Object.assign(photo, displayPhoto(photo, "none"));
      return;
    }
    const ver = (photo.versions || []).find((v) => v.id === versionId);
    if (!ver) return;
    photo.activeVersionId = ver.id;
    photo.process = ver.processId;
    photo.processed = { ...(photo.processed || {}), [ver.processId]: ver.src };
    Object.assign(photo, displayPhoto(photo, ver.processId));
  }
  function normalizeStyle(style) {
    const id = STYLE_ALIAS[style] || style;
    return STYLES.some((s) => s.id === id) ? id : "scrapbook";
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function compressImage(file, maxEdge, quality) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve({
          src: canvas.toDataURL("image/jpeg", quality),
          w: canvas.width,
          h: canvas.height,
        });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("无法读取图片"));
      };
      img.src = url;
    });
  }

  function loadImageMeta(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({
        src,
        w: img.naturalWidth || 1200,
        h: img.naturalHeight || 1600,
      });
      img.onerror = () => reject(new Error("无法读取生成图"));
      img.src = src;
    });
  }

  function compressDataUrl(src, maxEdge, quality) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve({ src: canvas.toDataURL("image/jpeg", quality), w, h });
      };
      img.onerror = () => reject(new Error("无法读取图片"));
      img.src = src;
    });
  }

  function compressTo2K(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const fitted = fit2K(img.width, img.height);
        const scale = Math.min(1, fitted.w / img.width, fitted.h / img.height);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve({ src: canvas.toDataURL("image/jpeg", 0.82), w, h });
      };
      img.onerror = () => reject(new Error("无法读取图片"));
      img.src = src;
    });
  }

  function knownProvider(id) {
    return API_PROVIDERS.some((p) => p.id === id) ? id : "doubao";
  }
  function emptyProviderKeys() {
    const keys = {};
    API_PROVIDERS.forEach((p) => { keys[p.id] = ""; });
    return keys;
  }
  function readProviderKeys(raw, provider) {
    const keys = emptyProviderKeys();
    if (raw && raw.keys && typeof raw.keys === "object" && !Array.isArray(raw.keys)) {
      API_PROVIDERS.forEach((p) => {
        if (typeof raw.keys[p.id] === "string") keys[p.id] = normalizeApiKey(raw.keys[p.id]);
      });
    }
    const legacy = raw && typeof raw.key === "string" ? normalizeApiKey(raw.key) : "";
    if (legacy && !keys[provider]) keys[provider] = legacy;
    return keys;
  }
  function withCurrentKey(settings) {
    return { ...settings, key: settings.keys[settings.provider] || "" };
  }
  function loadApiSettings() {
    try {
      const raw = JSON.parse(localStorage.getItem(API_STORE) || "null");
      if (raw && (raw.provider || raw.keys || raw.key)) {
        const provider = knownProvider(raw.provider === "demo" ? "doubao" : raw.provider);
        return withCurrentKey({
          provider,
          keys: readProviderKeys(raw, provider),
          arkModel: raw.arkModel || "",
        });
      }
    } catch (_) {}
    try {
      const old = localStorage.getItem(API_KEY_STORE) || "";
      if (old) {
        const provider = old.toLowerCase() === "demo" ? "doubao" : knownProvider("gemini");
        const keys = emptyProviderKeys();
        keys[provider] = normalizeApiKey(old);
        return withCurrentKey({ provider, keys, arkModel: "" });
      }
    } catch (_) {}
    return withCurrentKey({ provider: "doubao", keys: emptyProviderKeys(), arkModel: "" });
  }
  function saveApiSettings(next) {
    const cur = loadApiSettings();
    const provider = knownProvider(next.provider || cur.provider);
    const keys = { ...emptyProviderKeys(), ...cur.keys };
    if (next.keys && typeof next.keys === "object") {
      API_PROVIDERS.forEach((p) => {
        if (Object.prototype.hasOwnProperty.call(next.keys, p.id)) {
          keys[p.id] = normalizeApiKey(next.keys[p.id]);
        }
      });
    }
    if (Object.prototype.hasOwnProperty.call(next, "key")) {
      keys[provider] = normalizeApiKey(next.key);
    }
    const settings = withCurrentKey({
      provider,
      keys,
      arkModel: Object.prototype.hasOwnProperty.call(next, "arkModel") ? String(next.arkModel || "") : cur.arkModel,
    });
    const storedKeys = {};
    API_PROVIDERS.forEach((p) => {
      if (keys[p.id]) storedKeys[p.id] = keys[p.id];
    });
    try {
      localStorage.setItem(API_STORE, JSON.stringify({
        provider: settings.provider,
        keys: storedKeys,
        key: settings.key,
        arkModel: settings.arkModel || "",
      }));
    } catch (_) {}
    return settings;
  }
  function loadApiKey(provider) {
    const settings = loadApiSettings();
    return settings.keys[knownProvider(provider || settings.provider)] || "";
  }
  function saveApiKey(key, provider) {
    const settings = loadApiSettings();
    return saveApiSettings({ provider: knownProvider(provider || settings.provider), key });
  }
  function setApiKeyVisible(on) {
    if (!els.processApiKey) return;
    els.processApiKey.type = on ? "text" : "password";
    if (!els.processApiKeyToggle) return;
    els.processApiKeyToggle.classList.toggle("is-revealed", !!on);
    els.processApiKeyToggle.setAttribute("aria-pressed", on ? "true" : "false");
    els.processApiKeyToggle.setAttribute("aria-label", on ? "隐藏 API Key" : "显示 API Key");
    els.processApiKeyToggle.title = on ? "隐藏" : "显示";
  }

  function normalizeApiKey(value) {
    return String(value || "")
      .replace(/^\uFEFF/, "")
      .replace(/^["'\s]+|["'\s]+$/g, "")
      .replace(/^Bearer\s+/i, "")
      .trim();
  }

  function snap16(n) {
    return Math.max(16, Math.round(Number(n) / 16) * 16);
  }

  function fit2K(w, h) {
    const srcW = Math.max(1, Number(w) || 3);
    const srcH = Math.max(1, Number(h) || 4);
    const a = srcW / srcH;
    let outW;
    let outH;
    if (srcW >= srcH) {
      outW = OUTPUT_MAX_LONG;
      outH = outW / a;
      if (outH > OUTPUT_MAX_SHORT) {
        outH = OUTPUT_MAX_SHORT;
        outW = outH * a;
      }
    } else {
      outH = OUTPUT_MAX_LONG;
      outW = outH * a;
      if (outW > OUTPUT_MAX_SHORT) {
        outW = OUTPUT_MAX_SHORT;
        outH = outW / a;
      }
    }
    outW = snap16(outW);
    outH = snap16(outH);
    return { w: outW, h: outH, size: `${outW}x${outH}` };
  }

  function geminiAspect(w, h) {
    const a = (Number(w) || 3) / (Number(h) || 4);
    const opts = [
      [1, "1:1"], [1.5, "3:2"], [2 / 3, "2:3"], [0.75, "3:4"], [4 / 3, "4:3"],
      [0.8, "4:5"], [1.25, "5:4"], [9 / 16, "9:16"], [16 / 9, "16:9"], [21 / 9, "21:9"],
    ];
    let best = "3:4";
    let dist = Infinity;
    for (const [ratio, name] of opts) {
      const d = Math.abs(Math.log(a / ratio));
      if (d < dist) { dist = d; best = name; }
    }
    return best;
  }

  function splitDataUrl(src) {
    const m = String(src).match(/^data:([^;]+);base64,(.+)$/);
    if (!m) throw new Error("图片格式无法发送");
    return { mime: m[1], data: m[2] };
  }

  function explainGeminiError(body, status) {
    const msg = String(body.error?.message || "");
    if (/limit:\s*0/i.test(msg) || /free_tier/i.test(msg)) {
      return "Gemini 出图没有免费额度（limit: 0）。网页里可以免费试，API 必须开通付费结算。要先测流程，Key 填 demo。";
    }
    if (status === 401 || status === 403) return "API Key 无效或没有出图权限。";
    if (status === 429) return "额度不足或请求太频繁。出图模型通常需要付费套餐。";
    return (msg.split("\n")[0] || `请求失败 ${status}`).slice(0, 180);
  }

  function runLocalDemoCollage(photo) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const w = img.width;
        const h = img.height;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const sample = ctx.getImageData(0, 0, w, h).data;
        const picks = [];
        for (let i = 0; i < 3; i++) {
          const p = Math.floor(Math.random() * (w * h)) * 4;
          picks.push(`rgb(${sample[p]},${sample[p + 1]},${sample[p + 2]})`);
        }
        ctx.fillStyle = picks[0];
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = picks[1];
        ctx.beginPath();
        ctx.arc(w * 0.78, h * 0.22, Math.min(w, h) * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = picks[2];
        ctx.fillRect(0, h * 0.62, w, h * 0.38);
        ctx.filter = "grayscale(1) contrast(1.12)";
        const inset = Math.min(w, h) * 0.08;
        ctx.drawImage(img, inset, inset, w - inset * 2, h - inset * 1.6);
        ctx.filter = "none";
        ctx.strokeStyle = "rgba(255,255,255,.85)";
        ctx.lineWidth = Math.max(2, w / 180);
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.18);
        ctx.quadraticCurveTo(w * 0.5, h * 0.08, w * 0.88, h * 0.22);
        ctx.stroke();
        resolve({ src: canvas.toDataURL("image/jpeg", 0.82), w, h });
      };
      img.onerror = () => reject(new Error("演示处理失败"));
      img.src = originalSrc(photo);
    });
  }

  function dataUrlToBlob(src) {
    const { mime, data } = splitDataUrl(src);
    const bin = atob(data);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }

  function httpError(body, status, fallback) {
    const msg = body.error?.message || body.message || body.msg || "";
    if (msg) return String(msg).split("\n")[0].slice(0, 180);
    return fallback || `请求失败 ${status}`;
  }

  async function runGeminiCollage(photo, apiKey, prompt) {
    const packed = await compressDataUrl(originalSrc(photo), 1024, 0.82);
    const { mime, data } = splitDataUrl(packed.src);
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mime, data } },
            ],
          }],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
            imageConfig: { aspectRatio: geminiAspect(packed.w, packed.h) },
          },
        }),
      }
    ).catch(() => {
      throw new Error("无法连上 Gemini。请检查网络和 API Key。");
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(explainGeminiError(body, res.status));
    const parts = body.candidates?.[0]?.content?.parts || [];
    let out = "";
    for (const part of parts) {
      const inline = part.inlineData || part.inline_data;
      if (inline && inline.data) {
        const kind = inline.mimeType || inline.mime_type || "image/png";
        out = `data:${kind};base64,${inline.data}`;
        break;
      }
    }
    if (!out) throw new Error("模型没有返回图片");
    return compressTo2K(out);
  }

  function openaiSize(w, h) {
    const a = (Number(w) || 3) / (Number(h) || 4);
    if (a > 1.2) return "1536x1024";
    if (a < 0.85) return "1024x1536";
    return "1024x1024";
  }

  async function runOpenAICollage(photo, apiKey, prompt) {
    const packed = await compressDataUrl(originalSrc(photo), 1024, 0.82);
    const form = new FormData();
    form.append("model", "gpt-image-1");
    form.append("prompt", prompt);
    form.append("image", dataUrlToBlob(packed.src), "photo.jpg");
    form.append("size", openaiSize(packed.w, packed.h));
    const res = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    }).catch(() => {
      throw new Error("无法连上 OpenAI。请检查网络和 API Key。");
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(httpError(body, res.status, "OpenAI 改图失败"));
    const b64 = body.data?.[0]?.b64_json;
    const url = body.data?.[0]?.url;
    if (b64) return compressTo2K(`data:image/png;base64,${b64}`);
    if (url) {
      const imgRes = await fetch(url);
      const buf = await imgRes.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let bin = "";
      bytes.forEach((n) => { bin += String.fromCharCode(n); });
      return compressTo2K(`data:image/png;base64,${btoa(bin)}`);
    }
    throw new Error("OpenAI 没有返回图片");
  }

  async function runDashscopeCollage(photo, apiKey, prompt) {
    const packed = await compressDataUrl(originalSrc(photo), 1024, 0.82);
    const res = await fetch("https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "qwen-image-edit",
        input: {
          messages: [{
            role: "user",
            content: [
              { image: packed.src },
              { text: prompt },
            ],
          }],
        },
        parameters: { n: 1, size: fit2K(packed.w, packed.h).size },
      }),
    }).catch(() => {
      throw new Error("无法连上通义。请检查网络和 DashScope Key。");
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(httpError(body, res.status, "通义改图失败"));
    const content = body.output?.choices?.[0]?.message?.content;
    const list = Array.isArray(content) ? content : [];
    const hit = list.find((part) => part.image);
    if (hit?.image) {
      const src = String(hit.image).startsWith("data:") ? hit.image : `data:image/png;base64,${hit.image}`;
      return compressTo2K(src);
    }
    throw new Error(body.output?.text || "通义没有返回图片");
  }

  async function runSiliconflowCollage(photo, apiKey, prompt) {
    const packed = await compressDataUrl(originalSrc(photo), 1024, 0.82);
    const res = await fetch("https://api.siliconflow.cn/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "Qwen/Qwen-Image-Edit",
        prompt,
        image: packed.src,
        image_size: fit2K(packed.w, packed.h).size,
      }),
    }).catch(() => {
      throw new Error("无法连上 SiliconFlow。请检查网络和 API Key。");
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(httpError(body, res.status, "SiliconFlow 改图失败"));
    const item = body.images?.[0] || body.data?.[0];
    const b64 = item?.b64_json || item?.base64;
    const url = (typeof item === "string" ? item : item?.url) || body.images?.[0];
    if (b64) return compressTo2K(`data:image/png;base64,${b64}`);
    if (typeof url === "string" && url.startsWith("http")) {
      const imgRes = await fetch(url);
      const blob = await imgRes.blob();
      const src = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      return compressTo2K(src);
    }
    throw new Error("SiliconFlow 没有返回图片");
  }

  async function imageUrlToJpeg(url) {
    const imgRes = await fetch(url);
    const blob = await imgRes.blob();
    const src = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return compressTo2K(src);
  }

  function isArkPlanKey(key) {
    return /^ark-/i.test(normalizeApiKey(key));
  }

  function arkModelId(value, apiKey) {
    const v = String(value || "").trim();
    if (isArkPlanKey(apiKey)) {
      if (!v || /-\d{6}$/.test(v)) return ARK_PLAN_MODEL;
      return v;
    }
    return v || ARK_DEFAULT_MODEL;
  }

  function explainArkError(body, status) {
    const msg = httpError(body, status, "火山方舟改图失败");
    const hit = msg.match(/has not activated the model\s+(\S+)/i);
    if (hit || /not activated/i.test(msg)) {
      const model = (hit && hit[1].replace(/[.,]$/, "")) || "这个模型";
      return `这个账号还没开通 ${model}。Agent Plan 请确认套餐含 Seedream，并看「用量统计」。按量调用请到「开通管理」开通对应模型。`;
    }
    if (/api key doesn't exist|api key or ak\/sk|missing or invalid|unauthorized|401/i.test(msg) || status === 401) {
      return "火山方舟不认这把 Key。请重新复制「使用配置」里完整的 ark- 专属 Key；按量调用请用「API Key 管理」里的 Key。";
    }
    if (/size|resolution|pixel|1K|2K/i.test(msg) && /invalid|not support|must|range|取值/i.test(msg)) {
      return "这个模型不接受当前输出尺寸。Seedream 5.0 lite 请用 2K。";
    }
    return msg;
  }

  async function arkImagesUrl(apiKey) {
    try {
      const ping = await fetch("/ark/ok", { cache: "no-store" });
      if (ping.ok) return "/ark/images";
    } catch (_) {}
    if (isArkPlanKey(apiKey)) {
      throw new Error("Agent Plan 的接口不允许浏览器直连。请在 chronological-images 目录运行 python3 serve.py，再用 http://127.0.0.1:8765/ 打开。");
    }
    return ARK_API;
  }

  async function runDoubaoCollage(photo, apiKey, modelId, prompt) {
    const key = normalizeApiKey(apiKey);
    if (/^AKLT/i.test(key)) {
      throw new Error("这是火山引擎账号 AK，不是方舟 API Key。Agent Plan 请用 ark- 开头的专属 Key。");
    }
    const packed = await compressDataUrl(originalSrc(photo), 1024, 0.82);
    const model = arkModelId(modelId, key);
    const endpoint = await arkImagesUrl(key);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        image: [packed.src],
        size: "2K",
        response_format: "b64_json",
        watermark: false,
        optimize_prompt: false,
      }),
    }).catch(() => {
      throw new Error("无法连上火山方舟。Agent Plan 请用 python3 serve.py 打开本页，不要直接打开 html。");
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(explainArkError(body, res.status));
    const item = Array.isArray(body.data) ? body.data[0] : (body.data || {});
    const local = item?.local_url;
    if (typeof local === "string" && local.startsWith("/processed/")) {
      return loadImageMeta(local);
    }
    const b64 = item?.b64_json || item?.base64;
    const url = item?.url;
    if (typeof url === "string" && url.startsWith("/processed/")) {
      return loadImageMeta(url);
    }
    if (b64) return compressTo2K(`data:image/jpeg;base64,${b64}`);
    if (typeof url === "string" && url.startsWith("http")) return imageUrlToJpeg(url);
    throw new Error(body.error?.message || "火山方舟没有返回图片");
  }

  async function runProcessCollage(photo, provider, apiKey, processId) {
    const prompt = skillPrompt(processId);
    if (!prompt) throw new Error("请先填写提示词");
    if (provider === "demo") return runLocalDemoCollage(photo);
    if (provider === "openai") return runOpenAICollage(photo, apiKey, prompt);
    if (provider === "dashscope") return runDashscopeCollage(photo, apiKey, prompt);
    if (provider === "doubao") return runDoubaoCollage(photo, apiKey, loadApiSettings().arkModel, prompt);
    if (provider === "siliconflow") return runSiliconflowCollage(photo, apiKey, prompt);
    return runGeminiCollage(photo, apiKey, prompt);
  }

  function setProcessBusy(on, text) {
    if (els.processBusy) els.processBusy.hidden = true;
    if (!els.processStatus) return;
    els.processStatus.hidden = !on;
    if (text) els.processStatus.textContent = text;
  }

  function photoGenState(photoId) {
    if (!processRun) return null;
    if (processRun.finished.has(photoId)) return null;
    if (processRun.current === photoId) return "run";
    if (processRun.todo.has(photoId)) return "wait";
    return null;
  }

  function genOverlayMarkup() {
    return `<div class="gen-overlay" aria-hidden="true"><span class="gen-spin"></span><b class="gen-copy"></b><span class="gen-bar"><i></i></span></div>`;
  }

  function patchPhotoSrc(photoId, src) {
    document.querySelectorAll(`.photo-slot[data-photo-id="${photoId}"] img, .photo-cell[data-photo-id="${photoId}"] img, .cover-sheet[data-photo-id="${photoId}"] img`).forEach((img) => {
      img.src = src;
    });
    const mag = currentMag();
    const photo = mag && mag.photos.find((p) => p.id === photoId);
    if (photo && isCoverPhoto(photo) && src) {
      mag.cover = src;
      document.querySelectorAll(`.mag[data-id="${mag.id}"] img`).forEach((img) => {
        img.src = src;
      });
    }
  }

  function currentSpreadPages() {
    const mag = currentMag();
    if (!mag || !pageFlip) return [];
    const view = viewInfo();
    if (view.kind !== "content") return [];
    const pages = buildPages(mag);
    const left = view.index % 2 === 0 ? view.index : view.index - 1;
    const start = left - 2;
    return [pages[start], pages[start + 1]].filter((page) => page && page.kind === "content");
  }

  function currentSpreadPhotos() {
    if (!draft) return [];
    if (viewInfo().kind === "cover") {
      const cover = coverPhotoOf(draft.photos);
      return cover ? [cover] : [];
    }
    const ids = new Set();
    currentSpreadPages().forEach((page) => {
      page.items.forEach((item) => ids.add(item.photoId));
    });
    return draft.photos.filter((p) => ids.has(p.id) && !isCoverPhoto(p));
  }

  function applyProcessToPhotos(photos, processId) {
    photos.forEach((photo) => {
      if (processId === "none") {
        photo.activeVersionId = null;
        Object.assign(photo, displayPhoto(photo, "none"));
      } else {
        const src = processCache(photo, processId);
        if (src) {
          const match = (photo.versions || []).filter((v) => v.processId === processId && v.src === src);
          photo.activeVersionId = match.length ? match[match.length - 1].id : photo.activeVersionId;
        }
        Object.assign(photo, displayPhoto(photo, processId));
      }
      patchPhotoSrc(photo.id, shownSrc(photo));
    });
  }

  function syncProcessActions() {
    const id = draft
      ? normalizeProcess(draft.process)
      : normalizeProcess(currentMag() && currentMag().process);
    const canSkill = !!processMeta(id).skill;
    if (els.processRegenBtn) {
      els.processRegenBtn.hidden = false;
      els.processRegenBtn.disabled = !canSkill || !!processRun;
    }
    if (els.processStopBtn) {
      els.processStopBtn.hidden = !processRun;
      els.processStopBtn.disabled = !!(processRun && processRun.stopAfterCurrent);
    }
  }

  function paintProcessUI() {
    document.querySelectorAll(".photo-slot[data-photo-id], .photo-cell[data-photo-id], .cover-sheet[data-photo-id]").forEach((el) => {
      if (!el.querySelector(".gen-overlay")) el.insertAdjacentHTML("beforeend", genOverlayMarkup());
      const st = photoGenState(el.dataset.photoId);
      el.classList.toggle("is-waiting", st === "wait");
      el.classList.toggle("is-generating", st === "run");
      const copy = el.querySelector(".gen-copy");
      const fill = el.querySelector(".gen-bar i");
      if (copy) {
        copy.textContent = st === "run" && processRun
          ? `生成中 ${processRun.done + 1}/${processRun.total}`
          : st === "wait" ? "等待中" : "";
      }
      if (fill && processRun) {
        const pct = st === "run"
          ? ((processRun.done + 0.55) / processRun.total) * 100
          : (processRun.done / processRun.total) * 100;
        fill.style.width = `${Math.max(6, pct)}%`;
      }
    });
    syncProcessActions();
    if (!els.processStatus) return;
    if (!processRun) {
      return;
    }
    els.processStatus.hidden = false;
    if (processRun.stopAfterCurrent) {
      els.processStatus.textContent = "这张完成后停止";
      return;
    }
    els.processStatus.textContent = processRun.current
      ? `正在生成本页 ${processRun.done + 1}/${processRun.total}…`
      : `已完成 ${processRun.done}/${processRun.total}`;
  }

  async function ensureProcessImages(processId, { force = false } = {}) {
    const meta = processMeta(processId);
    if (!draft) return;
    const targets = currentSpreadPhotos();
    if (!meta.skill) {
      if (!targets.length) return;
      applyProcessToPhotos(targets, "none");
      return;
    }
    if (!draft.photos.length) {
      throw new Error("还没有照片可以处理");
    }
    if (!targets.length) {
      throw new Error("翻到封面或有照片的内页再处理。封底和编辑页不处理。");
    }
    const next = {
      key: normalizeApiKey(els.processApiKey.value) || loadApiKey(),
    };
    if (els.arkModelInput && !els.arkModelInput.hidden) {
      next.arkModel = els.arkModelInput.value.trim();
    }
    const settings = saveApiSettings(next);
    const provider = knownProvider(settings.provider);
    const metaApi = API_PROVIDERS.find((p) => p.id === provider) || API_PROVIDERS[0];
    if (metaApi.needKey && !normalizeApiKey(settings.key)) {
      throw new Error(`请先填写 ${metaApi.name} 的 API Key`);
    }
    const jobs = targets.map((photo, index) => ({ photo, index }));
    const todo = force
      ? jobs
      : jobs.filter(({ photo }) => !processCache(photo, processId));
    if (!todo.length) {
      applyProcessToPhotos(targets, processId);
      return;
    }
    if (processRun) throw new Error("正在生成，请稍等");
    processRun = {
      todo: new Set(todo.map(({ photo }) => photo.id)),
      finished: new Set(),
      current: null,
      done: 0,
      total: todo.length,
      stopAfterCurrent: false,
    };
    const mag = currentMag();
    applyProcessToPhotos(targets.filter((p) => processCache(p, processId)), processId);
    if (mag) {
      mag.process = processId;
      mag.photos = draft.photos.map((p) => clonePhoto(p));
      if (pageFlip) paintPageChrome(mag);
      else await mountBook(mag, stayPageIndex(mag));
    }
    renderPhotoBank();
    paintProcessUI();
    let savedNote = "";
    try {
      for (let i = 0; i < todo.length; i++) {
        const { photo } = todo[i];
        processRun.current = photo.id;
        paintProcessUI();
        const result = await runProcessCollage(photo, provider, settings.key, processId);
        addPhotoVersion(photo, processId, result.src);
        const magPhoto = mag && mag.photos.find((p) => p.id === photo.id);
        if (magPhoto) Object.assign(magPhoto, clonePhoto(photo));
        patchPhotoSrc(photo.id, shownSrc(photo));
        processRun.todo.delete(photo.id);
        processRun.finished.add(photo.id);
        processRun.done += 1;
        processRun.current = null;
        paintProcessUI();
        saveState();
        renderPhotoBank();
        if (processRun.stopAfterCurrent) {
          savedNote = `已停止。当前这张已存到照片编辑（${processRun.finished.size} 张）`;
          break;
        }
      }
      if (!savedNote) {
        savedNote = `已存到照片编辑（${processRun.finished.size} 张，本页）`;
      }
      saveState();
    } finally {
      processRun = null;
      paintProcessUI();
      if (savedNote && els.processStatus) {
        els.processStatus.hidden = false;
        els.processStatus.textContent = savedNote;
      }
      syncProcessActions();
    }
  }

  function weightedPick(weights) {
    const sum = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * sum;
    for (let i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r <= 0) return i;
    }
    return weights.length - 1;
  }

  function isLandscape(photo) {
    const w = Number(photo.w) || 0;
    const h = Number(photo.h) || 0;
    return w > 0 && h > 0 && w / h >= 1.18;
  }

  function pickPageCount(remaining, maxN, style) {
    const cap = Math.min(Math.max(1, Math.floor(maxN)), remaining);
    if (cap <= 1) return 1;
    const sparse = style === "polaroid";
    const weights = [];
    for (let n = 1; n <= cap; n++) {
      const room = n / cap;
      let w = sparse ? 1.2 - room * 0.72 : 0.22 + room * (0.82 + maxN / 9);
      if (n === 1) w += sparse ? 0.55 : 0.06;
      if (n === cap) w *= sparse ? 0.7 : 1.06;
      weights.push(Math.max(0.12, w));
    }
    return weightedPick(weights) + 1;
  }

  function distributePhotos(photos, maxPerPage, style) {
    if (!photos.length) return [];
    if (Number(maxPerPage) === 0.5) return distributeSpreads(photos, style);
    const groups = [];
    let rest = photos.slice();
    while (rest.length) {
      const take = pickPageCount(rest.length, maxPerPage, style);
      groups.push({ photos: rest.slice(0, take), spread: false });
      rest = rest.slice(take);
    }
    return groups;
  }

  function distributeSpreads(photos, style) {
    const editorial = normalizeStyle(style) === "editorial";
    const groups = [];
    const queue = photos.slice();
    while (queue.length) {
      const photo = queue[0];
      const onLeft = groups.length % 2 === 0;
      const wantSpread = editorial
        ? isLandscape(photo)
        : Math.random() < (isLandscape(photo) ? 0.34 : 0.16);
      if (onLeft && wantSpread) {
        groups.push({ photos: [photo], spread: "left" });
        groups.push({ photos: [photo], spread: "right" });
        queue.shift();
        continue;
      }
      groups.push({ photos: [photo], spread: false });
      queue.shift();
    }
    return groups;
  }

  function photoAspect(photo) {
    const w = Number(photo.w) || 4;
    const h = Number(photo.h) || 5;
    return w / Math.max(1, h);
  }

  function randRange(a, b) {
    return a + Math.random() * (b - a);
  }

  function clampNum(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function pct(n) {
    return Math.round(n * 100) / 100;
  }

  function printSize(a, maxH, maxW) {
    let h = maxH;
    let w = h * a / PAGE_ASPECT;
    if (w > maxW) {
      w = maxW;
      h = w * PAGE_ASPECT / a;
    }
    return { w, h };
  }

  function splitCount(n) {
    if (n <= 2) return 1;
    if (n === 3) return Math.random() < 0.58 ? 1 : 2;
    if (n === 4) return pick([1, 2, 2, 2, 3]);
    if (n === 5) return pick([2, 2, 3, 3]);
    return pick([2, 3, 3, 4]);
  }

  function groupWeight(photos, splitVert) {
    return photos.reduce((sum, photo) => {
      const a = photoAspect(photo);
      if (splitVert) return sum + (a >= 1.05 ? 1.3 : a <= 0.85 ? 0.86 : 1);
      return sum + (a <= 0.85 ? 1.24 : a >= 1.15 ? 0.88 : 1);
    }, 0);
  }

  function partitionPhotos(photos, rect) {
    if (photos.length === 1) return [{ photo: photos[0], ...rect }];
    const visW = rect.w * PAGE_ASPECT;
    const visH = rect.h;
    let splitVert = visW >= visH * 0.9;
    if (photos.length <= 3 && Math.random() < 0.16) splitVert = !splitVert;
    const k = splitCount(photos.length);
    const groupA = photos.slice(0, k);
    const groupB = photos.slice(k);
    const wa = groupWeight(groupA, splitVert);
    const wb = groupWeight(groupB, splitVert);
    let ratio = wa / Math.max(0.001, wa + wb);
    ratio = clampNum(ratio + randRange(-0.06, 0.06), 0.32, 0.68);
    if (groupA.length === 1 && groupB.length > 1) ratio = clampNum(ratio, 0.36, 0.54);
    if (groupB.length === 1 && groupA.length > 1) ratio = clampNum(ratio, 0.46, 0.64);
    if (splitVert) {
      const w1 = rect.w * ratio;
      return partitionPhotos(groupA, { t: rect.t, l: rect.l, w: w1, h: rect.h })
        .concat(partitionPhotos(groupB, { t: rect.t, l: rect.l + w1, w: rect.w - w1, h: rect.h }));
    }
    const h1 = rect.h * ratio;
    return partitionPhotos(groupA, { t: rect.t, l: rect.l, w: rect.w, h: h1 })
      .concat(partitionPhotos(groupB, { t: rect.t + h1, l: rect.l, w: rect.w, h: rect.h - h1 }));
  }

  function pickPolaroidFormat(photo) {
    const w = Number(photo.w) || 0;
    const h = Number(photo.h) || 0;
    if (!w || !h) return "square";
    const a = w / h;
    if (a >= 1.28) return "wide";
    if (a <= 0.86) return "mini";
    return "square";
  }

  function polaroidSlotSize(format, cardH) {
    const fmt = POLAROID_FORMATS[format] || POLAROID_FORMATS.square;
    return {
      w: cardH * (fmt.cardW / fmt.cardH) / PAGE_ASPECT,
      h: cardH,
    };
  }

  function packPolaroids(photos) {
    const n = photos.length;
    const marginX = 7;
    const marginY = 8;
    const gap = n === 1 ? 0 : 3.4;
    const innerW = 100 - marginX * 2;
    const innerH = 100 - marginY * 2;
    const items = photos.map((photo) => ({
      photo,
      format: pickPolaroidFormat(photo),
    }));
    let cardH = ({ 1: 64, 2: 46, 3: 39, 4: 34, 5: 30, 6: 28 }[Math.min(n, 6)] || 28);

    function layoutAt(H) {
      const cards = items.map((it) => ({ ...it, ...polaroidSlotSize(it.format, H) }));
      const rows = [];
      let row = [];
      let rowW = 0;
      for (const card of cards) {
        const need = card.w + (row.length ? gap : 0);
        if (row.length && rowW + need > innerW) {
          rows.push(row);
          row = [card];
          rowW = card.w;
        } else {
          row.push(card);
          rowW += need;
        }
      }
      if (row.length) rows.push(row);
      const totalH = rows.length * H + Math.max(0, rows.length - 1) * gap;
      const maxW = cards.reduce((m, c) => Math.max(m, c.w), 0);
      return { rows, totalH, maxW };
    }

    for (let i = 0; i < 10; i++) {
      const pack = layoutAt(cardH);
      if (pack.totalH <= innerH && pack.maxW <= innerW) break;
      const sH = pack.totalH > innerH ? innerH / pack.totalH : 1;
      const sW = pack.maxW > innerW ? innerW / pack.maxW : 1;
      cardH *= Math.min(sH, sW, 0.96);
    }

    const pack = layoutAt(cardH);
    let y = marginY + Math.max(0, (innerH - pack.totalH) / 2) + randRange(-1.2, 1.2);
    const placed = [];
    pack.rows.forEach((row) => {
      const rowW = row.reduce((s, c) => s + c.w, 0) + gap * Math.max(0, row.length - 1);
      let x = marginX + Math.max(0, (innerW - rowW) / 2) + randRange(-1.6, 1.6);
      row.forEach((card) => {
        placed.push({
          photoId: card.photo.id,
          t: pct(clampNum(y + randRange(-1, 1), 4, 96 - card.h)),
          l: pct(clampNum(x + randRange(-1, 1), 4, 96 - card.w)),
          w: pct(card.w),
          h: pct(card.h),
          r: pct(randRange(-4.8, 4.8)),
          f: "polaroid",
          polaroid: card.format,
        });
        x += card.w + gap;
      });
      y += cardH + gap;
    });
    return placed;
  }

  function scrapSlot(photo, t, l, w, h, r, tape) {
    return {
      photoId: photo.id,
      t: pct(clampNum(t, 4, Math.max(4, 96 - h))),
      l: pct(clampNum(l, 4, Math.max(4, 96 - w))),
      w: pct(w),
      h: pct(h),
      r: pct(r),
      f: "tape",
      tape: tape || 0,
    };
  }

  function packScrapbook(photos) {
    const n = photos.length;
    const maxH = ({ 1: 40, 2: 33, 3: 28, 4: 25, 5: 22, 6: 20 }[Math.min(n, 6)] || 20);
    const maxW = ({ 1: 54, 2: 44, 3: 38, 4: 34, 5: 32, 6: 30 }[Math.min(n, 6)] || 28);
    const cards = photos.map((photo, i) => {
      const boost = i === 0 && n > 1 ? 1.1 : 1;
      return { photo, ...printSize(photoAspect(photo), maxH * boost, maxW * boost), tape: i % 3 };
    });

    if (n === 1) {
      const c = cards[0];
      return [scrapSlot(c.photo, (100 - c.h) / 2 + randRange(-3, 2), (100 - c.w) / 2 + randRange(-4, 4), c.w, c.h, randRange(-6, 6), c.tape)];
    }
    if (n === 2) {
      const a = cards[0];
      const b = cards[1];
      return [
        scrapSlot(a.photo, 11 + randRange(-1.5, 2), 8 + randRange(-1, 2), a.w, a.h, randRange(-7.5, -2), a.tape),
        scrapSlot(b.photo, 100 - 12 - b.h + randRange(-2, 1.5), 100 - 9 - b.w + randRange(-2, 1), b.w, b.h, randRange(2, 7.5), b.tape),
      ];
    }
    if (n === 3) {
      const [a, b, c] = cards;
      return [
        scrapSlot(a.photo, 8 + randRange(-1, 2), 10 + randRange(-2, 3), a.w, a.h, randRange(-6, 3), a.tape),
        scrapSlot(b.photo, 46 + randRange(-2, 3), 6 + randRange(-1, 2), b.w, b.h, randRange(-3, 7), b.tape),
        scrapSlot(c.photo, 40 + randRange(-2, 4), 100 - 8 - c.w + randRange(-2, 1), c.w, c.h, randRange(-7, 4), c.tape),
      ];
    }

    const gap = 3.8;
    const marginX = 8;
    const marginY = 9;
    const innerW = 100 - marginX * 2;
    const innerH = 100 - marginY * 2;
    const rows = [];
    let row = [];
    let rowW = 0;
    for (const card of cards) {
      const need = card.w + (row.length ? gap : 0);
      if (row.length && rowW + need > innerW) {
        rows.push(row);
        row = [card];
        rowW = card.w;
      } else {
        row.push(card);
        rowW += need;
      }
    }
    if (row.length) rows.push(row);
    const totalH = rows.reduce((s, r) => s + Math.max(...r.map((c) => c.h)), 0) + gap * Math.max(0, rows.length - 1);
    let y = marginY + Math.max(0, (innerH - totalH) / 2);
    const placed = [];
    rows.forEach((line) => {
      const lineW = line.reduce((s, c) => s + c.w, 0) + gap * Math.max(0, line.length - 1);
      const lineH = Math.max(...line.map((c) => c.h));
      let x = marginX + Math.max(0, (innerW - lineW) / 2);
      line.forEach((card) => {
        placed.push(scrapSlot(
          card.photo,
          y + (lineH - card.h) * randRange(0, 0.45) + randRange(-1.2, 1.2),
          x + randRange(-1.4, 1.4),
          card.w,
          card.h,
          randRange(-7.2, 7.2),
          card.tape
        ));
        x += card.w + gap;
      });
      y += lineH + gap;
    });
    return placed;
  }

  function packEditorial(photos) {
    const cells = partitionPhotos(photos, { t: 0, l: 0, w: 100, h: 100 });
    return cells.map((cell) => ({
      photoId: cell.photo.id,
      t: pct(cell.t),
      l: pct(cell.l),
      w: pct(cell.w),
      h: pct(cell.h),
      r: 0,
      f: "editorial",
    }));
  }

  function packCollage(photos, style) {
    const kind = normalizeStyle(style);
    if (kind === "polaroid") return packPolaroids(photos);
    if (kind === "editorial") return packEditorial(photos);
    return packScrapbook(photos);
  }

  function layoutSpread(side, photo) {
    return [{
      photoId: photo.id,
      t: 0, l: 0, w: 100, h: 100, r: 0, f: "spread",
      spread: side,
    }];
  }

  function layoutItems(photos, style) {
    return packCollage(photos, style);
  }

  function generateLayout(mag) {
    mag.style = normalizeStyle(mag.style);
    const groups = distributePhotos(innerPhotos(mag.photos), mag.maxPerPage, mag.style);
    mag.layout = groups.map((group) => {
      if (group.spread) return layoutSpread(group.spread, group.photos[0]);
      return layoutItems(group.photos, mag.style);
    });
    return mag.layout;
  }

  async function ensurePhotoSizes(photos) {
    const jobs = (photos || []).filter((p) => p && p.src && (!p.w || !p.h)).map((p) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        p.w = img.naturalWidth;
        p.h = img.naturalHeight;
        resolve();
      };
      img.onerror = resolve;
      img.src = p.src;
    }));
    if (jobs.length) await Promise.all(jobs);
  }

  function buildPages(mag) {
    const layout = mag.layout || [];
    const pages = layout.map((items, i) => ({
      number: i + 1,
      items,
      kind: "content",
      showMinus: false,
      showPlus: false,
    }));
    if (pages.length % 2 === 1) {
      pages.push({
        number: pages.length + 1,
        items: [],
        kind: "content",
        showMinus: false,
        showPlus: false,
      });
    }
    pages.push({ number: null, items: [], kind: "edit", showMinus: true, showPlus: false });
    pages.push({ number: null, items: [], kind: "edit", showMinus: false, showPlus: true });
    return pages;
  }

  let shelfPos = 0;
  let shelfVel = 0;
  let shelfGoal = null;
  let shelfRaf = 0;
  let shelfLastT = 0;
  let shelfHoverTimer = 0;
  let shelfIgnoreHoverUntil = 0;
  let shelfDrag = null;
  let openingMag = false;
  let shelfSuppressClick = false;
  let shelfFocus = 0;
  let shelfCards = [];
  let shelfYear = currentYear();
  let yearPos = 0;
  let yearVel = 0;
  let yearGoal = null;
  let yearRaf = 0;
  let yearLastT = 0;
  let yearDrag = null;
  let yearSwitching = false;
  let pendingShelfYear = null;
  let pendingMenuMagId = null;
  let pendingMoveMagId = null;
  let lastYearsKey = "";
  const SHELF_SPRING = 36;
  const SHELF_DAMP = 11.4;
  const YEAR_SPRING = 34;
  const YEAR_DAMP = 11.2;

  function shelfCount() {
    return shelfMagazines().length;
  }

  function shelfSideCount() {
    const w = window.innerWidth;
    if (w < 560) return 1;
    if (w < 1100) return 2;
    return 3;
  }

  function clampShelfFocus(i) {
    const n = shelfCount();
    if (n <= 0) return 0;
    return Math.max(0, Math.min(n - 1, i));
  }

  function coverMetrics() {
    const w = window.innerWidth;
    const coverW = Math.min(256, Math.max(176, w * 0.176));
    return { coverW, spacing: coverW * 1.18 };
  }

  function layoutShelf() {
    const stage = els.coverGrid;
    if (!stage) return;
    const side = shelfSideCount();
    const { coverW, spacing } = coverMetrics();
    stage.style.setProperty("--cover-w", `${coverW}px`);
    const max = Math.max(0, shelfCount() - 1);
    if (shelfPos < 0) shelfPos = 0;
    if (shelfPos > max) shelfPos = max;
    const liftingId = shelfDrag?.kind === "reorder" && shelfDrag.moved ? shelfDrag.magId : "";
    for (let i = 0; i < shelfCards.length; i++) {
      const card = shelfCards[i];
      if (liftingId && card.dataset.id === liftingId) {
        card.classList.add("is-lifting");
        card.classList.add("is-focus");
        card.classList.remove("is-left", "is-right", "is-away");
        card.style.transform = `translate3d(${shelfDrag.x}px, ${shelfDrag.y}px, 88px) rotateY(0deg) scale(1.08) translate(-50%, -50%)`;
        card.style.zIndex = "600";
        card.setAttribute("aria-hidden", "false");
        continue;
      }
      const offset = i - shelfPos;
      const abs = Math.abs(offset);
      const away = abs > side + 0.4;
      const dir = offset === 0 ? 0 : Math.sign(offset);
      const ry = dir === 0 ? 0 : -dir * Math.min(22, 8 + abs * 5);
      const scale = abs < 0.04 ? 1 : Math.max(0.78, 0.97 - abs * 0.06);
      const x = offset * spacing;
      const tz = abs < 0.04 ? 40 : -abs * 36;
      card.classList.remove("is-lifting");
      card.style.transform = `translate3d(${x}px, 0, ${tz}px) rotateY(${ry}deg) scale(${scale}) translate(-50%, -50%)`;
      card.style.zIndex = String(200 - Math.round(abs * 8));
      card.classList.toggle("is-focus", abs < 0.45);
      card.classList.toggle("is-left", offset < -0.08);
      card.classList.toggle("is-right", offset > 0.08);
      card.classList.toggle("is-away", away);
      card.setAttribute("aria-hidden", away ? "true" : "false");
    }
    shelfFocus = clampShelfFocus(Math.round(shelfPos));
    syncShelfSlider();
  }

  function moveMagazineTo(id, toIndex) {
    const mag = magById(id);
    if (!mag) return -1;
    const year = magYear(mag);
    const yearIds = state.magazines.filter((m) => magYear(m) === year).map((m) => m.id);
    const from = yearIds.indexOf(id);
    const n = yearIds.length;
    const to = Math.max(0, Math.min(n - 1, toIndex));
    if (from < 0 || from === to) return from;
    const [moved] = yearIds.splice(from, 1);
    yearIds.splice(to, 0, moved);
    const byId = Object.fromEntries(state.magazines.map((m) => [m.id, m]));
    let k = 0;
    state.magazines = state.magazines.map((m) => (magYear(m) === year ? byId[yearIds[k++]] : m));
    const [card] = shelfCards.splice(from, 1);
    if (card) shelfCards.splice(to, 0, card);
    return to;
  }

  function coverStageOrigin() {
    const origin = els.coverGrid?.querySelector(".cover-stage");
    if (!origin) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const r = origin.getBoundingClientRect();
    return { x: r.left, y: r.top };
  }

  function magazineCardAtPointer(clientX, clientY, target) {
    const direct = target && target.closest ? target.closest(".mag-card") : null;
    if (direct && direct.dataset.id && !direct.classList.contains("is-away")) return direct;
    if (shelfCount() < 2) return direct && direct.dataset.id ? direct : null;
    const origin = coverStageOrigin();
    const { coverW, spacing } = coverMetrics();
    if (Math.abs(clientY - origin.y) > coverW * 0.9) return null;
    const slot = shelfPos + (clientX - origin.x) / spacing;
    const idx = clampShelfFocus(Math.round(slot));
    if (Math.abs(idx - slot) > 0.52) return null;
    return shelfCards[idx] || null;
  }

  function bindShelfPointer(e, type) {
    if (type === "down") {
      if (!shelfOnStage() || !shelfCount()) return;
      if (e.target.closest(".mag-more") || e.target.closest(".mag-menu") || e.target.closest(".shelf-scrub")) return;
      if (e.button != null && e.button !== 0) return;
      clearTimeout(shelfHoverTimer);
      shelfIgnoreHoverUntil = Date.now() + 4000;
      shelfGoal = null;
      shelfVel = 0;
      if (e.cancelable) e.preventDefault();
      const card = magazineCardAtPointer(e.clientX, e.clientY, e.target);
      const magId = card?.dataset?.id;
      const origin = coverStageOrigin();
      if (card && magId && shelfCount() > 1) {
        shelfDrag = {
          kind: "reorder",
          id: e.pointerId,
          magId,
          from: shelfMagazines().findIndex((m) => m.id === magId),
          startX: e.clientX,
          startY: e.clientY,
          clientX: e.clientX,
          x: e.clientX - origin.x,
          y: -14,
          moved: false,
          captured: false,
          dirty: false,
        };
      } else {
        shelfDrag = {
          kind: "browse",
          id: e.pointerId,
          startX: e.clientX,
          startPos: shelfPos,
          moved: false,
          captured: false,
        };
      }
      try { els.coverGrid.setPointerCapture(e.pointerId); } catch (_) {}
      return;
    }
    if (!shelfDrag || (e.pointerId != null && e.pointerId !== shelfDrag.id)) return;
    if (type === "move") {
      if (shelfDrag.kind === "reorder") {
        const dx = e.clientX - shelfDrag.startX;
        const dy = e.clientY - shelfDrag.startY;
        if (!shelfDrag.moved && Math.hypot(dx, dy) < 4) return;
        if (!shelfDrag.captured) {
          shelfDrag.moved = true;
          shelfDrag.captured = true;
          els.coverGrid.classList.add("is-dragging", "is-reordering");
        }
        const origin = coverStageOrigin();
        const { spacing } = coverMetrics();
        const n = shelfCount();
        shelfDrag.clientX = e.clientX;
        if (e.clientX < 72) shelfPos = Math.max(0, shelfPos - 0.14);
        else if (e.clientX > window.innerWidth - 72) shelfPos = Math.min(n - 1, shelfPos + 0.14);
        shelfDrag.x = e.clientX - origin.x;
        shelfDrag.y = Math.max(-48, Math.min(36, dy * 0.4)) - 14;
        const slot = clampShelfFocus(Math.round(shelfPos + (e.clientX - origin.x) / spacing));
        if (moveMagazineTo(shelfDrag.magId, slot) !== shelfDrag.from) shelfDrag.dirty = true;
        shelfVel = 0;
        startShelfAnim();
        layoutShelf();
        return;
      }
      const dx = e.clientX - shelfDrag.startX;
      if (!shelfDrag.moved && Math.abs(dx) < 6) return;
      if (!shelfDrag.captured) {
        shelfDrag.moved = true;
        shelfDrag.captured = true;
        els.coverGrid.classList.add("is-dragging");
      }
      const { spacing } = coverMetrics();
      shelfPos = clampShelfFocus(shelfDrag.startPos - dx / spacing);
      shelfVel = 0;
      layoutShelf();
      return;
    }
    const drag = shelfDrag;
    shelfDrag = null;
    try { els.coverGrid.releasePointerCapture(e.pointerId); } catch (_) {}
    if (drag.kind === "reorder") {
      shelfCards.forEach((card) => card.classList.remove("is-lifting"));
      layoutShelf();
      const idx = shelfMagazines().findIndex((m) => m.id === drag.magId);
      if (drag.dirty) saveState();
      if (idx >= 0) setShelfFocus(idx);
      setTimeout(() => els.coverGrid.classList.remove("is-dragging", "is-reordering"), 220);
      shelfIgnoreHoverUntil = Date.now() + 240;
      shelfSuppressClick = true;
      setTimeout(() => { shelfSuppressClick = false; }, 80);
      if (!drag.moved) {
        const mag = magById(drag.magId);
        const btn = els.coverGrid.querySelector(`.mag[data-id="${drag.magId}"]`);
        if (mag && btn) openMagazine(mag, btn);
      }
      return;
    }
    els.coverGrid.classList.remove("is-dragging");
    if (drag.moved) {
      shelfSuppressClick = true;
      shelfIgnoreHoverUntil = Date.now() + 220;
      setShelfFocus(Math.round(shelfPos));
      setTimeout(() => { shelfSuppressClick = false; }, 80);
    }
  }

  function syncShelfSlider() {
    const slider = els.shelfSlider;
    const scrub = els.shelfScrub;
    if (!slider || !scrub) return;
    const n = shelfCount();
    const show = n > 1 && els.reader.hidden;
    scrub.hidden = !show;
    if (!show) return;
    slider.max = String(n - 1);
    if (document.activeElement !== slider) {
      slider.value = String(Math.round(shelfPos));
    }
  }

  function startShelfAnim() {
    if (shelfRaf) return;
    shelfLastT = 0;
    const tick = (t) => {
      const dt = shelfLastT ? Math.min(0.032, (t - shelfLastT) / 1000) : 0.016;
      shelfLastT = t;
      if (shelfDrag?.moved) {
        if (shelfDrag.kind === "reorder") {
          const n = shelfCount();
          const px = shelfDrag.clientX;
          if (typeof px === "number") {
            if (px < 72) shelfPos = Math.max(0, shelfPos - 0.1);
            else if (px > window.innerWidth - 72) shelfPos = Math.min(Math.max(0, n - 1), shelfPos + 0.1);
            const { spacing } = coverMetrics();
            const slot = clampShelfFocus(Math.round(shelfPos + shelfDrag.x / spacing));
            if (moveMagazineTo(shelfDrag.magId, slot) !== shelfDrag.from) shelfDrag.dirty = true;
          }
        }
        layoutShelf();
        shelfRaf = requestAnimationFrame(tick);
        return;
      }
      if (shelfGoal != null) {
        const x = shelfPos - shelfGoal;
        const acc = -SHELF_SPRING * x - SHELF_DAMP * shelfVel;
        shelfVel += acc * dt;
        shelfPos += shelfVel * dt;
        if (Math.abs(x) < 0.0015 && Math.abs(shelfVel) < 0.012) {
          shelfPos = shelfGoal;
          shelfVel = 0;
          shelfGoal = null;
          shelfRaf = 0;
          layoutShelf();
          return;
        }
      } else {
        shelfPos += shelfVel * dt;
        shelfVel *= Math.exp(-5.2 * dt);
        const max = Math.max(0, shelfCount() - 1);
        if (shelfPos < 0) {
          shelfPos = 0;
          shelfVel = 0;
        } else if (shelfPos > max) {
          shelfPos = max;
          shelfVel = 0;
        }
        if (Math.abs(shelfVel) < 0.08) {
          shelfGoal = clampShelfFocus(Math.round(shelfPos));
        }
      }
      layoutShelf();
      shelfRaf = requestAnimationFrame(tick);
    };
    shelfRaf = requestAnimationFrame(tick);
  }

  function setShelfFocus(i, snap = false) {
    const next = clampShelfFocus(i);
    if (snap) {
      shelfPos = next;
      shelfVel = 0;
      shelfGoal = null;
      if (shelfRaf) {
        cancelAnimationFrame(shelfRaf);
        shelfRaf = 0;
      }
      layoutShelf();
      return;
    }
    shelfGoal = next;
    startShelfAnim();
  }

  function yearStep(count, R) {
    const maxSpan = Math.min(window.innerHeight * 0.52, R * 0.78);
    const gap = count <= 1 ? 0 : Math.min(38, maxSpan / Math.max(1, count - 1));
    return Math.max(0.048, gap / R);
  }

  function yearMetrics() {
    const R = Math.min(window.innerHeight * 0.42, 340);
    const peek = window.innerWidth < 720 ? 52 : 58;
    return {
      R,
      peek,
      cx: peek - R,
      cy: window.innerHeight * 0.5 + 8,
    };
  }

  function clampYearPos(value) {
    const max = Math.max(0, yearList().length - 1);
    return Math.max(0, Math.min(max, value));
  }

  function layoutYearWheel() {
    const wheel = els.yearWheel;
    const track = els.yearWheelTrack;
    if (!wheel || !track) return;
    const years = yearList();
    const { R, cx, cy } = yearMetrics();
    const step = yearStep(years.length, R);
    wheel.style.setProperty("--yw-r", String(R));
    wheel.style.setProperty("--yw-cx", String(cx));
    wheel.style.setProperty("--yw-cy", String(cy));
    yearPos = clampYearPos(yearPos);
    const marks = track.querySelectorAll(".year-mark");
    const padY = 36;
    const labelPad = 14;
    marks.forEach((el, i) => {
      const offset = i - yearPos;
      const ang = offset * step;
      const x = cx + R * Math.cos(ang);
      const y = cy + R * Math.sin(ang);
      const abs = Math.abs(offset);
      const offPage = y < padY || y > window.innerHeight - padY;
      const onRight = Math.cos(ang) > 0.22;
      const far = abs > 10 || !onRight || offPage;
      el.style.transform = `translate(${x + labelPad}px, ${y}px) translate(0, -50%)`;
      el.classList.toggle("is-on", abs < 0.45);
      el.classList.toggle("is-away", far);
      el.style.opacity = far ? "0" : String(Math.max(0.28, 1 - abs * 0.18));
      el.style.fontSize = abs < 0.45 ? "24px" : `${Math.max(11, 13 - abs * 0.7)}px`;
      el.setAttribute("aria-hidden", far ? "true" : "false");
      el.tabIndex = far ? -1 : 0;
    });
  }

  function renderYearWheel() {
    const track = els.yearWheelTrack;
    if (!track) return;
    const years = yearList();
    lastYearsKey = years.join(",");
    track.innerHTML = "";
    years.forEach((y) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "year-mark";
      b.dataset.year = String(y);
      b.textContent = String(y);
      b.setAttribute("aria-label", `${y} 年`);
      b.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (yearDrag?.moved) return;
        setShelfYear(y);
      });
      track.appendChild(b);
    });
    const idx = years.indexOf(shelfYear);
    if (yearGoal == null && !yearDrag) {
      yearPos = idx >= 0 ? idx : years.length - 1;
    }
    layoutYearWheel();
  }

  function syncYearWheel(force) {
    const key = yearList().join(",");
    if (force || key !== lastYearsKey) renderYearWheel();
    else layoutYearWheel();
  }

  function startYearAnim() {
    if (yearRaf) return;
    yearLastT = 0;
    const tick = (t) => {
      const dt = yearLastT ? Math.min(0.032, (t - yearLastT) / 1000) : 0.016;
      yearLastT = t;
      const max = Math.max(0, yearList().length - 1);
      if (yearDrag?.moved) {
        layoutYearWheel();
        yearRaf = requestAnimationFrame(tick);
        return;
      }
      if (yearGoal != null) {
        const x = yearPos - yearGoal;
        const acc = -YEAR_SPRING * x - YEAR_DAMP * yearVel;
        yearVel += acc * dt;
        yearPos += yearVel * dt;
        if (Math.abs(x) < 0.0018 && Math.abs(yearVel) < 0.014) {
          yearPos = yearGoal;
          yearVel = 0;
          yearGoal = null;
          yearRaf = 0;
          layoutYearWheel();
          commitYearFromPos();
          return;
        }
      } else {
        yearPos += yearVel * dt;
        yearVel *= Math.exp(-5.2 * dt);
        if (yearPos < 0) {
          yearPos = 0;
          yearVel = 0;
        } else if (yearPos > max) {
          yearPos = max;
          yearVel = 0;
        }
        if (Math.abs(yearVel) < 0.08) {
          yearGoal = Math.round(clampYearPos(yearPos));
        }
      }
      layoutYearWheel();
      yearRaf = requestAnimationFrame(tick);
    };
    yearRaf = requestAnimationFrame(tick);
  }

  function commitYearFromPos() {
    const years = yearList();
    const i = Math.round(clampYearPos(yearPos));
    const y = years[i];
    if (y != null && y !== shelfYear) setShelfYear(y, { fromWheel: true });
  }

  async function setShelfYear(year, opts = {}) {
    year = clampYearValue(year, shelfYear);
    const years = yearList();
    const idx = years.indexOf(year);
    if (idx < 0) return;
    if (!opts.fromWheel) {
      yearGoal = idx;
      startYearAnim();
    }
    if (year === shelfYear) return;
    if (yearSwitching) {
      pendingShelfYear = year;
      return;
    }
    const dir = year > shelfYear ? 1 : -1;
    const animate = opts.animate !== false && !prefersReducedMotion();
    yearSwitching = true;
    closeMagMenu();
    if (animate && els.coverGrid) {
      els.coverGrid.classList.remove("is-year-in", "is-year-enter-down", "is-year-enter-up");
      els.coverGrid.classList.add(dir > 0 ? "is-year-leave-down" : "is-year-leave-up");
      await wait(300);
    }
    shelfYear = year;
    state.shelfYear = year;
    shelfFocus = opts.focus == null ? 0 : clampShelfFocus(opts.focus);
    shelfPos = shelfFocus;
    shelfVel = 0;
    shelfGoal = null;
    saveState();
    els.coverGrid.classList.remove("is-year-leave-down", "is-year-leave-up");
    if (animate && els.coverGrid) {
      els.coverGrid.classList.add(dir > 0 ? "is-year-enter-down" : "is-year-enter-up");
    }
    renderShelf();
    if (animate && els.coverGrid) {
      els.coverGrid.offsetHeight;
      requestAnimationFrame(() => {
        els.coverGrid.classList.add("is-year-in");
      });
      await wait(440);
      els.coverGrid.classList.remove("is-year-enter-down", "is-year-enter-up", "is-year-in");
    }
    yearSwitching = false;
    if (pendingShelfYear != null && pendingShelfYear !== shelfYear) {
      const next = pendingShelfYear;
      pendingShelfYear = null;
      setShelfYear(next);
    } else {
      pendingShelfYear = null;
    }
  }

  function bindYearPointer(e, type) {
    if (!els.yearWheel) return;
    if (type === "down") {
      if (!shelfOnStage()) return;
      if (e.button != null && e.button !== 0) return;
      yearGoal = null;
      yearVel = 0;
      yearDrag = {
        id: e.pointerId,
        startY: e.clientY,
        startPos: yearPos,
        moved: false,
      };
      try { els.yearWheel.setPointerCapture(e.pointerId); } catch (_) {}
      return;
    }
    if (!yearDrag || (e.pointerId != null && e.pointerId !== yearDrag.id)) return;
    if (type === "move") {
      const dy = e.clientY - yearDrag.startY;
      if (!yearDrag.moved && Math.abs(dy) < 4) return;
      yearDrag.moved = true;
      yearPos = clampYearPos(yearDrag.startPos + dy / 54);
      yearVel = 0;
      layoutYearWheel();
      return;
    }
    const drag = yearDrag;
    yearDrag = null;
    try { els.yearWheel.releasePointerCapture(e.pointerId); } catch (_) {}
    if (!drag.moved) {
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const y = Number(hit?.closest?.(".year-mark")?.dataset.year);
      if (Number.isFinite(y)) setShelfYear(y);
      return;
    }
    yearGoal = Math.round(clampYearPos(yearPos));
    startYearAnim();
  }

  function onYearWheel(e) {
    if (!shelfOnStage()) return;
    const years = yearList();
    e.preventDefault();
    e.stopPropagation();
    if (years.length < 2) return;
    let delta = e.deltaY;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = e.deltaX;
    if (e.deltaMode === 1) delta *= 16;
    if (e.deltaMode === 2) delta *= window.innerHeight;
    yearGoal = null;
    yearPos = clampYearPos(yearPos + delta / 78);
    yearVel = (delta / 78) * 16;
    startYearAnim();
  }

  function bindYearNav() {
    if (!els.yearWheel) return;
    els.yearWheel.addEventListener("wheel", onYearWheel, { passive: false });
    els.yearWheel.addEventListener("pointerdown", (e) => bindYearPointer(e, "down"));
    els.yearWheel.addEventListener("pointermove", (e) => bindYearPointer(e, "move"));
    els.yearWheel.addEventListener("pointerup", (e) => bindYearPointer(e, "up"));
    els.yearWheel.addEventListener("pointercancel", (e) => bindYearPointer(e, "up"));
  }

  function closeMagMenu() {
    pendingMenuMagId = null;
    if (els.magMenu) els.magMenu.hidden = true;
  }

  function openMagMenu(btn, magId) {
    if (!els.magMenu) return;
    if (pendingMenuMagId === magId && !els.magMenu.hidden) {
      closeMagMenu();
      return;
    }
    pendingMenuMagId = magId;
    const r = btn.getBoundingClientRect();
    els.magMenu.hidden = false;
    const w = els.magMenu.offsetWidth || 148;
    const left = Math.max(12, Math.min(window.innerWidth - w - 12, r.right - w));
    const top = Math.min(window.innerHeight - 96, r.bottom + 6);
    els.magMenu.style.left = `${left}px`;
    els.magMenu.style.top = `${top}px`;
  }

  function fillYearChips(row, selected, onPick, extra) {
    if (!row) return;
    row.innerHTML = "";
    const years = extra ? [...new Set([...yearList(), ...extra])].sort((a, b) => a - b) : yearList();
    years.forEach((y) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (y === selected ? " is-on" : "");
      b.textContent = String(y);
      b.addEventListener("click", () => onPick(y));
      row.appendChild(b);
    });
  }

  function openYearMoveModal(magId) {
    const mag = magById(magId);
    if (!mag || !els.yearModal) return;
    pendingMoveMagId = magId;
    const current = magYear(mag);
    const others = yearList().filter((y) => y !== current);
    if (els.yearMoveCopy) {
      els.yearMoveCopy.textContent = others.length
        ? "只会列出已经建过画册的年份。"
        : "还没有其他年份。新建画册时可另选一年。";
    }
    if (els.yearMoveRow) {
      els.yearMoveRow.innerHTML = "";
      others.forEach((y) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "chip";
        b.textContent = String(y);
        b.addEventListener("click", () => moveMagazineYear(magId, y));
        els.yearMoveRow.appendChild(b);
      });
    }
    els.yearModal.showModal();
  }

  function moveMagazineYear(id, year) {
    const mag = magById(id);
    if (!mag) return;
    year = clampYearValue(year, magYear(mag));
    if (magYear(mag) === year) {
      if (els.yearModal?.open) els.yearModal.close();
      return;
    }
    mag.year = year;
    const rest = state.magazines.filter((m) => m.id !== id);
    let insert = rest.reduce((acc, m, i) => (magYear(m) === year ? i : acc), -1);
    rest.splice(insert + 1, 0, mag);
    state.magazines = rest;
    if (els.yearModal?.open) els.yearModal.close();
    pendingMoveMagId = null;
    closeMagMenu();
    const stillHere = magazinesOfYear(shelfYear).length;
    saveState();
    const focus = magazinesOfYear(year).findIndex((m) => m.id === id);
    if (!stillHere) {
      setShelfYear(year, { focus: Math.max(0, focus) });
    } else {
      renderShelf();
    }
  }

  function resolveShelfYear() {
    const years = yearList();
    const want = Number(state.shelfYear);
    shelfYear = years.includes(want) ? want : (years[years.length - 1] || currentYear());
    state.shelfYear = shelfYear;
  }

  function renderShelf() {
    const mags = shelfMagazines();
    const keepId = mags[shelfFocus]?.id;
    els.coverGrid.innerHTML = "";
    const origin = document.createElement("div");
    origin.className = "cover-stage";
    els.coverGrid.appendChild(origin);
    mags.forEach((mag, idx) => {
      const card = document.createElement("div");
      card.className = "mag-card";
      card.dataset.id = mag.id;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mag";
      btn.dataset.id = mag.id;
      btn.setAttribute("aria-label", mag.name);
      btn.innerHTML = `
        <span class="mag-spine"></span>
        <span class="mag-body">
          <img class="filter-${mag.coverFilter || "none"}" src="${coverSrcOf(mag)}" alt="" draggable="false" />
        </span>`;
      const caption = document.createElement("span");
      caption.className = "mag-caption";
      caption.textContent = mag.name;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (shelfSuppressClick || shelfDrag?.moved) return;
        openMagazine(mag, btn);
      });
      btn.addEventListener("pointerenter", () => {
        if (Date.now() < shelfIgnoreHoverUntil) return;
        if (shelfDrag) return;
        clearTimeout(shelfHoverTimer);
        if (idx < 0 || Math.abs(idx - shelfPos) < 0.2) return;
        shelfHoverTimer = setTimeout(() => {
          setShelfFocus(idx);
          shelfIgnoreHoverUntil = Date.now() + 220;
        }, 60);
      });
      btn.addEventListener("pointerleave", () => clearTimeout(shelfHoverTimer));
      const more = document.createElement("button");
      more.type = "button";
      more.className = "mag-more";
      more.setAttribute("aria-label", `${mag.name} 的更多操作`);
      more.setAttribute("aria-haspopup", "menu");
      more.replaceChildren(
        document.createElement("span"),
        document.createElement("span"),
        document.createElement("span"),
      );
      more.addEventListener("pointerenter", () => {
        clearTimeout(shelfHoverTimer);
        card.classList.add("is-hovering");
      });
      more.addEventListener("pointerleave", () => card.classList.remove("is-hovering"));
      more.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openMagMenu(more, mag.id);
      });
      card.addEventListener("pointerenter", () => card.classList.add("is-hovering"));
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-hovering");
        clearTimeout(shelfHoverTimer);
      });
      card.appendChild(btn);
      card.appendChild(more);
      card.appendChild(caption);
      origin.appendChild(card);
    });
    shelfCards = [...origin.querySelectorAll(".mag-card")];
    if (!mags.length) {
      const hint = document.createElement("p");
      hint.className = "cover-flow-empty";
      hint.textContent = state.magazines.length
        ? "这一年还没有封面。点标题旁的 + 做一本。"
        : "还没有封面。点标题旁的 + 做一本。";
      els.coverGrid.appendChild(hint);
    }
    const kept = keepId ? mags.findIndex((m) => m.id === keepId) : -1;
    setShelfFocus(kept >= 0 ? kept : clampShelfFocus(shelfFocus), true);
    syncYearWheel();
  }

  function shelfOnStage() {
    return els.reader.hidden && !els.coverModal.open && !els.deleteModal.open && !els.yearModal?.open;
  }

  function onShelfWheel(e) {
    if (!shelfOnStage()) return;
    if (e.target.closest?.(".year-wheel")) return;
    if (shelfCount() < 1) return;
    e.preventDefault();
    if (shelfCount() < 2) return;
    let delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (e.deltaMode === 1) delta *= 16;
    if (e.deltaMode === 2) delta *= window.innerHeight;
    shelfIgnoreHoverUntil = Date.now() + 280;
    clearTimeout(shelfHoverTimer);
    const { spacing } = coverMetrics();
    const step = delta / (spacing * 0.72);
    shelfGoal = null;
    shelfPos += step;
    shelfVel = step * 18;
    startShelfAnim();
  }

  function bindShelfNav() {
    window.addEventListener("wheel", onShelfWheel, { passive: false });
    els.coverGrid.addEventListener("dragstart", (e) => e.preventDefault());
    els.coverGrid.addEventListener("pointerdown", (e) => bindShelfPointer(e, "down"));
    window.addEventListener("pointermove", (e) => {
      if (shelfDrag) bindShelfPointer(e, "move");
    });
    window.addEventListener("pointerup", (e) => {
      if (shelfDrag) bindShelfPointer(e, "up");
    });
    window.addEventListener("pointercancel", (e) => {
      if (shelfDrag) bindShelfPointer(e, "up");
    });
    if (els.shelfAdd) els.shelfAdd.addEventListener("click", openCoverModal);
    bindYearNav();
    document.addEventListener("pointerdown", (e) => {
      if (!els.magMenu || els.magMenu.hidden) return;
      if (e.target.closest(".mag-menu") || e.target.closest(".mag-more")) return;
      closeMagMenu();
    });
    window.addEventListener("resize", closeMagMenu);
    if (els.magMenuYear) {
      els.magMenuYear.addEventListener("click", () => {
        const id = pendingMenuMagId;
        closeMagMenu();
        if (id) openYearMoveModal(id);
      });
    }
    if (els.magMenuDelete) {
      els.magMenuDelete.addEventListener("click", () => {
        const id = pendingMenuMagId;
        closeMagMenu();
        if (id) askDeleteMagazine(id);
      });
    }
    if (els.yearMoveCancel) {
      els.yearMoveCancel.addEventListener("click", () => {
        pendingMoveMagId = null;
        els.yearModal.close();
      });
    }
    if (els.yearModal) {
      els.yearModal.addEventListener("cancel", () => {
        pendingMoveMagId = null;
      });
    }
    if (els.shelfSlider) {
      els.shelfSlider.addEventListener("input", () => {
        if (!shelfOnStage()) return;
        shelfIgnoreHoverUntil = Date.now() + 400;
        clearTimeout(shelfHoverTimer);
        setShelfFocus(Number(els.shelfSlider.value));
      });
      els.shelfSlider.addEventListener("change", () => {
        setShelfFocus(Math.round(Number(els.shelfSlider.value)));
      });
    }
  }

  let pendingDeleteId = null;

  function askDeleteMagazine(id) {
    const mag = magById(id);
    if (!mag) return;
    pendingDeleteId = id;
    els.deleteName.textContent = mag.name;
    els.deleteModal.showModal();
    els.deleteNo.focus();
  }

  els.deleteNo.addEventListener("click", () => {
    pendingDeleteId = null;
    els.deleteModal.close();
  });
  els.deleteYes.addEventListener("click", () => {
    if (!pendingDeleteId) {
      els.deleteModal.close();
      return;
    }
    state.magazines = state.magazines.filter((m) => m.id !== pendingDeleteId);
    if (openMagId === pendingDeleteId) leaveReader();
    pendingDeleteId = null;
    if (!magazinesOfYear(shelfYear).length) {
      shelfYear = nearestYear(shelfYear);
      state.shelfYear = shelfYear;
    }
    saveState();
    renderShelf();
    els.deleteModal.close();
  });
  els.deleteModal.addEventListener("cancel", () => {
    pendingDeleteId = null;
  });

  function paintDefaultCover(kind, title) {
    const w = 720;
    const h = 960;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    const palettes = [
      { bg: "#243f39", ink: "#f2eee4", line: "#d4c8b0", paper: "#1e3530" },
      { bg: "#f2eee4", ink: "#26251f", line: "#8f3d24", paper: "#e8e2d4" },
      { bg: "#8f3d24", ink: "#f2eee4", line: "#d4c8b0", paper: "#7a3420" },
      { bg: "#3d3a34", ink: "#f2eee4", line: "#c4a574", paper: "#2e2c28" },
      { bg: "#d4d0c7", ink: "#26251f", line: "#8f3d24", paper: "#c8c3b7" },
    ];
    const p = palettes[kind % palettes.length];
    ctx.fillStyle = p.bg;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = p.line;
    ctx.lineWidth = 2;

    if (kind === 0) {
      ctx.strokeRect(48, 48, w - 96, h - 96);
      ctx.strokeRect(62, 62, w - 124, h - 124);
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.42, 86, 0, Math.PI * 2);
      ctx.stroke();
    } else if (kind === 1) {
      ctx.fillStyle = p.paper;
      ctx.fillRect(0, 0, w, 120);
      ctx.fillRect(0, h - 160, w, 160);
      ctx.beginPath();
      ctx.moveTo(80, 280);
      ctx.lineTo(w - 80, 280);
      ctx.stroke();
    } else if (kind === 2) {
      ctx.fillStyle = p.paper;
      ctx.fillRect(w * 0.18, h * 0.22, w * 0.64, h * 0.46);
      ctx.strokeRect(w * 0.18 + 14, h * 0.22 + 14, w * 0.64 - 28, h * 0.46 - 28);
    } else if (kind === 3) {
      ctx.beginPath();
      ctx.moveTo(0, h * 0.18);
      ctx.lineTo(w, h * 0.32);
      ctx.lineTo(w, h * 0.38);
      ctx.lineTo(0, h * 0.24);
      ctx.closePath();
      ctx.fillStyle = p.line;
      ctx.globalAlpha = 0.35;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(72, h * 0.72);
      ctx.lineTo(w - 72, h * 0.72);
      ctx.stroke();
    } else {
      ctx.fillStyle = p.paper;
      ctx.fillRect(w * 0.62, 0, w * 0.38, h);
      ctx.beginPath();
      ctx.moveTo(70, 120);
      ctx.lineTo(70, h - 120);
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = p.ink;
    ctx.font = "400 48px 'Songti SC', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(title || "画册", w / 2, h * 0.86);
    ctx.font = "600 13px Arial, sans-serif";
    ctx.letterSpacing = "4px";
    ctx.fillText("LITH LAB", w / 2, h * 0.86 + 36);
    return canvas.toDataURL("image/jpeg", 0.9);
  }

  function randomDefaultCover(title) {
    return paintDefaultCover(Math.floor(Math.random() * 5), title);
  }

  function renderCoverYearChips(selected) {
    fillYearChips(els.coverYearChips, selected, (y) => {
      if (els.coverYear) els.coverYear.value = String(y);
      renderCoverYearChips(y);
    }, [selected]);
  }

  function openCoverModal() {
    customCover = false;
    coverKind = Math.floor(Math.random() * 5);
    draftCover = paintDefaultCover(coverKind, "");
    els.coverName.value = "";
    const year = shelfYear || currentYear();
    if (els.coverYear) els.coverYear.value = String(year);
    renderCoverYearChips(year);
    els.coverPreview.src = draftCover;
    els.coverPreview.hidden = false;
    els.coverPickHint.hidden = false;
    els.coverPickHint.textContent = "可选。点这里换成自己的图";
    els.coverPick.classList.add("has-img");
    els.coverModal.showModal();
    if (els.coverYear && !els.coverYear.dataset.bound) {
      els.coverYear.dataset.bound = "1";
      els.coverYear.addEventListener("input", () => {
        renderCoverYearChips(clampYearValue(els.coverYear.value, shelfYear));
      });
    }
  }

  els.coverPick.addEventListener("click", () => els.coverFile.click());
  els.coverName.addEventListener("input", () => {
    if (customCover) return;
    const name = els.coverName.value.trim();
    draftCover = paintDefaultCover(coverKind, name);
    els.coverPreview.src = draftCover;
  });
  els.coverFile.addEventListener("change", async () => {
    const file = els.coverFile.files[0];
    els.coverFile.value = "";
    if (!file) return;
    const packed = await compressImage(file, 900, 0.84);
    draftCover = packed.src;
    customCover = true;
    els.coverPreview.src = draftCover;
    els.coverPreview.hidden = false;
    els.coverPickHint.hidden = true;
    els.coverPick.classList.add("has-img");
  });

  els.coverCancel.addEventListener("click", () => els.coverModal.close());
  els.coverForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = els.coverName.value.trim();
    if (!name) {
      els.coverName.reportValidity();
      return;
    }
    const cover = customCover && draftCover ? draftCover : paintDefaultCover(coverKind, name);
    const year = clampYearValue(els.coverYear?.value, shelfYear);
    state.magazines.push({
      id: uid("mag"),
      name,
      cover,
      year,
      createdAt: Date.now(),
      photos: [makeCoverPhoto(cover, { coverOnly: !customCover, name: "封面.jpg" })],
      maxPerPage: 2,
      style: "scrapbook",
      filter: "classic-chrome",
      coverFilter: "none",
      process: "none",
      pageNum: "center",
      layout: [],
    });
    saveState();
    const focus = magazinesOfYear(year).length - 1;
    els.coverModal.close();
    if (year !== shelfYear) {
      setShelfYear(year, { focus });
    } else {
      shelfFocus = focus;
      renderShelf();
    }
  });

  function wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function coverLeafRect() {
    const cover = document.querySelector("#book .stf__item:has(.cover-sheet), #book .cover-sheet");
    if (cover) {
      const r = cover.getBoundingClientRect();
      if (r.width >= 8 && r.height >= 8) return r;
    }
    return estimatedCoverRect();
  }

  function estimatedCoverRect() {
    const stage = els.bookStage;
    if (!stage) return null;
    const { pageW, pageH } = fitBook();
    if (pageW < 8 || pageH < 8) return null;
    const r = stage.getBoundingClientRect();
    return new DOMRect(
      r.left + (r.width - pageW * 2) / 2 + pageW,
      r.top + (r.height - pageH) / 2,
      pageW,
      pageH
    );
  }

  async function waitUntilSpread(page, ms = 1200) {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
      await wait(32);
      if (!pageFlip) return;
      if (!isTurning && pageFlip.getCurrentPageIndex() >= page) return;
    }
  }

  async function openToFirstSpread() {
    if (!pageFlip) return;
    if (pageFlip.getCurrentPageIndex() >= 2) return;
    try {
      pageFlip.flip(2, "bottom");
    } catch (_) {
      pageFlip.turnToPage(2);
      return;
    }
    await waitUntilSpread(2);
    if (pageFlip && pageFlip.getCurrentPageIndex() < 2) pageFlip.turnToPage(2);
  }

  async function openMagazine(mag, coverBtn) {
    if (openingMag || !mag) return;
    openingMag = true;
    const body = coverBtn?.querySelector?.(".mag-body") || coverBtn;
    const rect = body?.getBoundingClientRect?.();
    let fly = null;
    const reduce = prefersReducedMotion();
    try {
      els.reader.classList.add("is-entering");
      if (!reduce && rect && rect.width >= 8 && rect.height >= 8) {
        els.flyLayer.hidden = false;
        els.flyLayer.classList.add("is-dim");
        fly = document.createElement("div");
        fly.className = "fly-cover";
        fly.style.left = `${rect.left}px`;
        fly.style.top = `${rect.top}px`;
        fly.style.width = `${rect.width}px`;
        fly.style.height = `${rect.height}px`;
        const img = coverBtn.querySelector("img");
        if (img) fly.appendChild(img.cloneNode(true));
        else fly.innerHTML = `<img class="filter-${mag.coverFilter || "none"}" src="${coverSrcOf(mag)}" alt="" />`;
        document.body.appendChild(fly);
        coverBtn.style.visibility = "hidden";
        els.shelf.classList.add("is-exiting");
      }
      prepareReaderShell(mag, { keepShelf: !reduce && !!fly });
      if (reduce) {
        await enterReader(mag, 2, { skipPrepare: true });
        els.reader.classList.remove("is-entering");
        return;
      }
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const dest = estimatedCoverRect();
      const move = fly && dest
        ? fly.animate(
            [
              { transform: "translate(0, 0) scale(1)" },
              {
                transform: `translate(${dest.left - rect.left}px, ${dest.top - rect.top}px) scale(${dest.width / rect.width}, ${dest.height / rect.height})`,
              },
            ],
            { duration: 580, easing: "cubic-bezier(.22,.72,.16,1)", fill: "forwards" }
          )
        : null;
      const ready = enterReader(mag, 0, { skipPrepare: true, keepShelf: true, deferChrome: true });
      if (move) await move.finished.catch(() => {});
      await ready;
      els.shelf.style.visibility = "hidden";
      els.flyLayer.classList.add("is-clear");
      els.reader.classList.add("is-opening");
      if (fly) fly.remove();
      fly = null;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await wait(70);
      await openToFirstSpread();
      applyFolds();
      renderManager();
      syncProcessActions();
    } catch (_) {
      hideShelf();
      if (els.reader.hidden) await enterReader(mag, 2);
      else if (pageFlip && pageFlip.getCurrentPageIndex() < 2) pageFlip.turnToPage(2);
    } finally {
      document.querySelectorAll(".fly-cover").forEach((n) => n.remove());
      els.flyLayer.classList.remove("is-dim", "is-clear");
      els.flyLayer.hidden = true;
      hideShelf();
      els.reader.classList.remove("is-entering", "is-opening");
      openingMag = false;
      if (coverBtn) coverBtn.style.visibility = "";
    }
  }

  function hideShelf() {
    els.shelf.classList.remove("is-exiting");
    els.shelf.style.visibility = "";
    els.shelf.hidden = true;
    if (els.shelfScrub) els.shelfScrub.hidden = true;
  }

  function prepareReaderShell(mag, opts = {}) {
    openMagId = mag.id;
    els.bookTitle.textContent = mag.name;
    els.reader.classList.add("is-editing");
    els.editMenuBtn.classList.add("is-open");
    els.editMenuBtn.setAttribute("aria-expanded", "true");
    if (!opts.keepShelf) hideShelf();
    els.reader.hidden = false;
  }

  async function enterReader(mag, startPage, opts = {}) {
    if (!opts.skipPrepare) prepareReaderShell(mag, opts);
    await mountBook(mag, startPage ?? 2);
    draft = captureDraft(mag);
    if (!opts.deferChrome) {
      applyFolds();
      renderManager();
      syncProcessActions();
    }
    if (!opts.keepShelf) requestAnimationFrame(relayoutBook);
  }

  function leaveReader() {
    setEditing(false);
    destroyFlip();
    openMagId = null;
    els.reader.hidden = true;
    els.shelf.classList.remove("is-exiting");
    els.shelf.style.visibility = "";
    els.shelf.hidden = false;
    resetBookTilt(true);
    document.querySelectorAll(".mag").forEach((btn) => {
      btn.style.visibility = "";
    });
    renderShelf();
  }

  let bookTiltRaf = 0;
  let bookTiltX = 0;
  let bookTiltY = 0;
  let bookTiltTX = 0;
  let bookTiltTY = 0;

  function applyBookTiltFrame() {
    bookTiltRaf = 0;
    bookTiltX += (bookTiltTX - bookTiltX) * 0.14;
    bookTiltY += (bookTiltTY - bookTiltY) * 0.14;
    if (els.bookStage) {
      els.bookStage.style.transform = `rotateX(${bookTiltY.toFixed(3)}deg) rotateY(${bookTiltX.toFixed(3)}deg)`;
    }
    if (Math.abs(bookTiltTX - bookTiltX) > 0.02 || Math.abs(bookTiltTY - bookTiltY) > 0.02) {
      bookTiltRaf = requestAnimationFrame(applyBookTiltFrame);
    }
  }

  function resetBookTilt(snap) {
    bookTiltTX = 0;
    bookTiltTY = 0;
    if (snap) {
      bookTiltX = 0;
      bookTiltY = 0;
      if (bookTiltRaf) {
        cancelAnimationFrame(bookTiltRaf);
        bookTiltRaf = 0;
      }
      if (els.bookStage) els.bookStage.style.transform = "rotateX(0deg) rotateY(0deg)";
      return;
    }
    if (!bookTiltRaf) bookTiltRaf = requestAnimationFrame(applyBookTiltFrame);
  }

  function bindBookTilt() {
    const stage = els.bookStage;
    if (!stage || stage.dataset.tiltBound) return;
    stage.dataset.tiltBound = "1";
    stage.addEventListener("pointermove", (e) => {
      if (els.reader.hidden || isTurning) return;
      const r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      bookTiltTX = Math.max(-1, Math.min(1, nx)) * 3.2;
      bookTiltTY = Math.max(-1, Math.min(1, ny)) * -2.1;
      if (!bookTiltRaf) bookTiltRaf = requestAnimationFrame(applyBookTiltFrame);
    });
    stage.addEventListener("pointerleave", () => resetBookTilt(false));
  }

  function destroyFlip() {
    isTurning = false;
    if (pageFlip) {
      try { pageFlip.destroy(); } catch (_) {}
      pageFlip = null;
    }
    els.bookStage.innerHTML = "";
  }

  function photoMap(mag) {
    const map = {};
    for (const p of mag.photos) map[p.id] = p;
    return map;
  }

  function makeLinerEl(side) {
    const el = document.createElement("div");
    el.className = "sheet sheet-liner";
    el.dataset.density = "soft";
    el.innerHTML = `<div class="sheet-inner liner-sheet" data-liner="${side}" aria-hidden="true"></div>`;
    return el;
  }

  function makeCoverEl(mag) {
    const el = document.createElement("div");
    el.className = "sheet";
    el.dataset.density = "soft";
    const ph = coverPhotoOf(mag.photos);
    const src = ph ? shownSrc(ph) : mag.cover;
    el.innerHTML = `
      <div class="sheet-inner cover-sheet filter-${mag.coverFilter || "none"}"${ph ? ` data-photo-id="${ph.id}"` : ""}>
        <img src="${src}" alt="" />
        ${ph ? genOverlayMarkup() : ""}
        <div class="plate">${escapeHtml(mag.name)}</div>
        ${replaceBtn()}
      </div>`;
    return el;
  }

  function makeBackEl(mag) {
    const el = document.createElement("div");
    el.className = "sheet";
    el.dataset.density = "soft";
    el.innerHTML = `
      <div class="sheet-inner back-sheet">
        <div class="plate">${escapeHtml(mag.name)}<br />FIN</div>
      </div>`;
    return el;
  }

  function pageNumMarkup(page, mag) {
    if (!page.number) return "";
    const mode = mag.pageNum || "center";
    if (mode === "none") return "";
    const place = mode === "sides" ? (page.number % 2 === 1 ? "left" : "right") : "center";
    return `<div class="page-num is-${place}">${pad(page.number)}</div>`;
  }

  function replaceBtn(photoId) {
    const cover = photoId == null;
    return `<span class="replace-hot">
      <button type="button" class="replace-btn" data-action="${cover ? "replace-cover" : "replace"}"${cover ? "" : ` data-photo-id="${photoId}"`} aria-label="${cover ? "替换封面" : "替换照片"}">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 8.2A8 8 0 0 1 18 5.2L20 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 3.5V8h-4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.5 15.8A8 8 0 0 1 6 18.8L4 17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 20.5V16h4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </span>`;
  }

  function makePageEl(page, mag) {
    const el = document.createElement("div");
    el.className = "sheet";
    const photos = photoMap(mag);
    const slots = page.items.map((item, i) => {
      const photo = photos[item.photoId];
      if (!photo) return "";
      if (item.spread) {
        return `<div class="photo-slot spread-bleed spread-${item.spread}" data-photo-id="${photo.id}">
          <img src="${shownSrc(photo)}" alt="" />
          ${genOverlayMarkup()}
          ${replaceBtn(photo.id)}
        </div>`;
      }
      if (item.f === "polaroid") {
        const kind = item.polaroid || "square";
        return `<div class="photo-slot frame-polaroid polaroid-${kind}" data-photo-id="${photo.id}" style="top:${item.t}%;left:${item.l}%;width:${item.w}%;height:${item.h}%;transform:rotate(${item.r}deg);z-index:${i + 1}">
          <div class="polaroid-face">
            <img src="${shownSrc(photo)}" alt="" />
          </div>
          ${genOverlayMarkup()}
          ${replaceBtn(photo.id)}
        </div>`;
      }
      return `<div class="photo-slot frame-${item.f}${item.f === "tape" ? ` tape-${item.tape || 0}` : ""}" data-photo-id="${photo.id}" style="top:${item.t}%;left:${item.l}%;width:${item.w}%;height:${item.h}%;transform:rotate(${item.r}deg);z-index:${i + 1}">
            <img src="${shownSrc(photo)}" alt="" />
        ${genOverlayMarkup()}
        ${replaceBtn(photo.id)}
      </div>`;
    }).join("");

    const emptyMinus = page.showMinus && page.items.length === 0;
    const emptyPlus = page.showPlus && page.items.length === 0;
    let ux = "";
    if (page.showMinus) {
      ux += `<button type="button" class="ux-btn ux-minus ${emptyMinus ? "ux-hero" : "ux-float"}" data-action="manage">−</button>`;
      if (emptyMinus) ux += `<span class="ux-caption">整理照片</span>`;
    }
    if (page.showPlus) {
      ux += `<button type="button" class="ux-btn ux-plus ${emptyPlus ? "ux-hero" : "ux-float"}" data-action="add">+</button>`;
      if (emptyPlus) ux += `<span class="ux-caption">加入照片</span>`;
    }

    el.innerHTML = `
      <div class="page-paper style-${normalizeStyle(mag.style)} filter-${mag.filter || "none"} process-${normalizeProcess(mag.process)}${page.items.some((it) => it.spread) ? " has-spread" : ""}${page.items.some((it) => it.f === "editorial") ? " has-bleed" : ""}" data-page="${page.number || ""}">
        <div class="page-canvas">${slots}${ux}</div>
        ${pageNumMarkup(page, mag)}
      </div>`;
    return el;
  }

  function fitBook() {
    const stage = els.bookStage;
    const maxW = Math.max(280, (stage && stage.clientWidth) || window.innerWidth - 48);
    const maxH = Math.max(320, (stage && stage.clientHeight) || window.innerHeight - 148);
    const ratio = 430 / 600;
    let pageH = Math.min(640, maxH);
    let pageW = pageH * ratio;
    if (pageW * 2 > maxW) {
      pageW = maxW / 2;
      pageH = pageW / ratio;
    }
    return { pageW: Math.floor(pageW), pageH: Math.floor(pageH) };
  }

  function sizeBookEl(book) {
    const { pageW, pageH } = fitBook();
    book.style.width = `${pageW * 2}px`;
    book.style.height = `${pageH}px`;
    book.style.minWidth = `${pageW * 2}px`;
    book.style.minHeight = `${pageH}px`;
    book.style.setProperty("--book-w", `${pageW * 2}px`);
    book.style.setProperty("--book-h", `${pageH}px`);
    return { pageW, pageH };
  }

  function syncFlipMetrics(book) {
    const { pageW, pageH } = sizeBookEl(book);
    if (!pageFlip) return { pageW, pageH };
    const setting = pageFlip.getSettings();
    setting.width = pageW;
    setting.height = pageH;
    setting.minWidth = pageW;
    setting.maxWidth = pageW;
    setting.minHeight = pageH;
    setting.maxHeight = pageH;
    return { pageW, pageH };
  }

  function mountBook(mag, startPage) {
    destroyFlip();
    const book = document.createElement("div");
    book.id = "book";
    book.className = "is-arming";
    els.bookStage.appendChild(book);
    const { pageW, pageH } = sizeBookEl(book);

    const pages = buildPages(mag);
    book.appendChild(makeLinerEl("front"));
    book.appendChild(makeCoverEl(mag));
    pages.forEach((p) => book.appendChild(makePageEl(p, mag)));
    book.appendChild(makeBackEl(mag));
    book.appendChild(makeLinerEl("back"));

    const sheets = book.querySelectorAll(".sheet");
    pageFlip = new St.PageFlip(book, {
      width: pageW,
      height: pageH,
      size: "fixed",
      autoSize: false,
      minWidth: pageW,
      maxWidth: pageW,
      minHeight: pageH,
      maxHeight: pageH,
      drawShadow: true,
      flippingTime: 780,
      usePortrait: false,
      maxShadowOpacity: 0.16,
      showCover: false,
      mobileScrollSupport: true,
      swipeDistance: 28,
      clickEventForward: true,
      useMouseEvents: true,
      showPageCorners: true,
      disableFlipByClick: false,
      startPage: startPage ?? 2,
    });
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        requestAnimationFrame(() => {
          if (pageFlip) {
            syncFlipMetrics(book);
            pageFlip.update();
            pageFlip.turnToPage(startPage ?? 2);
          }
          book.classList.remove("is-arming");
          updatePager();
          paintProcessUI();
          resolve();
        });
      };
      pageFlip.on("flip", () => {
        updatePager();
        syncFilterCardsFromPage();
      });
      pageFlip.on("changeState", (e) => {
        isTurning = e.data !== "read";
        if (isTurning) resetBookTilt(false);
        const book = document.getElementById("book");
        if (book) {
          book.classList.toggle("is-turning", isTurning);
          if (e.data === "read") {
            book.classList.remove("is-flip-back", "is-cover-flip", "is-back-flip");
          }
        }
        syncCoverBackFlip();
        if (isTurning) startCoverBackFlipWatch();
        updatePager();
      });
      pageFlip.on("init", finish);
      pageFlip.loadFromHTML(sheets);
      setTimeout(finish, 400);
    });
  }

  function pageIsVisibleLeaf(el) {
    if (!el) return false;
    const display = el.style.display || getComputedStyle(el).display;
    return display !== "none";
  }

  function syncCoverBackFlip() {
    const book = document.getElementById("book");
    if (!book) return;
    if (!isTurning) {
      book.classList.remove("is-cover-flip", "is-back-flip");
      return;
    }
    const coverFlip = [...book.querySelectorAll(".stf__item")].some((el) => el.querySelector(".cover-sheet") && pageIsVisibleLeaf(el));
    const backFlip = [...book.querySelectorAll(".stf__item")].some((el) => el.querySelector(".back-sheet") && pageIsVisibleLeaf(el));
    book.classList.toggle("is-cover-flip", coverFlip);
    book.classList.toggle("is-back-flip", backFlip);
    if (coverFlip) book.classList.remove("is-cover");
    if (backFlip) book.classList.remove("is-back");
  }

  let coverBackWatch = 0;
  function startCoverBackFlipWatch() {
    if (coverBackWatch) return;
    const tick = () => {
      coverBackWatch = 0;
      syncCoverBackFlip();
      if (isTurning) coverBackWatch = requestAnimationFrame(tick);
    };
    coverBackWatch = requestAnimationFrame(tick);
  }
  function bookMarks(count) {
    return {
      cover: 0,
      first: 2,
      edit: Math.max(2, count - 4),
      back: Math.max(0, count - 2),
      hasContent: count > 6,
    };
  }

  function viewInfo() {
    if (!pageFlip) return { label: "", kind: "cover", marks: bookMarks(1) };
    const count = pageFlip.getPageCount();
    const index = pageFlip.getCurrentPageIndex();
    const marks = bookMarks(count);
    if (index <= 1) return { label: "封面", kind: "cover", index, count, marks };
    if (index >= marks.back) return { label: "封底", kind: "back", index, count, marks };
    if (index >= marks.edit) return { label: "编辑", kind: "edit", index, count, marks };
    return {
      label: `${pad(index - 1)}  ${pad(index)}`,
      kind: "content",
      index,
      count,
      marks,
    };
  }

  function spreadCount(count) {
    return Math.max(1, Math.ceil(count / 2));
  }

  function spreadFromPage(index, count) {
    return Math.floor(Math.max(0, index) / 2);
  }

  function pageFromSpread(spread, count) {
    return Math.min(Math.max(0, count - 1), Math.max(0, spread) * 2);
  }

  function syncClosedLeaf() {}

  function updatePager() {
    if (!pageFlip) return;
    const view = viewInfo();
    els.pageLabel.textContent = view.label;
    els.prevPage.disabled = view.index <= 0 || isTurning;
    els.nextPage.disabled = view.index >= view.marks.back || isTurning;
    els.jumpHome.disabled = view.index <= 0 || isTurning;
    els.jumpEdit.disabled = isTurning;
    els.pageSlider.disabled = isTurning;
    els.jumpHome.classList.toggle("is-on", view.kind === "cover");
    els.jumpEdit.classList.toggle("is-on", view.kind === "edit");
    const bookEl = document.getElementById("book");
    if (bookEl) {
      bookEl.classList.toggle("is-cover", view.kind === "cover" && !isTurning);
      bookEl.classList.toggle("is-back", view.kind === "back" && !isTurning);
      syncClosedLeaf(bookEl, view);
    }
    sliderLock = true;
    els.pageSlider.max = String(Math.max(0, spreadCount(view.count) - 1));
    els.pageSlider.value = String(spreadFromPage(view.index, view.count));
    sliderLock = false;
  }

  els.pager.addEventListener("pointerdown", (e) => e.stopPropagation());
  els.pager.addEventListener("mousedown", (e) => e.stopPropagation());
  els.pageSlider.addEventListener("pointerdown", (e) => e.stopPropagation());
  els.pageSlider.addEventListener("mousedown", (e) => e.stopPropagation());
  els.pageSlider.addEventListener("input", () => {
    if (!pageFlip || sliderLock || isTurning) return;
    const count = pageFlip.getPageCount();
    const page = pageFromSpread(Number(els.pageSlider.value), count);
    pageFlip.turnToPage(page);
    updatePager();
  });
  els.prevPage.addEventListener("click", () => {
    if (!pageFlip || isTurning) return;
    document.getElementById("book")?.classList.add("is-flip-back");
    pageFlip.flipPrev("bottom");
  });
  els.nextPage.addEventListener("click", () => {
    if (!pageFlip || isTurning) return;
    document.getElementById("book")?.classList.remove("is-flip-back");
    pageFlip.flipNext("bottom");
  });
  els.jumpHome.addEventListener("click", () => {
    if (!pageFlip || isTurning) return;
    pageFlip.turnToPage(0);
    updatePager();
  });
  els.jumpEdit.addEventListener("click", () => {
    if (!pageFlip || isTurning) return;
    const { marks } = viewInfo();
    pageFlip.turnToPage(marks.edit);
    updatePager();
  });

  els.bookStage.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".replace-hot")) e.stopPropagation();
    const book = document.getElementById("book");
    if (!book || els.reader.hidden) return;
    const r = book.getBoundingClientRect();
    if (!r.width) return;
    book.classList.toggle("is-flip-back", e.clientX < r.left + r.width * 0.5);
  }, true);
  els.bookStage.addEventListener("touchstart", (e) => {
    if (e.target.closest(".replace-hot")) e.stopPropagation();
  }, { capture: true, passive: true });

  els.bookStage.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    if (btn.dataset.action === "replace") {
      replacePhotoId = btn.dataset.photoId;
      els.replaceFile.click();
      return;
    }
    if (btn.dataset.action === "replace-cover") {
      openManager({ pickCover: true });
      return;
    }
    openManager(btn.dataset.action === "add");
  });

  function closeEditorFromBook(e) {
    if (!els.reader.classList.contains("is-editing")) return;
    if (e.target.closest(".pager, .reader-chrome, .export-btn, .pager-track, .back-btn, .book-title, .gen-dock, [data-action], .photo-slot, .ux-btn, .replace-hot")) {
      return;
    }
    if (!e.target.closest(".book-wrap, .book-stage")) return;
    if (e.target.closest(".cover-sheet, .back-sheet")) return;
    const info = viewInfo();
    if (info.kind === "cover" || info.kind === "back") return;
    e.preventDefault();
    e.stopPropagation();
    setEditing(false);
  }
  els.readerMain.addEventListener("pointerdown", closeEditorFromBook, true);

  els.backBtn.addEventListener("click", leaveReader);

  function currentMag() {
    return magById(openMagId);
  }

  let titleBeforeEdit = "";

  function placeCaretEnd(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function normalizeTitle(raw) {
    return String(raw || "").replace(/\s+/g, " ").trim().slice(0, 24);
  }

  function renameMagazine(name) {
    const mag = currentMag();
    if (!mag) return;
    const next = normalizeTitle(name) || mag.name;
    els.bookTitle.textContent = next;
    if (next === mag.name) return;
    mag.name = next;
    saveState();
    document.querySelectorAll("#book .cover-sheet .plate").forEach((el) => {
      el.textContent = next;
    });
    document.querySelectorAll("#book .back-sheet .plate").forEach((el) => {
      el.innerHTML = `${escapeHtml(next)}<br />FIN`;
    });
    renderShelf();
  }

  els.bookTitle.addEventListener("focus", () => {
    titleBeforeEdit = els.bookTitle.textContent;
  });
  els.bookTitle.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      e.preventDefault();
      els.bookTitle.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      els.bookTitle.textContent = titleBeforeEdit;
      els.bookTitle.blur();
    }
  });
  els.bookTitle.addEventListener("input", () => {
    const text = (els.bookTitle.textContent || "").replace(/\n/g, "");
    if (text.length > 24) {
      els.bookTitle.textContent = text.slice(0, 24);
      placeCaretEnd(els.bookTitle);
    }
  });
  els.bookTitle.addEventListener("paste", (e) => {
    e.preventDefault();
    const text = normalizeTitle(e.clipboardData.getData("text"));
    document.execCommand("insertText", false, text);
  });
  els.bookTitle.addEventListener("blur", () => {
    renameMagazine(els.bookTitle.textContent);
  });

  function strBytes(s) {
    return new TextEncoder().encode(s);
  }
  function concatBytes(parts) {
    const total = parts.reduce((n, p) => n + p.length, 0);
    const out = new Uint8Array(total);
    let o = 0;
    for (const p of parts) {
      out.set(p, o);
      o += p.length;
    }
    return out;
  }
  function dataUrlToBytes(url) {
    const b64 = url.split(",")[1] || "";
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function jpegPagesToPdf(pages, wPt, hPt) {
    const chunks = [];
    let pos = 0;
    const xref = [0];
    const write = (data) => {
      if (typeof data === "string") data = strBytes(data);
      chunks.push(data);
      pos += data.length;
    };
    const beginObj = () => xref.push(pos);

    write("%PDF-1.4\n%\x80\x80\x80\x80\n");
    beginObj();
    write("1 0 obj << /Type /Catalog /Pages 2 0 R /PageLayout /TwoPageRight /ViewerPreferences << /DisplayDocTitle true /Direction /L2R >> >>\nendobj\n");
    const kidIds = pages.map((_, i) => 3 + i * 3);
    beginObj();
    write(`2 0 obj << /Type /Pages /Count ${pages.length} /Kids [${kidIds.map((id) => `${id} 0 R`).join(" ")}] >>\nendobj\n`);

    pages.forEach((page, i) => {
      const pageId = 3 + i * 3;
      const contentId = pageId + 1;
      const imageId = pageId + 2;
      const stream = `q ${wPt} 0 0 ${hPt} 0 0 cm /Im${i} Do Q\n`;
      beginObj();
      write(`${pageId} 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 ${wPt} ${hPt}] /Resources << /XObject << /Im${i} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`);
      beginObj();
      write(`${contentId} 0 obj << /Length ${stream.length} >>\nstream\n${stream}endstream\nendobj\n`);
      beginObj();
      write(`${imageId} 0 obj << /Type /XObject /Subtype /Image /Width ${page.w} /Height ${page.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.bytes.length} >>\nstream\n`);
      write(page.bytes);
      write("\nendstream\nendobj\n");
    });

    const xrefPos = pos;
    write(`xref\n0 ${xref.length}\n`);
    write("0000000000 65535 f \n");
    for (let i = 1; i < xref.length; i++) {
      write(`${String(xref[i]).padStart(10, "0")} 00000 n \n`);
    }
    write(`trailer << /Size ${xref.length} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`);
    return concatBytes(chunks);
  }

  function collectExportSheets(mag) {
    const pages = buildPages(mag).filter((p) => p.kind !== "edit");
    const cover = makeCoverEl(mag);
    const inner = pages.map((p) => makePageEl(p, mag));
    const back = makeBackEl(mag);
    return [cover, ...inner, back];
  }

  async function capturePdfPage(sheet) {
    const page = document.createElement("div");
    page.className = "pdf-page";
    page.appendChild(sheet);
    document.body.appendChild(page);
    const canvas = await html2canvas(page, {
      scale: 1,
      useCORS: true,
      backgroundColor: "#f2eee4",
      logging: false,
      width: 1240,
      height: 1754,
    });
    page.remove();
    return {
      w: canvas.width,
      h: canvas.height,
      bytes: dataUrlToBytes(canvas.toDataURL("image/jpeg", 0.9)),
    };
  }

  async function exportMagazinePdf() {
    const mag = currentMag();
    if (!mag || typeof html2canvas !== "function") return;
    els.exportPdf.disabled = true;
    const prev = els.exportPdf.textContent;
    els.exportPdf.textContent = "导出中";
    try {
      const sheets = collectExportSheets(mag);
      const images = [];
      for (const sheet of sheets) {
        images.push(await capturePdfPage(sheet));
      }
      const pdf = jpegPagesToPdf(images, 595, 842);
      const blob = new Blob([pdf], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${normalizeTitle(mag.name) || "画册"}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } catch (err) {
      console.error(err);
      els.exportPdf.textContent = "导出失败";
      await wait(1400);
    } finally {
      els.exportPdf.disabled = false;
      els.exportPdf.textContent = prev;
    }
  }

  els.exportPdf.addEventListener("click", (e) => {
    e.stopPropagation();
    exportMagazinePdf();
  });
  els.exportPdf.addEventListener("pointerdown", (e) => e.stopPropagation());

  function relayoutBook() {
    if (!pageFlip) return;
    const book = document.getElementById("book");
    if (book) syncFlipMetrics(book);
    pageFlip.update();
    updatePager();
  }

  function loadFolds() {
    try {
      const raw = JSON.parse(localStorage.getItem(FOLD_KEY));
      if (raw && typeof raw === "object") return { ...DEFAULT_FOLDED, ...raw };
    } catch (_) {}
    return { ...DEFAULT_FOLDED };
  }

  function saveFolds(map) {
    localStorage.setItem(FOLD_KEY, JSON.stringify(map));
  }

  function applyFolds() {
    const map = loadFolds();
    els.editDrawer.querySelectorAll(".edit-fold").forEach((sec) => {
      const id = sec.dataset.fold;
      sec.classList.toggle("is-folded", !!map[id]);
    });
  }

  function toggleFold(id) {
    if (!id) return;
    const map = loadFolds();
    map[id] = !map[id];
    saveFolds(map);
    applyFolds();
  }

  function stayPageIndex(mag) {
    const stay = pageFlip ? pageFlip.getCurrentPageIndex() : 1;
    const count = buildPages(mag).length + 4;
    return Math.max(0, Math.min(stay, count - 1));
  }

  function captureDraft(mag) {
    return {
      photos: mag.photos.map((p) => clonePhoto(p)),
      maxPerPage: mag.maxPerPage,
      style: normalizeStyle(mag.style),
      filter: mag.filter || "none",
      coverFilter: mag.coverFilter || "none",
      process: normalizeProcess(mag.process),
      pageNum: mag.pageNum || "center",
    };
  }

  function ensureDraft() {
    const mag = currentMag();
    if (!mag) return null;
    if (!draft) draft = captureDraft(mag);
    return draft;
  }

  function editingCover() {
    return viewInfo().kind === "cover";
  }

  function syncFilterCardsFromPage() {
    if (!draft || !els.reader.classList.contains("is-editing")) return;
    const photos = currentSpreadPhotos();
    if (photos.length) {
      const ids = [...new Set(photos.map((p) => normalizeProcess(p.process)))];
      if (ids.length === 1) draft.process = ids[0];
    }
    renderManager();
  }

  function setEditing(on) {
    els.reader.classList.toggle("is-editing", on);
    els.editMenuBtn.classList.toggle("is-open", on);
    els.editMenuBtn.setAttribute("aria-expanded", on ? "true" : "false");
    if (on) {
      const mag = currentMag();
      if (mag) {
        draft = captureDraft(mag);
        applyFolds();
        renderManager();
      }
    }
    requestAnimationFrame(relayoutBook);
    setTimeout(relayoutBook, 400);
  }

  function openManager(arg) {
    const mag = currentMag();
    if (!mag) return;
    const opts = arg && typeof arg === "object" ? arg : { autoPick: !!arg };
    pickingCover = !!opts.pickCover;
    draft = captureDraft(mag);
    els.managerTitle.textContent = pickingCover ? "选一张做封面" : mag.name;
    if (els.managerCopy) {
      els.managerCopy.textContent = pickingCover
        ? "点一张照片设为封面。封面只出现在封面上，不编进内页。没有合适的就先加入照片。"
        : "拖动调整先后。每张底下是原片和生成过的版本，点一下就能换回，重新生成也不会丢掉旧版。封面那张只参与风格化。";
    }
    renderPhotoBank();
    els.managerModal.showModal();
    if (opts.autoPick) els.photoFiles.click();
  }

  function assignCover(photoId) {
    if (!ensureDraft()) return;
    const next = draft.photos.find((p) => p.id === photoId);
    if (!next) return;
    draft.photos = setCoverFromPhoto(draft.photos, photoId);
    const fromPick = pickingCover;
    pickingCover = false;
    if (fromPick && els.managerModal.open) els.managerModal.close();
    applyDraft({ layout: true });
    if (els.managerModal.open) renderPhotoBank();
  }

  function openCustomNameModal() {
    if (!els.customProcessNameModal) return;
    pendingPromptId = null;
    els.customProcessNameEn.value = "";
    els.customProcessNameZh.value = "";
    els.customProcessNameModal.showModal();
    requestAnimationFrame(() => els.customProcessNameEn.focus());
  }

  function openCustomPromptModal(id, { runAfter = false } = {}) {
    const item = customProcesses.find((s) => s.id === id);
    if (!item || !els.customProcessPromptModal) return;
    editingCustomId = id;
    pendingProcessAfterPrompt = runAfter;
    if (els.customProcessPromptKicker) els.customProcessPromptKicker.textContent = item.name;
    if (els.customProcessPromptTitle) els.customProcessPromptTitle.textContent = item.note || "自定义提示词";
    els.customProcessPromptText.value = item.prompt || "";
    els.customProcessPromptModal.showModal();
    requestAnimationFrame(() => els.customProcessPromptText.focus());
  }

  function removeCustomProcess(id) {
    const item = customProcesses.find((s) => s.id === id);
    if (!item) return;
    if (!window.confirm(`删掉「${item.name} / ${item.note}」？已经生成过的版本还在照片编辑里。`)) return;
    customProcesses = customProcesses.filter((s) => s.id !== id);
    saveCustomProcesses();
    if (draft && draft.process === id) {
      draft.process = "none";
      applyProcessToPhotos(currentSpreadPhotos(), "none");
      applyDraft({ layout: false });
    }
    renderManager();
  }

  async function applyProcessStyle(item) {
    if (!draft) return;
    const live = item.custom ? customProcesses.find((s) => s.id === item.id) || item : item;
    if (live.custom && !String(live.prompt || "").trim()) {
      openCustomPromptModal(live.id, { runAfter: true });
      return;
    }
    const spread = currentSpreadPhotos();
    const already = normalizeProcess(draft.process) === live.id;
    const missing = live.skill && spread.some((p) => !processCache(p, live.id));
    if (already && !missing) {
      if (live.skill) applyProcessToPhotos(spread, live.id);
      else applyProcessToPhotos(spread, "none");
      applyDraft({ layout: false });
      return;
    }
    const prev = draft.process;
    draft.process = live.id;
    renderManager();
    try {
      await ensureProcessImages(live.id);
      applyDraft({ layout: false });
    } catch (err) {
      const kept = spread.some((p) => processCache(p, live.id));
      if (!kept) {
        draft.process = prev;
        renderManager();
      }
      alert(err.message || "处理失败");
    }
  }

  function renderManager() {
    if (!draft) return;
    els.maxPerPageRow.innerHTML = "";
    [0.5, 1, 2, 3, 4, 5, 6].forEach((n) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (Number(draft.maxPerPage) === n ? " is-on" : "");
      b.textContent = String(n);
      b.addEventListener("click", () => {
        if (Number(draft.maxPerPage) === n) return;
        draft.maxPerPage = n;
        renderManager();
        applyDraft({ layout: true });
      });
      els.maxPerPageRow.appendChild(b);
    });

    els.styleCards.innerHTML = "";
    STYLES.forEach((style) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "style-card" + (draft.style === style.id ? " is-on" : "");
      const mini = style.mini.map(
        ([l, t, w, h]) => `<i style="left:${l}%;top:${t}%;width:${w}%;height:${h}%"></i>`
      ).join("");
      b.innerHTML = `<b>${style.name}</b><div class="style-mini is-${style.id}">${mini}</div>`;
      b.addEventListener("click", () => {
        if (draft.style === style.id) return;
        draft.style = style.id;
        renderManager();
        applyDraft({ layout: true });
      });
      els.styleCards.appendChild(b);
    });

    const pageNum = draft.pageNum || "center";
    els.pageNumRow.innerHTML = "";
    PAGE_NUM_OPTS.forEach((opt) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip chip-icon" + (pageNum === opt.id ? " is-on" : "");
      b.setAttribute("aria-label", opt.label);
      b.title = opt.label;
      b.innerHTML = opt.icon;
      b.addEventListener("click", () => {
        if (draft.pageNum === opt.id) return;
        draft.pageNum = opt.id;
        renderManager();
        applyDraft({ layout: false });
      });
      els.pageNumRow.appendChild(b);
    });

    const activeFilter = editingCover() ? (draft.coverFilter || "none") : (draft.filter || "none");
    els.filterCards.innerHTML = "";
    FILTERS.forEach((filter) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "filter-card" + (activeFilter === filter.id ? " is-on" : "");
      b.innerHTML = `<div class="filter-mini filter-${filter.id}"><span>${filter.name}</span></div>`;
      b.addEventListener("click", () => {
        if (editingCover()) {
          if (draft.coverFilter === filter.id) return;
          draft.coverFilter = filter.id;
        } else {
          if (draft.filter === filter.id) return;
          draft.filter = filter.id;
        }
        renderManager();
        applyDraft({ layout: false });
      });
      els.filterCards.appendChild(b);
    });

    els.processCards.innerHTML = "";
    PROCESS_STYLES.filter((item) => !item.hidden).concat(customProcesses).forEach((item) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "style-card process-card" + (normalizeProcess(draft.process) === item.id ? " is-on" : "");
      const num = document.createElement("span");
      num.className = "process-num";
      num.textContent = item.name;
      const note = document.createElement("small");
      note.textContent = item.note;
      card.appendChild(num);
      card.appendChild(note);
      card.addEventListener("click", () => applyProcessStyle(item));
      if (item.custom) {
        const wrap = document.createElement("div");
        wrap.className = "process-card-wrap";
        const tools = document.createElement("div");
        tools.className = "process-card-tools";
        const edit = document.createElement("button");
        edit.type = "button";
        edit.title = "改提示词";
        edit.setAttribute("aria-label", "改提示词");
        edit.textContent = "改";
        edit.addEventListener("click", (e) => {
          e.stopPropagation();
          openCustomPromptModal(item.id);
        });
        const del = document.createElement("button");
        del.type = "button";
        del.title = "删除";
        del.setAttribute("aria-label", "删除这个风格");
        del.textContent = "×";
        del.addEventListener("click", (e) => {
          e.stopPropagation();
          removeCustomProcess(item.id);
        });
        tools.appendChild(edit);
        tools.appendChild(del);
        wrap.appendChild(card);
        wrap.appendChild(tools);
        els.processCards.appendChild(wrap);
      } else {
        els.processCards.appendChild(card);
      }
    });
    const add = document.createElement("button");
    add.type = "button";
    add.className = "style-card process-card is-add";
    add.innerHTML = `<span class="process-num">+ New prompt</span><small>新增提示词</small>`;
    add.addEventListener("click", openCustomNameModal);
    els.processCards.appendChild(add);
    syncProcessActions();
    renderApiProviders();
  }

  function renderApiProviders() {
    if (!els.apiProviderRow) return;
    const settings = loadApiSettings();
    els.apiProviderRow.innerHTML = "";
    API_PROVIDERS.forEach((item) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      if (item.ready) b.classList.add("is-ready");
      if (item.untested) b.classList.add("is-untested");
      if (settings.provider === item.id) b.classList.add("is-on");
      b.textContent = item.name;
      if (item.untested) b.title = "未经测试";
      b.addEventListener("click", () => {
        if (els.processApiKey) {
          const prev = els.processApiKey.dataset.provider || loadApiSettings().provider;
          if (prev !== item.id) {
            saveApiKey(normalizeApiKey(els.processApiKey.value), prev);
          }
        }
        saveApiSettings({ provider: item.id });
        renderApiProviders();
      });
      els.apiProviderRow.appendChild(b);
    });
    const meta = API_PROVIDERS.find((p) => p.id === settings.provider) || API_PROVIDERS[0];
    if (els.apiHint) {
      if (meta.untested) {
        els.apiHint.textContent = `未经测试。${meta.hint}`;
      } else if (meta.id === "doubao") {
        const plan = isArkPlanKey(els.processApiKey?.value || settings.key);
        els.apiHint.innerHTML = plan
          ? `已识别 Agent Plan 专属 Key。请用 python3 serve.py 打开本页（http://127.0.0.1:8765/），用量看控制台「用量统计」。`
          : `填方舟 <a href="${ARK_APIKEY_CONSOLE}" target="_blank" rel="noopener">API Key</a>。Agent Plan 请用「使用配置」里 ark- 开头的专属 Key；按量调用才去<a href="${ARK_RECHARGE}" target="_blank" rel="noopener">费用中心充值</a>。`;
      } else {
        els.apiHint.textContent = meta.hint;
      }
    }
    if (els.arkModelInput) {
      const showArk = meta.id === "doubao" && !isArkPlanKey(els.processApiKey?.value || settings.key);
      els.arkModelInput.hidden = !showArk;
      if (showArk && !els.arkModelInput.dataset.bound) {
        els.arkModelInput.dataset.bound = "1";
        els.arkModelInput.value = settings.arkModel || "";
        const persistModel = () => saveApiSettings({ arkModel: els.arkModelInput.value.trim() });
        els.arkModelInput.addEventListener("change", persistModel);
        els.arkModelInput.addEventListener("paste", () => setTimeout(persistModel, 0));
      }
    }
    if (els.apiKeyRow) els.apiKeyRow.hidden = !meta.needKey;
    if (els.processApiKey) {
      els.processApiKey.hidden = !meta.needKey;
      els.processApiKey.placeholder = meta.needKey ? `粘贴 ${meta.name} 的 API Key` : "";
      const prevProvider = els.processApiKey.dataset.provider || "";
      const switched = !!(prevProvider && prevProvider !== settings.provider);
      if (switched) setApiKeyVisible(false);
      els.processApiKey.dataset.provider = settings.provider;
      if (switched || document.activeElement !== els.processApiKey) {
        els.processApiKey.value = settings.key || "";
      }
      if (!els.processApiKey.dataset.bound) {
        els.processApiKey.dataset.bound = "1";
        const persistKey = () => {
          const id = els.processApiKey.dataset.provider || loadApiSettings().provider;
          saveApiKey(normalizeApiKey(els.processApiKey.value), id);
          renderApiProviders();
        };
        els.processApiKey.addEventListener("change", persistKey);
        els.processApiKey.addEventListener("paste", () => setTimeout(persistKey, 0));
      }
    }
    if (els.processApiKeyToggle) {
      els.processApiKeyToggle.hidden = !meta.needKey;
      if (!els.processApiKeyToggle.dataset.bound) {
        els.processApiKeyToggle.dataset.bound = "1";
        els.processApiKeyToggle.addEventListener("click", (e) => {
          e.preventDefault();
          setApiKeyVisible(els.processApiKey.type !== "text");
        });
      }
    }
  }

  function renderPhotoBank() {
    if (!draft) return;
    els.photoBank.className = "photo-bank" + (pickingCover ? " is-picking-cover" : "");
    els.photoBank.innerHTML = "";
    if (!draft.photos.length) {
      els.photoBank.innerHTML = `<div class="photo-empty">还没有照片。点上方加入，可拖动调整先后。</div>`;
      return;
    }
    const cover = coverPhotoOf(draft.photos);
    const listed = cover
      ? [cover, ...innerPhotos(draft.photos)]
      : innerPhotos(draft.photos);
    let innerN = 0;
    listed.forEach((photo) => {
      const isCover = isCoverPhoto(photo);
      if (!isCover) innerN += 1;
      const item = document.createElement("div");
      item.className = "photo-item" + (isCover ? " is-cover" : "");
      const cell = document.createElement("div");
      cell.className = "photo-cell" + (isCover ? " is-cover" : "");
      cell.draggable = !isCover && !pickingCover;
      cell.dataset.id = photo.id;
      cell.dataset.photoId = photo.id;
      const order = isCover
        ? `<span class="photo-order is-cover">封面</span>`
        : `<span class="photo-order">${pad(innerN)}</span>`;
      const coverBtn = isCover || pickingCover
        ? ""
        : `<button type="button" class="use-cover" data-id="${photo.id}" title="设为封面">做封面</button>`;
      const kill = isCover
        ? ""
        : `<button type="button" class="kill" data-id="${photo.id}">−</button>`;
      cell.innerHTML = `<img src="${shownSrc(photo)}" alt="" draggable="false" />${genOverlayMarkup()}${order}<button type="button" class="dl" data-id="${photo.id}" title="下载当前版本">↓</button>${kill}${coverBtn}`;
      cell.querySelector(".dl").addEventListener("pointerdown", (e) => e.stopPropagation());
      cell.querySelector(".dl").addEventListener("click", (e) => {
        e.stopPropagation();
        downloadShownPhoto(photo);
      });
      const killEl = cell.querySelector(".kill");
      if (killEl) {
        killEl.addEventListener("pointerdown", (e) => e.stopPropagation());
        killEl.addEventListener("click", (e) => {
          e.stopPropagation();
          draft.photos = draft.photos.filter((p) => p.id !== photo.id);
          renderPhotoBank();
          applyDraft({ layout: true, toEdit: true });
        });
      }
      const useCover = cell.querySelector(".use-cover");
      if (useCover) {
        useCover.addEventListener("pointerdown", (e) => e.stopPropagation());
        useCover.addEventListener("click", (e) => {
          e.stopPropagation();
          assignCover(photo.id);
        });
      }
      if (pickingCover) {
        cell.addEventListener("click", () => assignCover(photo.id));
      }
      if (!isCover && !pickingCover) {
        cell.addEventListener("dragstart", (e) => {
          dragPhotoId = photo.id;
          cell.classList.add("is-dragging");
          e.dataTransfer.effectAllowed = "move";
        });
        cell.addEventListener("dragend", () => {
          cell.classList.remove("is-dragging");
          dragPhotoId = null;
        });
        cell.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          cell.classList.add("is-drop");
        });
        cell.addEventListener("dragleave", () => cell.classList.remove("is-drop"));
        cell.addEventListener("drop", (e) => {
          e.preventDefault();
          cell.classList.remove("is-drop");
          if (!dragPhotoId || dragPhotoId === photo.id) return;
          const from = draft.photos.findIndex((p) => p.id === dragPhotoId);
          const to = draft.photos.findIndex((p) => p.id === photo.id);
          if (from < 0 || to < 0) return;
          if (isCoverPhoto(draft.photos[from]) || isCoverPhoto(draft.photos[to])) return;
          const [moved] = draft.photos.splice(from, 1);
          draft.photos.splice(to, 0, moved);
          renderPhotoBank();
          applyDraft({ layout: true, toEdit: true });
        });
      }
      const versions = document.createElement("div");
      versions.className = "photo-versions";
      const origBtn = document.createElement("button");
      origBtn.type = "button";
      origBtn.className = "ver-orig" + (!photo.activeVersionId || normalizeProcess(photo.process) === "none" ? " is-on" : "");
      origBtn.title = "原片";
      origBtn.textContent = "原";
      origBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
      origBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        applyPhotoVersion(photo, null);
        const magPhoto = currentMag() && currentMag().photos.find((p) => p.id === photo.id);
        if (magPhoto) Object.assign(magPhoto, clonePhoto(photo));
        patchPhotoSrc(photo.id, shownSrc(photo));
        saveState();
        renderPhotoBank();
      });
      versions.appendChild(origBtn);
      (photo.versions || []).forEach((ver, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = photo.activeVersionId === ver.id ? "is-on" : "";
        btn.title = `${processMeta(ver.processId).name} · ${i + 1}`;
        btn.innerHTML = `<img src="${ver.src}" alt="" draggable="false" />`;
        btn.addEventListener("pointerdown", (e) => e.stopPropagation());
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          applyPhotoVersion(photo, ver.id);
          const magPhoto = currentMag() && currentMag().photos.find((p) => p.id === photo.id);
          if (magPhoto) Object.assign(magPhoto, clonePhoto(photo));
          patchPhotoSrc(photo.id, shownSrc(photo));
          saveState();
          renderPhotoBank();
        });
        versions.appendChild(btn);
      });
      item.appendChild(cell);
      item.appendChild(versions);
      els.photoBank.appendChild(item);
    });
    paintProcessUI();
  }

  els.addPhotosBtn.addEventListener("click", () => els.photoFiles.click());
  if (els.editPhotosBtn) {
    els.editPhotosBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openManager();
    });
  }
  if (els.editAddPhotosBtn) {
    els.editAddPhotosBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openManager(true);
    });
  }
  els.managerClose.addEventListener("click", () => els.managerModal.close());
  els.managerModal.addEventListener("close", () => {
    pickingCover = false;
  });
  els.managerModal.addEventListener("click", (e) => {
    if (e.target === els.managerModal) els.managerModal.close();
  });
  els.editDrawer.addEventListener("click", (e) => {
    const tog = e.target.closest(".fold-toggle");
    if (!tog) return;
    toggleFold(tog.dataset.fold);
  });
  els.replaceFile.addEventListener("change", async () => {
    const file = els.replaceFile.files[0];
    els.replaceFile.value = "";
    const mag = currentMag();
    const photoId = replacePhotoId;
    replacePhotoId = null;
    if (!file || !mag) return;
    const packed = await compressImage(file, 1400, 0.8);
    if (!photoId) return;
    const photo = mag.photos.find((p) => p.id === photoId);
    if (!photo) return;
    photo.originalSrc = packed.src;
    photo.src = packed.src;
    photo.processed = {};
    photo.versions = [];
    photo.process = "none";
    photo.activeVersionId = null;
    photo.w = packed.w;
    photo.h = packed.h;
    if (draft) {
      const dp = draft.photos.find((p) => p.id === photoId);
      if (dp) {
        dp.originalSrc = packed.src;
        dp.src = packed.src;
        dp.processed = {};
        dp.versions = [];
        dp.process = "none";
        dp.activeVersionId = null;
        dp.w = packed.w;
        dp.h = packed.h;
      }
    }
    saveState();
    mountBook(mag, stayPageIndex(mag));
  });
  els.photoFiles.addEventListener("change", async () => {
    const files = [...els.photoFiles.files];
    els.photoFiles.value = "";
    if (!files.length) return;
    if (!draft) draft = captureDraft(currentMag() || { photos: [], maxPerPage: 2, style: "scrapbook", filter: "none", coverFilter: "none", process: "none", pageNum: "center" });
    if (!currentMag()) return;
    for (const file of files) {
      const packed = await compressImage(file, 1400, 0.8);
      draft.photos.push({
        id: uid("ph"),
        src: packed.src,
        originalSrc: packed.src,
        processed: {},
        versions: [],
        process: "none",
        activeVersionId: null,
        w: packed.w,
        h: packed.h,
        name: file.name,
      });
    }
    renderPhotoBank();
    applyDraft({ layout: true, toEdit: true });
  });

  function swapClassPrefix(el, prefix, next) {
    [...el.classList].filter((c) => c.startsWith(prefix)).forEach((c) => el.classList.remove(c));
    if (next) el.classList.add(next);
  }

  function bookRoot() {
    return els.bookStage || document.getElementById("book");
  }

  function paintPageNums(mag) {
    const root = bookRoot();
    if (!root) return;
    root.querySelectorAll(".page-paper").forEach((paper) => {
      const existing = paper.querySelector(".page-num");
      if (existing) existing.remove();
      const n = parseInt(paper.dataset.page, 10);
      if (!n) return;
      paper.insertAdjacentHTML("beforeend", pageNumMarkup({ number: n }, mag));
    });
  }

  function paintPageChrome(mag) {
    const root = bookRoot();
    if (!root) return;
    root.querySelectorAll(".page-paper").forEach((paper) => {
      swapClassPrefix(paper, "filter-", `filter-${mag.filter || "none"}`);
      swapClassPrefix(paper, "process-", `process-${normalizeProcess(mag.process)}`);
    });
    root.querySelectorAll(".cover-sheet").forEach((cover) => {
      swapClassPrefix(cover, "filter-", `filter-${mag.coverFilter || "none"}`);
    });
    paintPageNums(mag);
    mag.photos.forEach((photo) => {
      patchPhotoSrc(photo.id, shownSrc(photo));
    });
  }

  async function applyDraft({ layout = true, toEdit = false } = {}) {
    const mag = currentMag();
    if (!mag || !draft) return;
    mag.photos = draft.photos.map((p) => displayPhoto(p, p.process));
    mag.maxPerPage = draft.maxPerPage;
    mag.style = normalizeStyle(draft.style);
    mag.filter = draft.filter || "none";
    mag.coverFilter = draft.coverFilter || "none";
    mag.process = normalizeProcess(draft.process);
    mag.pageNum = draft.pageNum || "center";
    syncMagazineCover(mag);
    if (layout) {
      await ensurePhotoSizes(mag.photos);
      generateLayout(mag);
    }
    saveState();
    syncProcessActions();
    const canPatch = pageFlip && !layout && !toEdit;
    if (canPatch) {
      paintPageChrome(mag);
    } else if (toEdit) {
      const count = buildPages(mag).length + 4;
      await mountBook(mag, bookMarks(count).edit);
    } else {
      await mountBook(mag, stayPageIndex(mag));
    }
    renderShelf();
  }

  function randomizeDraft() {
    if (!ensureDraft()) return;
    draft.maxPerPage = pick([0.5, 1, 2, 3, 4, 5, 6]);
    draft.style = pick(STYLES).id;
    draft.filter = pick(FILTERS).id;
    draft.coverFilter = pick(FILTERS).id;
    draft.pageNum = pick(["none", "center", "sides"]);
    renderManager();
    applyDraft({ layout: true });
  }

  els.randomAllBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    randomizeDraft();
  });
  els.rerollBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!ensureDraft()) return;
    applyDraft({ layout: true });
  });
  if (els.processStopBtn) {
    els.processStopBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!processRun) return;
      processRun.stopAfterCurrent = true;
      syncProcessActions();
      if (els.processStatus) {
        els.processStatus.hidden = false;
        els.processStatus.textContent = "这张完成后停止";
      }
    });
  }
  els.processRegenBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!ensureDraft()) return;
    const id = normalizeProcess(draft.process);
    if (!processMeta(id).skill) return;
    els.processConfirmModal.showModal();
  });
  els.processConfirmNo.addEventListener("click", () => els.processConfirmModal.close());
  els.processConfirmYes.addEventListener("click", async () => {
    els.processConfirmModal.close();
    if (!ensureDraft()) return;
    const id = normalizeProcess(draft.process);
    if (!processMeta(id).skill) return;
    try {
      await ensureProcessImages(id, { force: true });
      applyDraft({ layout: false });
    } catch (err) {
      alert(err.message || "处理失败");
    }
  });
  if (els.customProcessNameCancel) {
    els.customProcessNameCancel.addEventListener("click", () => els.customProcessNameModal.close());
  }
  if (els.customProcessNameForm) {
    els.customProcessNameForm.addEventListener("submit", () => {
      const en = (els.customProcessNameEn.value || "").trim();
      const zh = (els.customProcessNameZh.value || "").trim();
      if (!en || !zh) return;
      const item = {
        id: uid("custom"),
        name: en,
        note: zh,
        prompt: "",
        skill: true,
        custom: true,
      };
      customProcesses.push(item);
      saveCustomProcesses();
      pendingPromptId = item.id;
      if (draft) renderManager();
    });
  }
  if (els.customProcessNameModal) {
    els.customProcessNameModal.addEventListener("close", () => {
      const id = pendingPromptId;
      pendingPromptId = null;
      if (!id) return;
      setTimeout(() => openCustomPromptModal(id), 0);
    });
  }
  if (els.customProcessPromptCancel) {
    els.customProcessPromptCancel.addEventListener("click", () => {
      pendingProcessAfterPrompt = false;
      els.customProcessPromptModal.close();
    });
  }
  if (els.customProcessPromptForm) {
    els.customProcessPromptForm.addEventListener("submit", () => {
      const item = customProcesses.find((s) => s.id === editingCustomId);
      if (!item) return;
      item.prompt = (els.customProcessPromptText.value || "").trim();
      saveCustomProcesses();
      if (draft) renderManager();
      const runAfter = pendingProcessAfterPrompt && item.prompt;
      pendingProcessAfterPrompt = false;
      if (runAfter) {
        setTimeout(() => applyProcessStyle(item), 0);
      }
    });
  }
  if (els.customProcessPromptModal) {
    els.customProcessPromptModal.addEventListener("close", () => {
      pendingProcessAfterPrompt = false;
    });
  }
  els.editMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setEditing(!els.reader.classList.contains("is-editing"));
  });
  els.editCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setEditing(false);
  });
  els.reader.addEventListener("transitionend", (e) => {
    if (e.propertyName === "grid-template-columns") relayoutBook();
  });
  applyFolds();
  renderApiProviders();
  syncProcessActions();

  window.addEventListener("resize", () => {
    if (els.reader.hidden) {
      layoutShelf();
      layoutYearWheel();
    }
    if (!pageFlip) return;
    const book = document.getElementById("book");
    if (book) syncFlipMetrics(book);
    pageFlip.update();
    updatePager();
  });
  function anyModalOpen() {
    return !!(
      (els.coverModal && els.coverModal.open) ||
      (els.deleteModal && els.deleteModal.open) ||
      (els.managerModal && els.managerModal.open) ||
      (els.processConfirmModal && els.processConfirmModal.open) ||
      (els.customProcessNameModal && els.customProcessNameModal.open) ||
      (els.customProcessPromptModal && els.customProcessPromptModal.open) ||
      (els.yearModal && els.yearModal.open)
    );
  }
  document.addEventListener("keydown", (e) => {
    if (e.target === els.bookTitle || els.bookTitle.contains(e.target)) return;
    if (e.key === "Escape" && !anyModalOpen() && !els.reader.hidden) {
      if (els.reader.classList.contains("is-editing")) {
        setEditing(false);
        return;
      }
      leaveReader();
    }
    if (anyModalOpen()) return;
    if (els.reader.hidden) {
      if (e.key === "Escape") {
        closeMagMenu();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setShelfFocus(shelfFocus + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setShelfFocus(shelfFocus - 1);
      }
      if (e.key === "ArrowUp") {
        const years = yearList();
        const i = years.indexOf(shelfYear);
        if (i > 0) {
          e.preventDefault();
          setShelfYear(years[i - 1]);
        }
      }
      if (e.key === "ArrowDown") {
        const years = yearList();
        const i = years.indexOf(shelfYear);
        if (i >= 0 && i < years.length - 1) {
          e.preventDefault();
          setShelfYear(years[i + 1]);
        }
      }
      return;
    }
    if (!pageFlip) return;
    if (e.key === "ArrowRight") pageFlip.flipNext();
    if (e.key === "ArrowLeft") {
      document.getElementById("book")?.classList.add("is-flip-back");
      pageFlip.flipPrev();
    }
  });

  function makeSwatch(color, w, h, label) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,250,240,.88)";
    ctx.fillRect(24, h - 90, w - 48, 54);
    ctx.fillStyle = "#1c1712";
    ctx.font = "28px serif";
    ctx.fillText(label, 40, h - 52);
    return canvas.toDataURL("image/jpeg", 0.85);
  }

  function makeSpreadSwatch(w, h, label) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#2ec4b6";
    ctx.fillRect(0, 0, w / 2, h);
    ctx.fillStyle = "#5b2c6f";
    ctx.fillRect(w / 2, 0, w / 2, h);
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.52, h * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f7f1e4";
    ctx.font = "36px serif";
    ctx.fillText(label, 36, 64);
    return canvas.toDataURL("image/jpeg", 0.9);
  }

  if (new URLSearchParams(location.search).get("preview") === "1" && !state.magazines.length) {
    const empty = new URLSearchParams(location.search).get("photos") !== "1";
    const wantSpread = new URLSearchParams(location.search).get("spread") === "1";
    const art = wantSpread ? makeSpreadSwatch(1600, 900, "SPREAD") : "";
    const mag = {
      id: uid("mag"),
      name: "预览册",
      cover: wantSpread ? art : makeSwatch("#8f3d24", 720, 960, "COVER"),
      createdAt: Date.now(),
      photos: empty ? [] : wantSpread
        ? [{ id: uid("ph"), src: art, originalSrc: art, processed: {}, name: "spread.jpg", w: 1600, h: 900 }].map((p) => migratePhoto(p))
        : [
        { id: uid("ph"), src: makeSwatch("#c4a574", 900, 1200, "01"), originalSrc: makeSwatch("#c4a574", 900, 1200, "01"), processed: {}, name: "01.jpg", w: 900, h: 1200 },
        { id: uid("ph"), src: makeSwatch("#4a5d4e", 1400, 900, "02"), originalSrc: makeSwatch("#4a5d4e", 1400, 900, "02"), processed: {}, name: "02.jpg", w: 1400, h: 900 },
        { id: uid("ph"), src: makeSwatch("#8f3d24", 1000, 1000, "03"), originalSrc: makeSwatch("#8f3d24", 1000, 1000, "03"), processed: {}, name: "03.jpg", w: 1000, h: 1000 },
      ].map((p) => migratePhoto(p)),
      maxPerPage: wantSpread ? 0.5 : 3,
      style: wantSpread ? "editorial" : "scrapbook",
      filter: "classic-chrome",
      coverFilter: "none",
      process: "none",
      pageNum: "center",
      layout: [],
    };
    migrateMagazine(mag);
    if (innerPhotos(mag.photos).length) generateLayout(mag);
    state.magazines.push(mag);
  }

  function bindDotCursor() {
    const el = document.getElementById("dotCursor");
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    document.documentElement.classList.add("has-dot-cursor");
    document.body.appendChild(el);
    const parkDot = () => {
      const open = document.querySelector("dialog[open]");
      const host = open || document.body;
      if (el.parentElement !== host) host.appendChild(el);
    };
    let raiseTimer = 0;
    const raiseDotSoon = () => {
      if (typeof el.showPopover !== "function") return;
      const open = document.querySelector("dialog[open]");
      const host = open || document.body;
      const parked = el.parentElement === host;
      let shown = false;
      try { shown = el.matches(":popover-open"); } catch (_) {}
      if (parked && shown) return;
      try {
        if (shown) el.hidePopover();
      } catch (_) {}
      parkDot();
      clearTimeout(raiseTimer);
      raiseTimer = setTimeout(() => {
        try { el.showPopover(); } catch (_) {}
      }, 0);
    };
    raiseDotSoon();
    document.addEventListener("toggle", (e) => {
      if (e.target === el) return;
      if (e.newState === "open") raiseDotSoon();
    }, true);
    const dialogWatch = new MutationObserver(() => raiseDotSoon());
    document.querySelectorAll("dialog").forEach((d) => {
      dialogWatch.observe(d, { attributes: true, attributeFilter: ["open"] });
    });
    const proto = typeof HTMLDialogElement === "function" ? HTMLDialogElement.prototype : null;
    if (proto && !proto.__dotCursorPatched) {
      const origShow = proto.showModal;
      proto.showModal = function (...args) {
        const ret = origShow.apply(this, args);
        raiseDotSoon();
        return ret;
      };
      proto.__dotCursorPatched = true;
    }
    let stackedKey = "";
    const ensureStack = () => {
      const open = [...document.querySelectorAll("dialog[open]")].map((d) => d.id).join(",");
      if (open === stackedKey) return;
      stackedKey = open;
      raiseDotSoon();
    };
    const hotSel = [
      "a", "button", "summary", "select", "label",
      "[role='button']", "[role='slider']", "input[type='range']",
      ".chip", ".mag", ".mag-more", ".year-mark", ".cover-pick",
      ".photo-cell", ".photo-item", ".style-card", ".filter-card",
      ".pager-arrow", ".pager-jump", ".fold-toggle", ".menu-btn",
      ".edit-close", ".shelf-add", ".ux-btn", ".replace-hot", ".replace-btn",
      ".stf__item", ".text-btn", ".primary", ".ghost", ".btn-safe",
      ".back-btn", ".export-btn", ".api-key-toggle", ".use-cover",
      ".kill", ".dl", ".ver-orig", ".photo-versions button",
      ".process-card", ".process-card-tools button", ".mag-menu button",
    ].join(",");
    const textSel = [
      "input:not([type='hidden']):not([type='range']):not([type='button']):not([type='submit'])",
      "textarea",
      "[contenteditable='true']",
      ".book-title",
    ].join(",");
    const nodeFromPoint = (x, y) => {
      const list = typeof document.elementsFromPoint === "function"
        ? document.elementsFromPoint(x, y)
        : [document.elementFromPoint(x, y)];
      return list.find((n) => n instanceof Element && n !== el && !el.contains(n)) || null;
    };
    const hide = () => {
      el.classList.remove("is-on", "is-hot", "is-press");
    };
    const releasePress = () => {
      el.classList.remove("is-press");
    };
    const probeAt = (x, y, pointerType) => {
      if (pointerType && pointerType !== "mouse") return;
      const node = nodeFromPoint(x, y);
      if (!(node instanceof Element)) return;
      const text = !!node.closest(textSel);
      const disabled = !!node.closest("button:disabled, [aria-disabled='true']");
      const hot = !text && !disabled && !!node.closest(hotSel);
      el.classList.toggle("is-hot", hot);
      el.classList.toggle("is-text", text);
      document.documentElement.classList.toggle("is-dot-text", text);
      if (text) el.classList.remove("is-press");
    };
    const move = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      ensureStack();
      el.classList.add("is-on");
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      probeAt(e.clientX, e.clientY, e.pointerType);
    };
    const probe = (e) => {
      probeAt(e.clientX, e.clientY, e.pointerType);
    };
    const press = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      probeAt(e.clientX, e.clientY, e.pointerType);
      if (el.classList.contains("is-text")) return;
      el.classList.add("is-press");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", probe, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", releasePress, { passive: true });
    window.addEventListener("pointercancel", releasePress, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", () => {
      el.classList.add("is-on");
    });
    window.addEventListener("blur", hide);
  }

  bindBookTilt();
  bindShelfNav();
  bindDotCursor();
  resolveShelfYear();
  renderYearWheel();
  renderShelf();

  if (new URLSearchParams(location.search).get("open") === "1" && state.magazines[0]) {
    enterReader(state.magazines[0]).then(() => {
      if (new URLSearchParams(location.search).get("edit") === "1") setEditing(true);
      if (new URLSearchParams(location.search).get("manage") === "1") openManager();
    });
  }
})();
