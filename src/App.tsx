import { Board } from "@/components/Board";
import { Footer } from "@/components/Footer";
import { Guide } from "@/components/Guide";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Pet } from "@/components/Pet";
import { PlayerBar } from "@/components/PlayerBar";
import { Ticker } from "@/components/Ticker";
import { Voices } from "@/components/Voices";
import { WelcomeLetter } from "@/components/WelcomeLetter";
import { members, backgroundMusic } from "@/data/members";
import { useBackgroundMusic, useVoicePlayer } from "@/hooks/useAudio";

export default function App() {
  const player = useVoicePlayer();
  const music = useBackgroundMusic(backgroundMusic);

  const scrollToVoices = () => {
    document.getElementById("voices")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleListen = () => {
    scrollToVoices();
    if (!player.current) {
      window.setTimeout(() => player.play(members[0]), 500);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-white selection:bg-amber-glow/30">
      {/* 环境光 */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(80%_60%_at_80%_-10%,rgba(157,139,255,0.16),transparent_60%),radial-gradient(70%_60%_at_0%_100%,rgba(116,230,208,0.08),transparent_60%)]" />

      <Nav musicOn={music.on} musicFailed={music.failed} onToggleMusic={music.toggle} />

      <main>
        <Hero onListen={handleListen} onToggleMusic={music.toggle} musicOn={music.on} />
        <Ticker />
        <WelcomeLetter />
        <Voices player={player} />
        <Guide />
        <Board />
      </main>

      <Footer />
      <PlayerBar player={player} />
      <Pet />
    </div>
  );
}
