import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Equalizer, MicIcon } from "./ui";

const links = [
  { href: "#letter", label: "欢迎信" },
  { href: "#voices", label: "学长姐寄语" },
  { href: "#guide", label: "新手指南" },
  { href: "#board", label: "悄悄话" },
];

export function Nav({ musicOn, musicFailed, onToggleMusic }: { musicOn: boolean; musicFailed: boolean; onToggleMusic: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-glow/90 to-amber-glow/40 text-ink shadow-[0_6px_20px_-6px_rgba(246,189,96,0.8)]">
            <MicIcon className="h-[18px] w-[18px]" />
          </span>
          <span className="leading-none">
            <span className="block font-serif text-[0.95rem] tracking-wide text-white">ZJU CMC</span>
            <span className="label mt-1 block text-[0.58rem] text-white/40">主播部 · 专题组</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-[0.86rem] text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onToggleMusic}
          title={musicFailed ? "没有找到 assets/audio/bg-music.mp4" : musicOn ? "关闭背景音乐" : "播放背景音乐"}
          className={cn(
            "flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-[0.78rem] transition",
            musicOn
              ? "border-amber-glow/50 bg-amber-glow/12 text-amber-glow"
              : "border-white/12 text-white/55 hover:border-white/25 hover:text-white"
          )}
        >
          {musicOn ? <Equalizer bars={4} className="h-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
          <span className="hidden sm:inline">{musicFailed ? "音乐未就绪" : musicOn ? "BGM ON" : "BGM"}</span>
          <span className="sm:hidden">{musicOn ? "ON" : "BGM"}</span>
        </button>
      </div>
    </header>
  );
}
