import { useEffect, useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading, SoundWave } from "./ui";

const STORAGE_KEY = "zjucmc-topic-wishes";

const seedIdeas = ["食堂新窗口测评", "期末周自救指南", "校园声音地图", "深夜自习室实录"];

type Wish = { id: string; text: string; mine: boolean };

export function Board() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWishes(JSON.parse(raw) as Wish[]);
    } catch {
      /* 忽略隐私模式下的读取失败 */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      /* ignore */
    }
  }, [wishes]);

  const add = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setWishes((prev) => [{ id: `${Date.now()}`, text: t, mine: true }, ...prev.filter((p) => p.text !== t)].slice(0, 24));
    setValue("");
  };

  const pool = useMemo(() => {
    const mine = wishes.filter((w) => w.mine).map((w) => w.text);
    const rest = seedIdeas.filter((s) => !mine.includes(s));
    return [...mine, ...rest];
  }, [wishes]);

  return (
    <section id="board" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <SectionHeading
            kicker="Say Something"
            title={
              <>
                有什么好玩的、好吃的，
                <br />
                都可以尽情分享
              </>
            }
          />
          <p className="mt-5 max-w-md text-[0.95rem] leading-[2] text-white/55">
            AU 之后我们还会慢慢介绍，不要担心搞不懂哦～当然啦，做得不足的地方也要大胆提出来。
            先留下一个你想做的选题，或者你最想在节目里听到的东西。
          </p>
          <SoundWave className="mt-10 h-12 w-full max-w-sm opacity-35" stroke="rgba(246,189,96,0.55)" />
        </Reveal>

        <Reveal delay={120}>
          <div className="glass relative overflow-hidden rounded-[24px] p-6 sm:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                add(value);
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                maxLength={40}
                placeholder="我想听 / 我想做…"
                className="flex-1 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-[0.92rem] text-white placeholder:text-white/25 focus:border-amber-glow/50 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-[0.88rem] font-medium text-ink transition hover:bg-amber-glow active:scale-[0.98]"
              >
                记下来
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2">
              {pool.map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.8rem] text-white/60"
                >
                  {t}
                </span>
              ))}
              {pool.length === 0 && <span className="text-[0.82rem] text-white/30">还没有想法，来第一个吧。</span>}
            </div>

            <p className="mt-6 border-t border-white/8 pt-4 text-[0.72rem] leading-relaxed text-white/28">
              这些点子只会保存在你自己的浏览器里，下次打开还能看到。想分享到组里的话，直接发群里就好啦。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
