import { Reveal } from "./Reveal";
import { ArrowIcon, DocIcon, DownloadIcon, GameIcon, HeadphoneIcon, SectionHeading } from "./ui";

const resources = [
  {
    no: "01",
    icon: DownloadIcon,
    title: "下载 Audition",
    desc: "校内正版软件站，登录后就能下载 AU 安装包。",
    href: "http://ms.zju.edu.cn/",
    cta: "前往软件站",
    accent: "#f6bd60",
    tag: "Adobe 官方",
  },
  {
    no: "02",
    icon: DocIcon,
    title: "AU 下载介绍",
    desc: "不清楚怎么下载？没关系，一步一步手把手教你。",
    href: "assets/docs/AU下载介绍.pdf",
    cta: "查看教程 PDF",
    accent: "#9d8bff",
    tag: "新手必看",
  },
  {
    no: "03",
    icon: HeadphoneIcon,
    title: "AU 基本介绍",
    desc: "界面、轨道、降噪、导出——一次把这些弄明白。",
    href: "assets/docs/AU基本介绍.pdf",
    cta: "深入了解 AU",
    accent: "#74e6d0",
    tag: "进阶阅读",
  },
  {
    no: "04",
    icon: GameIcon,
    title: "Game Time！",
    desc: "资料看累了？来玩个小游戏，顺便活动一下耳朵。",
    href: "https://www.4399.com/flash/203658.htm",
    cta: "开始游戏",
    accent: "#ff9bb3",
    tag: "休息一下",
  },
];

const steps = [
  { no: "01", t: "装好 AU", d: "照着 02 号教程一路点下去，十分钟搞定。" },
  { no: "02", t: "录一段 30 秒", d: "随便聊聊你今天吃了什么，先熟悉自己的声音。" },
  { no: "03", t: "一起听一听", d: "把成品发到群里，学长姐陪你一起复盘。" },
];

export function Guide() {
  return (
    <section id="guide" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(157,139,255,0.13),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker="Starter Kit"
            title="新手指南：先把装备拿齐"
            desc="做专题的第一步不是灵感，而是把工具装好。下面四件事，一周之内搞定就很棒了。"
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((r, i) => (
            <Reveal key={r.no} delay={i * 90}>
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer noopener"
                className="glass group relative flex h-full flex-col overflow-hidden rounded-[22px] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-white/25"
                style={{ boxShadow: "0 30px 60px -45px rgba(0,0,0,0.9)" }}
              >
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
                  style={{ background: r.accent }}
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border"
                    style={{ borderColor: `${r.accent}55`, color: r.accent, background: `${r.accent}14` }}
                  >
                    <r.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[0.7rem] tracking-widest text-white/20">{r.no}</span>
                </div>

                <h3 className="relative mt-6 font-serif text-lg text-white/92">{r.title}</h3>
                <p className="relative mt-2.5 flex-1 text-[0.85rem] leading-relaxed text-white/50">{r.desc}</p>

                <div className="relative mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                  <span className="text-[0.78rem]" style={{ color: r.accent }}>
                    {r.cta}
                  </span>
                  <ArrowIcon className="h-4 w-4 text-white/35 transition group-hover:translate-x-1 group-hover:text-white" />
                </div>
                <span className="label relative mt-3 block text-[0.55rem] text-white/25">{r.tag}</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.no} className="relative rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <span className="font-display text-2xl italic text-white/15">{s.no}</span>
                <p className="mt-2 font-serif text-[1.02rem] text-white/85">{s.t}</p>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-white/45">{s.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
