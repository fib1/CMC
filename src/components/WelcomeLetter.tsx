import { Reveal } from "./Reveal";
import { Label, SectionHeading, SoundWave } from "./ui";

export function WelcomeLetter() {
  return (
    <section id="letter" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              kicker="A Letter For You"
              title={
                <>
                  一封写给
                  <br />
                  新朋友的信
                </>
              }
              desc="在正式开始做节目之前，先听我们说几句。这里没有规矩满满的课堂，只有一群喜欢声音、也喜欢彼此的人。"
            />
            <SoundWave className="mt-10 h-14 w-full max-w-xs opacity-40" />
          </Reveal>
        </div>

        <Reveal delay={120}>
          <article className="glass grain relative overflow-hidden rounded-[26px] p-7 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)] sm:p-11">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.5]"
              style={{ backgroundImage: "repeating-linear-gradient(180deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 34px)" }}
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-amber-glow/40 text-[0.6rem] font-medium tracking-widest text-amber-glow/90">
                    CMC
                  </span>
                  <Label>Air Check · 专题组</Label>
                </div>
                <span className="font-mono text-[0.68rem] tracking-widest text-white/30">VOL.2026</span>
              </div>

              <p className="mt-7 font-serif text-lg text-white/90">亲爱的各位专题的小朋友：</p>

              <div className="mt-5 space-y-5 text-[0.97rem] leading-[2.05] text-white/65">
                <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[3.2rem] first-letter:leading-[0.82] first-letter:text-amber-glow">
                  欢迎你们来到广播部专题组！我们不仅是声音的创作者，更是一个温暖的大集体。在这里，我们一起打磨作品、交流想法，也互相帮助、互相支撑。
                </p>
                <p>
                  也许你现在对剪辑、对话筒、对「节目」这件事还有点陌生——没关系，每个人都是从第一次按下录音键开始的。你负责大胆尝试，
                  我们负责在旁边接住你。
                </p>
                <p>
                  希望新的一年我们可以越来越好，
                  <span className="text-white/90">Love you all！</span>
                </p>
              </div>

              <div className="mt-9 flex items-end justify-between gap-6 border-t border-white/10 pt-6">
                <p className="max-w-[16rem] text-[0.8rem] leading-relaxed text-white/35">
                  下面的 12 条语音，是学长姐们想对你说的话。
                </p>
                <div className="text-right">
                  <p className="font-serif text-[0.95rem] text-white/80">主播部 · 专题组</p>
                  <p className="label mt-1.5 text-[0.55rem] text-white/30">With Love</p>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
