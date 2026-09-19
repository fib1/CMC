import { members, type Member } from "@/data/members";
import type { useVoicePlayer } from "@/hooks/useAudio";
import { cn } from "@/utils/cn";
import { Avatar } from "./Avatar";
import { Reveal } from "./Reveal";
import { Equalizer, Label, PauseIcon, PlayIcon, SectionHeading } from "./ui";

type Player = ReturnType<typeof useVoicePlayer>;

function AvatarRing({ member, active, playing }: { member: Member; active: boolean; playing: boolean }) {
  return (
    <span className="relative shrink-0">
      {active && playing && (
        <span
          className="absolute -inset-1 animate-pulse-ring rounded-full"
          style={{ background: `radial-gradient(circle, ${member.to}66, transparent 70%)` }}
        />
      )}
      <Avatar
        member={member}
        className={cn(
          "h-14 w-14 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.9)] transition duration-300",
          active ? "ring-2 ring-amber-glow/70" : "group-hover:scale-105"
        )}
        glyphClass="text-[1.35rem]"
        playing={playing}
      />
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
          <AvatarRing member={member} active={active} playing={playing} />

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


      </div>
    </section>
  );
}
