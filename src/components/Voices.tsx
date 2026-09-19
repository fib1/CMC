import { members, type Member } from "@/data/members";
import type { useVoicePlayer } from "@/hooks/useAudio";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";
import { Equalizer, Label, PauseIcon, PlayIcon, SectionHeading } from "./ui";

type Player = ReturnType<typeof useVoicePlayer>;

function Avatar({ member, active, playing }: { member: Member; active: boolean; playing: boolean }) {
  return (
    <span className="relative grid h-14 w-14 shrink-0 place-items-center">
      {active && playing && (
        <span
          className="absolute inset-0 animate-pulse-ring rounded-full"
          style={{ background: `radial-gradient(circle, ${member.to}66, transparent 70%)` }}
        />
      )}
      <span
        className="relative grid h-full w-full place-items-center rounded-full font-serif text-[1.35rem] text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
        style={{ backgroundImage: `linear-gradient(145deg, ${member.from}, ${member.to})` }}
      >
        {member.glyph}
        <span className="absolute inset-0 rounded-full ring-1 ring-white/20 ring-inset" />
      </span>
    </span>
  );
}

function MemberCard({ member, player, index }: { member: Member; player: Player; index: number }) {
  const active = player.current?.name === member.name;
  const playing = active && player.status === "playing";
  const errored = active && player.status === "error";

  return (
    <Reveal delay={Math.min(index * 55, 440)}>
      <button
        type="button"
        onClick={() => player.play(member)}
        aria-pressed={active}
        className={cn(
          "group glass relative w-full overflow-hidden rounded-[20px] p-4 text-left transition duration-300",
          "hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_28px_50px_-30px_rgba(0,0,0,0.9)]",
          active && "border-amber-glow/45 bg-amber-glow/[0.06]"
        )}
      >
        <div className="flex items-center gap-4">
          <Avatar member={member} active={active} playing={playing} />

          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-[1.05rem] text-white/92">{member.name}</p>
            <p className="mt-1 truncate font-mono text-[0.6rem] tracking-[0.22em] text-white/30">{member.latin}</p>
            <div className="mt-2.5 flex items-center gap-2">
              {active ? (
                errored ? (
                  <span className="text-[0.7rem] text-red-300/85">音频未找到</span>
                ) : (
                  <>
                    <Equalizer bars={4} className="h-3" active={playing} tone={playing ? "bg-amber-glow" : "bg-white/40"} />
                    <span className="text-[0.7rem] text-white/45">{playing ? "播放中" : "已暂停"}</span>
                  </>
                )
              ) : (
                <span className="text-[0.72rem] text-white/35 transition group-hover:text-white/60">点击收听寄语</span>
              )}
            </div>
          </div>

          <span
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition",
              active
                ? "border-amber-glow/60 bg-amber-glow/15 text-amber-glow"
                : "border-white/14 text-white/55 group-hover:border-white/35 group-hover:text-white"
            )}
          >
            {playing ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="h-3 w-3 translate-x-[1px]" />}
          </span>
        </div>

        <span
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-amber-glow to-violet-glow transition-transform duration-200"
          style={{ transform: `scaleX(${active ? player.progress : 0})` }}
        />
      </button>
    </Reveal>
  );
}

export function Voices({ player }: { player: Player }) {
  return (
    <section id="voices" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              kicker="Voices From Seniors"
              title="学长姐寄语"
              desc="十二个人，十二种声音。点击头像听一听——他们也曾和你一样，是刚走进专题组的新朋友。"
            />
            <div className="flex items-center gap-3">
              <Label>{`${members.length} Tracks`}</Label>
              <button
                type="button"
                onClick={() => (player.current ? player.toggle() : player.play(members[0]))}
                className="rounded-full border border-white/14 px-4 py-2 text-[0.8rem] text-white/65 transition hover:border-white/35 hover:text-white"
              >
                {player.status === "playing" ? "暂停播放" : "从头听起"}
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((m, i) => (
            <MemberCard key={m.name} member={m} player={player} index={i} />
          ))}
        </div>

        <Reveal delay={80}>
          <p className="mt-8 text-center text-[0.78rem] text-white/25">
            若提示「音频未找到」，把对应的 m4a / mp3 / wav 文件放回 <span className="font-mono">assets/audio/</span> 目录即可。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
