import { Equalizer, MicIcon } from "./ui";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 pt-16 pb-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(246,189,96,0.14),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-glow to-[#f79d5c] text-ink">
          <MicIcon className="h-5 w-5" />
        </span>

        <p className="mt-6 font-display text-3xl italic text-white/85 sm:text-4xl">See you on air</p>
        <p className="mx-auto mt-4 max-w-xl text-[0.92rem] leading-[2] text-white/45">
          欢迎来到主播部 · 专题组。带上一副耳机，和一个想说话的下午，我们把声音慢慢做好。
        </p>

        <Equalizer bars={9} className="mx-auto mt-8 h-5" tone="bg-white/35" />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.8rem] text-white/35">
          <a href="http://ms.zju.edu.cn/" target="_blank" rel="noreferrer noopener" className="transition hover:text-amber-glow">
            校内软件站
          </a>
          <span className="h-3 w-px bg-white/15" />
          <a href="assets/docs/AU基本介绍.pdf" target="_blank" rel="noreferrer noopener" className="transition hover:text-amber-glow">
            AU 基本介绍
          </a>
          <span className="h-3 w-px bg-white/15" />
          <a href="#top" className="transition hover:text-amber-glow">
            回到顶部
          </a>
        </div>

        <p className="label mt-10 text-[0.55rem] text-white/20">ZJU CMC · Broadcast Dept. · Special Topic Group</p>
      </div>
    </footer>
  );
}
