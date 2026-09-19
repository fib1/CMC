import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ---------------- 等化器动画 ---------------- */

export function Equalizer({
  active = true,
  bars = 5,
  className,
  tone = "bg-amber-glow",
}: {
  active?: boolean;
  bars?: number;
  className?: string;
  tone?: string;
}) {
  return (
    <span className={cn("flex h-4 items-end gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn("w-[3px] origin-bottom rounded-full", tone, active ? "animate-eq" : "opacity-40")}
          style={{
            height: "100%",
            animationDelay: `${(i % 5) * 0.13}s`,
            animationDuration: `${0.85 + (i % 3) * 0.18}s`,
          }}
        />
      ))}
    </span>
  );
}

/* ---------------- 静态声波 ---------------- */

export function SoundWave({ className, stroke = "rgba(255,255,255,0.5)" }: { className?: string; stroke?: string }) {
  const heights = [8, 16, 28, 44, 62, 46, 30, 52, 72, 54, 34, 22, 40, 58, 38, 24, 14, 9, 18, 30];
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" className={className} aria-hidden>
      <g stroke={stroke} strokeWidth="1.6" strokeLinecap="round">
        {heights.map((h, i) => (
          <line key={i} x1={5 + i * 10} y1={40 - h / 2} x2={5 + i * 10} y2={40 + h / 2} />
        ))}
      </g>
    </svg>
  );
}

/* ---------------- 小标签 ---------------- */

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("label text-white/45", className)}>{children}</span>;
}

export function SectionHeading({
  kicker,
  title,
  desc,
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  desc?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className={cn("mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-glow/70" />
        <Label className="text-amber-glow/80">{kicker}</Label>
      </div>
      <h2 className="font-serif text-3xl leading-tight font-medium text-white sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {desc && <p className="mt-4 text-[0.95rem] leading-relaxed text-white/55">{desc}</p>}
    </div>
  );
}

/* ---------------- 图标 ---------------- */

type IconProps = { className?: string };

export const PlayIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.6-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z" />
  </svg>
);

export const PauseIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <rect x="6.5" y="4.5" width="3.6" height="15" rx="1.2" />
    <rect x="13.9" y="4.5" width="3.6" height="15" rx="1.2" />
  </svg>
);

export const SkipIcon = ({ className, back }: IconProps & { back?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn(className, back && "rotate-180")}
    aria-hidden
  >
    <path d="M6 5.2v13.6a1 1 0 0 0 1.54.84l9.2-6.8a1 1 0 0 0 0-1.68l-9.2-6.8A1 1 0 0 0 6 5.2Z" />
    <rect x="17.6" y="4.6" width="2.4" height="14.8" rx="1.2" />
  </svg>
);

export const HeadphoneIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" strokeLinecap="round" />
    <rect x="2.5" y="13.5" width="4.5" height="7" rx="2" />
    <rect x="17" y="13.5" width="4.5" height="7" rx="2" />
  </svg>
);

export const MicIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.5M8.5 21.5h7" strokeLinecap="round" />
  </svg>
);

export const DownloadIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M12 3.5v11m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17.5v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" strokeLinecap="round" />
  </svg>
);

export const DocIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" strokeLinejoin="round" />
    <path d="M14 3v5h5M8.5 13h7M8.5 16.5h4.5" strokeLinecap="round" />
  </svg>
);

export const GameIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path
      d="M7.5 8h9a4.5 4.5 0 0 1 4.4 5.4l-.7 3.2A2.6 2.6 0 0 1 15.9 18l-1.4-1.8h-5L8.1 18a2.6 2.6 0 0 1-4.3-1.4l-.7-3.2A4.5 4.5 0 0 1 7.5 8Z"
      strokeLinejoin="round"
    />
    <path d="M8 11.5v2.5M6.75 12.75h2.5M15.5 12h.01M17.5 13.5h.01" strokeLinecap="round" />
  </svg>
);

export const ArrowIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden>
    <path d="M5 12h13m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const VolumeIcon = ({ className, muted }: IconProps & { muted?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M4 9.5h3l4.5-3.5v12L7 14.5H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
    {muted ? (
      <path d="M16 9.5l4 5m0-5-4 5" strokeLinecap="round" />
    ) : (
      <path d="M15.8 8.8a4.2 4.2 0 0 1 0 6.4M18.4 6.6a7.4 7.4 0 0 1 0 10.8" strokeLinecap="round" />
    )}
  </svg>
);
