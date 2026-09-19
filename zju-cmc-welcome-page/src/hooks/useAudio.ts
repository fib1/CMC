import { useCallback, useEffect, useRef, useState } from "react";
import { members, type Member } from "@/data/members";

type Status = "idle" | "loading" | "playing" | "paused" | "error";

export function useVoicePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Member | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);

  const ensure = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio();
      el.preload = "metadata";
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const play = useCallback(
    (member: Member) => {
      const el = ensure();
      if (current?.name === member.name) {
        if (el.paused) {
          void el.play().catch(() => setStatus("error"));
        } else {
          el.pause();
        }
        return;
      }
      setCurrent(member);
      setStatus("loading");
      setProgress(0);
      setDuration(0);
      el.src = member.audio;
      el.volume = volume;
      el.load();
      void el
        .play()
        .then(() => setStatus("playing"))
        .catch(() => setStatus("error"));
    },
    [current, ensure, volume]
  );

  const toggle = useCallback(() => {
    const el = ensure();
    if (!current) {
      play(members[0]);
      return;
    }
    if (el.paused) {
      void el.play().catch(() => setStatus("error"));
    } else {
      el.pause();
    }
  }, [current, ensure, play]);

  const step = useCallback(
    (dir: 1 | -1) => {
      const idx = current ? members.findIndex((m) => m.name === current.name) : -1;
      const nextIdx = (idx + dir + members.length) % members.length;
      play(members[nextIdx]);
    },
    [current, play]
  );

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setStatus("paused");
  }, []);

  const seek = useCallback((ratio: number) => {
    const el = audioRef.current;
    if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return;
    el.currentTime = Math.min(Math.max(ratio, 0), 1) * el.duration;
    setProgress(Math.min(Math.max(ratio, 0), 1));
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onMeta = () => setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    const onEnd = () => step(1);
    const onPlay = () => setStatus("playing");
    const onPause = () => setStatus((s) => (s === "error" ? s : "paused"));
    const onError = () => setStatus("error");
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onError);
    };
  }, [current, step]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => () => audioRef.current?.pause(), []);

  return { current, status, progress, duration, volume, setVolume, play, toggle, step, stop, seek };
}

export function useBackgroundMusic(src: string) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const [failed, setFailed] = useState(false);

  const toggle = useCallback(() => {
    if (!ref.current) {
      const el = new Audio(src);
      el.loop = true;
      el.volume = 0.35;
      el.preload = "auto";
      el.addEventListener("error", () => setFailed(true));
      ref.current = el;
    }
    const el = ref.current;
    if (el.paused) {
      void el
        .play()
        .then(() => {
          setOn(true);
          setFailed(false);
        })
        .catch(() => setOn(false));
    } else {
      el.pause();
      setOn(false);
    }
  }, [src]);

  useEffect(() => () => ref.current?.pause(), []);

  return { on, failed, toggle };
}
