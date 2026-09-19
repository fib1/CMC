const items = [
  "欢迎新朋友",
  "SPECIAL TOPIC",
  "用声音记录校园",
  "Love you all",
  "AU 小课堂",
  "选题头脑风暴",
  "ON AIR",
  "深夜监听室",
  "美食分享局",
];

export function Ticker() {
  return (
    <div className="relative border-y border-white/8 bg-white/[0.02] py-3.5">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10">
              <span className="font-mono text-[0.72rem] tracking-[0.28em] whitespace-nowrap text-white/35">{t}</span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-amber-glow/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
