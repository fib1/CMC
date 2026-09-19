import { useEffect, useState } from "react";
import type { Member } from "@/data/members";
import { cn } from "@/utils/cn";

/**
 * 成员头像：优先显示 assets/images/ 里的真实照片，
 * 照片缺失或加载失败时自动退回「渐变底 + 名字中的一个字」。
 */
export function Avatar({
  member,
  className,
  glyphClass,
  playing = false,
}: {
  member: Member;
  className?: string;
  glyphClass?: string;
  playing?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [member.image]);

  const showImage = Boolean(member.image) && !failed;

  return (
    <span
      className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full", className)}
      style={{ backgroundImage: `linear-gradient(145deg, ${member.from}, ${member.to})` }}
    >
      {showImage && (
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full scale-[1.02] object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {!loaded && (
        <span className={cn("absolute font-serif text-white/95 drop-shadow", glyphClass)} aria-hidden>
          {member.glyph}
        </span>
      )}

      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20 ring-inset" />

      {playing && (
        <span className="pointer-events-none absolute inset-0 rounded-full bg-ink/25 transition-opacity" />
      )}
    </span>
  );
}
