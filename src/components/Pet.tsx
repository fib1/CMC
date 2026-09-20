import { useCallback, useEffect, useRef, useState } from "react";
import petDefault from "@/assets/pet-default.jpg";
import { cutoutWhite } from "@/utils/cutoutWhite";
import { jokes, petPhrases, pickDaily, pickGreeting, pickRandom, quotes, tips } from "@/data/petTalk";

/* =====================================================================
   右下角桌宠（图片版）

   互动方式：
     · 单击她            → 跳一下 + 说一句和网站相关的话
     · 长按 0.5 秒       → 摸摸头（冒爱心）
     · 按住拖动          → 把她挪到屏幕任意位置
     · 点左侧 😄 按钮    → 每日笑话（当天固定，再点换一条）
     · 点左侧 ✨ 按钮    → 每日哲理（当天固定，再点换一条）

   ★ 换成你们自己的宠物图：
     把原图（白底的就行，不用自己抠图）命名为 pet.png 或 pet.jpg，
     传到仓库的 assets/images/ 目录即可，网页会自动使用它并剥离白底。

   ★ 想改她说的话：全部在 src/data/petTalk.ts 里。
   ===================================================================== */

const CANDIDATES = ["assets/images/pet.png", "assets/images/pet.jpg", petDefault];

type Bubble = { label?: string; text: string; hint?: string };
type Heart = { id: number; x: number; emoji: string };

async function resolvePhoto(): Promise<string | null> {
  for (const path of CANDIDATES) {
    const url = path.startsWith("data:") ? path : new URL(path, document.baseURI).href;
    try {
      return await cutoutWhite(url);
    } catch {
      /* 这张不存在就试下一张 */
    }
  }
  return null;
}

export function Pet() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [bubble, setBubble] = useState<Bubble | null>(null);
  const [happy, setHappy] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const bubbleTimer = useRef<number | undefined>(undefined);
  const happyTimer = useRef<number | undefined>(undefined);
  const heartId = useRef(0);

  // 记录每日内容是否已经看过第一条、以及上一条是什么（避免连续重复）
  const jokeSeen = useRef(false);
  const quoteSeen = useRef(false);
  const lastJoke = useRef<string | undefined>(undefined);
  const lastQuote = useRef<string | undefined>(undefined);
  const lastTip = useRef<string | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    void resolvePhoto().then((url) => alive && setPhoto(url));
    return () => {
      alive = false;
    };
  }, []);

  const say = useCallback((b: Bubble, duration = 3200) => {
    setBubble(b);
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => setBubble(null), duration);
  }, []);

  const bounce = useCallback((ms = 520) => {
    setHappy(true);
    window.clearTimeout(happyTimer.current);
    happyTimer.current = window.setTimeout(() => setHappy(false), ms);
  }, []);

  /* ---- 单击：说一句和网站相关的话 ---- */
  const tap = useCallback(() => {
    bounce();
    const text = pickRandom(tips, lastTip.current);
    lastTip.current = text;
    say({ text });
  }, [bounce, say]);

  /* ---- 长按：摸摸头 + 冒爱心 ---- */
  const headPat = useCallback(() => {
    bounce(1200);
    say({ text: pickRandom(petPhrases) });
    const emojis = ["💕", "💖", "✨", "💗", "♥"];
    const fresh: Heart[] = Array.from({ length: 5 }).map(() => ({
      id: ++heartId.current,
      x: Math.random() * 80 - 40,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts((h) => [...h, ...fresh]);
    window.setTimeout(() => {
      const ids = new Set(fresh.map((f) => f.id));
      setHearts((h) => h.filter((x) => !ids.has(x.id)));
    }, 1300);
  }, [bounce, say]);

  /* ---- 每日笑话 ---- */
  const tellJoke = useCallback(() => {
    bounce();
    const first = !jokeSeen.current;
    const text = first ? pickDaily(jokes, "joke") : pickRandom(jokes, lastJoke.current);
    jokeSeen.current = true;
    lastJoke.current = text;
    say({ label: first ? "🗓 今日笑话" : "😄 再来一个", text, hint: "再点一次换一条" }, 7000);
  }, [bounce, say]);

  /* ---- 每日哲理 ---- */
  const tellQuote = useCallback(() => {
    bounce();
    const first = !quoteSeen.current;
    const text = first ? pickDaily(quotes, "quote") : pickRandom(quotes, lastQuote.current);
    quoteSeen.current = true;
    lastQuote.current = text;
    say({ label: first ? "🗓 今日哲理" : "✨ 再来一句", text, hint: "再点一次换一条" }, 7000);
  }, [bounce, say]);

  /* ---- 进页面打招呼 + 偶尔主动说话 ---- */
  useEffect(() => {
    if (!photo) return;
    const greet = window.setTimeout(() => {
      if (document.visibilityState === "visible") say({ text: pickGreeting() }, 4200);
    }, 1200);

    let idle: number | undefined;
    const schedule = () => {
      idle = window.setTimeout(() => {
        if (document.visibilityState === "visible" && Math.random() < 0.65) {
          // 偶尔主动来一条哲理或小提示
          if (Math.random() < 0.35) {
            const text = pickRandom(quotes, lastQuote.current);
            lastQuote.current = text;
            say({ label: "✨ 想到一句话", text }, 6000);
          } else {
            const text = pickRandom(tips, lastTip.current);
            lastTip.current = text;
            say({ text });
          }
        }
        schedule();
      }, 22000 + Math.random() * 20000);
    };
    schedule();

    return () => {
      window.clearTimeout(greet);
      window.clearTimeout(idle);
    };
  }, [photo, say]);

  useEffect(
    () => () => {
      window.clearTimeout(bubbleTimer.current);
      window.clearTimeout(happyTimer.current);
    },
    []
  );

  /* ---- 拖动 / 点击 / 长按 判定 ---- */
  const drag = useRef<{ px: number; py: number; ox: number; oy: number; w: number; h: number; moved: boolean; long: boolean } | null>(null);
  const longTimer = useRef<number | undefined>(undefined);

  const onDown = (e: React.PointerEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const r = el.getBoundingClientRect();
    drag.current = { px: e.clientX, py: e.clientY, ox: r.left, oy: r.top, w: r.width, h: r.height, moved: false, long: false };
    window.clearTimeout(longTimer.current);
    longTimer.current = window.setTimeout(() => {
      if (drag.current && !drag.current.moved) {
        drag.current.long = true;
        headPat();
      }
    }, 550);
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    if (!d.moved && Math.hypot(e.clientX - d.px, e.clientY - d.py) < 7) return;
    if (!d.moved) {
      d.moved = true;
      window.clearTimeout(longTimer.current);
    }
    const x = Math.min(Math.max(d.ox + (e.clientX - d.px), 4), window.innerWidth - d.w - 4);
    const y = Math.min(Math.max(d.oy + (e.clientY - d.py), 4), window.innerHeight - d.h - 4);
    setPos({ x, y });
  };

  const onUp = () => {
    window.clearTimeout(longTimer.current);
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved && !d.long) tap();
  };

  if (!photo) return null;

  return (
    <div
      ref={wrapRef}
      onContextMenu={(e) => e.preventDefault()}
      className="group fixed right-1 bottom-[150px] z-[60] w-[100px] select-none sm:right-5 sm:bottom-6 sm:w-[138px]"
      style={pos ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" } : undefined}
    >
      <div className="relative">
        {/* 气泡 */}
        {bubble && (
          <div
            key={bubble.text}
            className="pet-bubble absolute right-0 bottom-full z-20 mb-2 w-max max-w-[210px] text-left sm:max-w-[250px]"
            style={{ filter: "drop-shadow(0 10px 18px rgba(190,60,80,0.3))" }}
          >
            <div className="rounded-2xl rounded-br-md bg-gradient-to-b from-white to-[#fff2f2] px-3.5 py-2.5 ring-1 ring-[#ffd3d3]">
              {bubble.label && (
                <p className="mb-1 text-[10.5px] font-semibold tracking-wide text-[#e08a9a]">{bubble.label}</p>
              )}
              <p className="text-[12.5px] leading-[1.7] font-medium text-[#c93a58] sm:text-[13.5px]">{bubble.text}</p>
              {bubble.hint && <p className="mt-1.5 text-[10px] text-[#e3a3ae]">{bubble.hint}</p>}
            </div>
            <span className="absolute -bottom-[6px] right-7 h-3.5 w-3.5 rotate-45 bg-[#fff2f2]" />
          </div>
        )}

        {/* 爱心特效 */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {hearts.map((h) => (
            <span
              key={h.id}
              className="absolute text-base"
              style={
                {
                  left: "50%",
                  top: "30%",
                  "--hx": `${h.x}px`,
                  animation: "petHeartUp 1.25s ease-out forwards",
                } as React.CSSProperties
              }
            >
              {h.emoji}
            </span>
          ))}
        </div>

        {/* 笑话 / 哲理 按钮 */}
        <div className="absolute top-1/4 -left-8 z-20 flex flex-col gap-1.5 opacity-80 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            title="每日笑话"
            aria-label="每日笑话"
            onClick={tellJoke}
            className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[13px] shadow-md ring-1 ring-[#ffd3d3] transition hover:scale-110 hover:bg-white active:scale-95"
          >
            😄
          </button>
          <button
            type="button"
            title="每日哲理"
            aria-label="每日哲理"
            onClick={tellQuote}
            className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[13px] shadow-md ring-1 ring-[#ffd3d3] transition hover:scale-110 hover:bg-white active:scale-95"
          >
            ✨
          </button>
        </div>

        {/* 宠物本体 */}
        <div
          className="pet-float w-full cursor-grab touch-none active:cursor-grabbing"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          role="button"
          tabIndex={0}
          aria-label="专题组小狐狸：点我说说话，长按摸摸头，拖动可以移动位置"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              tap();
            }
          }}
        >
          <div className={happy ? "pet-hop" : ""}>
            <img
              src={photo}
              alt="专题组小狐狸"
              draggable={false}
              className="pointer-events-none block h-auto w-full"
              style={{ filter: "drop-shadow(0 16px 14px rgba(120,30,40,0.34))" }}
            />
          </div>
        </div>

        {/* 地面投影 */}
        <span
          className="pet-shadow pointer-events-none absolute -bottom-1 left-1/2 h-2 w-[58%] -translate-x-1/2 rounded-[50%]"
          style={{ background: "radial-gradient(ellipse, rgba(90,25,35,0.45), transparent 70%)" }}
        />
      </div>
    </div>
  );
}
