import heroBg from "@/assets/hero-bg.jpg";
import { ArrowIcon, Equalizer, HeadphoneIcon, Label, PlayIcon } from "./ui";

function RotatingSeal() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_26s_linear_infinite]" aria-hidden>
      <defs>
        <path id="seal-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <text fill="rgba(255,255,255,0.42)" fontSize="10.5" letterSpacing="4.6" fontFamily="JetBrains Mono, monospace">
        <textPath href="#seal-circle" startOffset="0%">
          ZHEJIANG UNIVERSITY · CMC · SPECIAL TOPIC · 广播部 ·
        </textPath>
      </text>
    </svg>
  );
}

export function Hero({ onListen, onToggleMusic, musicOn }: { onListen: () => void; onToggleMusic: () => void; musicOn: boolean }) {
  return (
    <section id="top" className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <img
        src={heroBg}
        alt=""
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full animate-drift object-cover opacity-55"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_78%_18%,rgba(157,139,255,0.22),transparent_55%),radial-gradient(90%_70%_at_12%_82%,rgba(246,189,96,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/45 to-ink" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        {/* 左：标题 */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-mint-glow" />
              <span className="relative h-2 w-2 rounded-full bg-mint-glow" />
            </span>
            <Label className="text-white/60">Now On Air · 2026 新学期</Label>
          </div>

          <p className="font-display text-2xl italic text-white/70 sm:text-3xl">welcome to</p>
          <h1 className="mt-1 font-display text-[3.6rem] leading-[0.9] font-medium tracking-tight sm:text-[5rem] lg:text-[6.2rem]">
            <span className="text-gradient">zjucmc</span>
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className="font-serif text-xl text-white/90 sm:text-2xl">欢迎来到主播部 · 专题组</h2>
            <span className="h-px w-10 bg-white/25" />
            <span className="font-mono text-[0.7rem] tracking-[0.3em] text-white/35">SPECIAL TOPIC</span>
          </div>

          <p className="mt-6 max-w-xl text-[0.98rem] leading-[1.95] text-white/60">
            我们是声音的创作者，也是一个温暖的大集体。在这里，我们一起打磨作品、交流想法、互相帮助与支持——
            <span className="text-white/85">希望新的一年，我们可以越来越好。Love you all！</span>
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onListen}
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-glow to-[#f79d5c] px-6 py-3.5 text-[0.92rem] font-medium text-ink shadow-[0_16px_40px_-16px_rgba(246,189,96,0.9)] transition hover:brightness-105 active:scale-[0.98]"
            >
              <PlayIcon className="h-3.5 w-3.5" />
              收听学长姐寄语
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onToggleMusic}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-3.5 text-[0.9rem] text-white/75 transition hover:border-white/35 hover:text-white"
            >
              <HeadphoneIcon className="h-4 w-4" />
              {musicOn ? "背景音乐播放中" : "打开背景音乐"}
            </button>
          </div>

          <dl className="mt-11 flex flex-wrap gap-x-9 gap-y-4">
            {[
              { k: "12", v: "条语音寄语" },
              { k: "03", v: "份新手资料" },
              { k: "∞", v: "种可能的选题" },
            ].map((s) => (
              <div key={s.v} className="flex items-baseline gap-2.5">
                <dt className="font-display text-2xl text-white/90">{s.k}</dt>
                <dd className="text-[0.78rem] leading-tight text-white/40">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 右：电台转盘 */}
        <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
          <div className="animate-float-slow relative aspect-square">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(246,189,96,0.35),rgba(157,139,255,0.3),rgba(116,230,208,0.3),rgba(246,189,96,0.35))] blur-2xl opacity-45" />
            <div className="glass relative grid h-full w-full place-items-center rounded-full p-8">
              <div className="absolute inset-6 rounded-full border border-white/10" />
              <div className="absolute inset-0 p-1">
                <RotatingSeal />
              </div>
              <div className="relative grid h-[58%] w-[58%] place-items-center rounded-full bg-gradient-to-br from-ink-3 to-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_60px_-30px_#000]">
                <div className="absolute inset-3 rounded-full border border-dashed border-white/12" />
                <div className="text-center">
                  <Label className="text-amber-glow/80">Studio 04</Label>
                  <p className="mt-2 font-serif text-lg text-white">专题组</p>
                  <Equalizer bars={7} className="mx-auto mt-3 h-4" />
                </div>
              </div>
            </div>
            <div className="absolute -right-1 top-4 flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/12 px-3 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-red-400" />
              <span className="label text-[0.6rem] text-red-200/90">On Air</span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#letter"
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-2 text-white/35 transition hover:text-white/70"
      >
        <span className="label text-[0.55rem]">Scroll</span>
        <span className="h-9 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </a>
    </section>
  );
}
