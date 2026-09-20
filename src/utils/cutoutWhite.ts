/**
 * 在浏览器里自动把图片的纯色背景（白底 / 灰白底 / 米白底）抠掉。
 * 不需要 PS，不需要在线抠图网站，原图直接丢进来就行。
 *
 * 关键做法：
 * 1. 先从四个角自动「探测」背景色 —— 所以 #FFFFFF、#F6F6F6、淡米色都能处理；
 * 2. 从图片四条边界做洪水填充，只清除与边界连通的背景色区域，
 *    角色身上的白色细节（领口荷叶边、胸口系带、眼睛高光）不会被误删；
 * 3. 边缘按「与背景色的距离」做羽化 alpha，再做去底色运算
 *    （un-premultiply），把描线周围那圈光晕彻底消掉 —— 这是不留白边的关键；
 * 4. 自动裁掉四周多余空白，让宠物在容器里显示得足够大。
 */

export type CutoutOptions = {
  /** 与背景色的距离 <= 此值 → 完全透明 */
  tolLo?: number;
  /** 与背景色的距离 >= 此值 → 完全不透明 */
  tolHi?: number;
  /** 裁剪后四周保留的空白像素 */
  pad?: number;
  /** 处理时缩放到的最大宽度，控制性能与体积 */
  maxWidth?: number;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`image load failed: ${src}`));
    img.src = src;
  });
}

const clamp255 = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v));

/** 取若干采样点的中位数，作为背景色 */
function detectBackground(d: Uint8ClampedArray, w: number, h: number) {
  const pts: number[] = [];
  const edge = (x: number, y: number) => pts.push((y * w + x) * 4);
  const xs = [0, 1, 2, (w >> 1) - 1, w >> 1, w - 3, w - 2, w - 1];
  const ys = [0, 1, 2, (h >> 1) - 1, h - 3, h - 2, h - 1];
  for (const x of xs) {
    edge(Math.max(0, Math.min(w - 1, x)), 0);
    edge(Math.max(0, Math.min(w - 1, x)), h - 1);
  }
  for (const y of ys) {
    edge(0, Math.max(0, Math.min(h - 1, y)));
    edge(w - 1, Math.max(0, Math.min(h - 1, y)));
  }
  const med = (ch: number) => {
    const arr = pts.map((p) => d[p + ch]).sort((a, b) => a - b);
    return arr[arr.length >> 1];
  };
  return [med(0), med(1), med(2)] as const;
}

export async function cutoutWhite(src: string, opts: CutoutOptions = {}): Promise<string> {
  const { tolLo = 20, tolHi = 42, pad = 2, maxWidth = 560 } = opts;

  const img = await loadImage(src);
  const natW = img.naturalWidth || img.width;
  const natH = img.naturalHeight || img.height;
  if (!natW || !natH) return src;

  const scale = Math.min(1, maxWidth / natW);
  const w = Math.max(1, Math.round(natW * scale));
  const h = Math.max(1, Math.round(natH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return src;
  ctx.drawImage(img, 0, 0, w, h);

  let image: ImageData;
  try {
    image = ctx.getImageData(0, 0, w, h);
  } catch {
    return src; // 跨域图片污染画布，退回原图
  }

  const d = image.data;
  const n = w * h;
  const [br, bgc, bb] = detectBackground(d, w, h);

  // 背景不是浅色就不处理（说明这张图本来就没有白底）
  if (Math.min(br, bgc, bb) < 170) return src;

  const dist = (p: number) => {
    const a = Math.abs(d[p] - br);
    const b = Math.abs(d[p + 1] - bgc);
    const c = Math.abs(d[p + 2] - bb);
    return a > b ? (a > c ? a : c) : b > c ? b : c;
  };

  const visited = new Uint8Array(n);
  const stack: number[] = [];
  const push = (i: number) => {
    if (visited[i]) return;
    if (dist(i * 4) < tolHi) {
      visited[i] = 1;
      stack.push(i);
    }
  };

  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }

  while (stack.length) {
    const i = stack.pop() as number;
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (y > 0) push(i - w);
    if (y < h - 1) push(i + w);
  }

  const span = tolHi - tolLo;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) continue;
    const p = i * 4;
    const dv = dist(p);

    let a = dv <= tolLo ? 0 : (dv - tolLo) / span;
    if (a > 1) a = 1;

    if (a <= 0.02) {
      d[p + 3] = 0;
      continue;
    }
    // 去底色：把「背景透过来」的成分从颜色里减掉，消除边缘光晕
    d[p] = clamp255((d[p] - (1 - a) * br) / a);
    d[p + 1] = clamp255((d[p + 1] - (1 - a) * bgc) / a);
    d[p + 2] = clamp255((d[p + 2] - (1 - a) * bb) / a);
    d[p + 3] = Math.round(a * 255);
  }

  ctx.putImageData(image, 0, 0);

  // ---- 自动裁剪到内容边界 ----
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (d[(y * w + x) * 4 + 3] > 12) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0 || maxY < 0) return canvas.toDataURL("image/png");

  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const out = document.createElement("canvas");
  out.width = cw;
  out.height = ch;
  const octx = out.getContext("2d");
  if (!octx) return canvas.toDataURL("image/png");
  octx.drawImage(canvas, minX, minY, cw, ch, 0, 0, cw, ch);

  return out.toDataURL("image/png");
}
