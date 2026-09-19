import { cn } from "@/utils/cn";
import type { useVoicePlayer } from "@/hooks/useAudio";
import { Avatar } from "./Avatar";
import { Equalizer, PauseIcon, PlayIcon, SkipIcon, VolumeIcon } from "./ui";

type Player = ReturnType<typeof useVoicePlayer>;

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s <= 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export function PlayerBar({ player }: { player: Player }) {
  const { current, status, progress, duration, volume, setVolume } = player;
  const open = Boolean(current);
  const playing = status === "playing";
  const errored = status === "error";

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 transition-all duration-500 sm:px-5 sm:pb-5",
        open ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      )}
    >
      {current && (
        <div className="glass pointer-events-auto flex w-full max-w-3xl flex-col gap-3 rounded-[22px] px-4 py-3.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] sm:px-5">
          {/* 进度条 */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="播放进度"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              player.seek((e.clientX - rect.left) / rect.width);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") player.seek(progress + 0.05);
              if (e.key === "ArrowLeft") player.seek(progress - 0.05);
            }}
            className="group relative -mx-1 cursor-pointer px-1 py-1.5"
          >
            <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/12">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-amber-glow to-violet-glow"
                style={{ width: `${progress * 100}%` }}
              />
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar
              member={current}
              className="h-11 w-11 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.9)]"
              glyphClass="text-lg"
              playing={playing}
            />

            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-[0.98rem] text-white/92">{current.name} 的寄语</p>
              <p className={cn("truncate text-[0.7rem]", errored ? "text-red-300/85" : "text-white/40")}>
                {errored ? `未找到 ${current.audio}` : playing ? "正在播放 · 专题组电台" : status === "loading" ? "加载中…" : "已暂停"}
              </p>
            </div>

            <span className="hidden font-mono text-[0.68rem] text-white/40 sm:block">
              {fmt(progress * duration)} / {fmt(duration)}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => player.step(-1)}
                aria-label="上一条"
                className="grid h-9 w-9 place-items-center rounded-full text-white/55 transition hover:bg-white/8 hover:text-white"
              >
                <SkipIcon back className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={player.toggle}
                aria-label={playing ? "暂停" : "播放"}
                className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber-glow to-[#f79d5c] text-ink shadow-[0_10px_26px_-10px_rgba(246,189,96,0.9)] transition hover:brightness-105 active:scale-95"
              >
                {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4 translate-x-[1px]" />}
              </button>
              <button
                type="button"
                onClick={() => player.step(1)}
                aria-label="下一条"
                className="grid h-9 w-9 place-items-center rounded-full text-white/55 transition hover:bg-white/8 hover:text-white"
              >
                <SkipIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="ml-1 hidden items-center gap-2 md:flex">
              <VolumeIcon className="h-4 w-4 text-white/45" muted={volume === 0} />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="音量"
                className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/15 accent-amber-glow [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-glow"
              />
            </div>

            {playing && <Equalizer bars={4} className="ml-1 hidden h-4 lg:flex" />}
          </div>
        </div>
      )}
    </div>
  );
}
