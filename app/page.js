"use client";

import HeroSection from "@/modules/hero/HeroSection";
import SplashIntro from "@/modules/hero/SplashIntro";
import TentangSection from "@/modules/tentang/TentangSection";
import TimelineSection from "@/modules/timeline/TimelineSection";
import RekrutmenSection from "@/modules/rekrutmen/RekrutmenSection";
import GaleriSection from "@/modules/galeri/GaleriSection";
import SponsorSection from "@/modules/sponsor/SponsorSection";
import Lenis from "lenis";
import {useEffect, useRef, useState} from "react";

export default function Home() {
  const lenisRef = useRef(null);
  const [introRevealed, setIntroRevealed] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({});
    lenisRef.current = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (introDone) {
      html.style.overflow = "";
      lenisRef.current?.start();
      return;
    }
    html.style.overflow = "hidden";
    lenisRef.current?.stop();
    return () => {
      html.style.overflow = "";
    };
  }, [introDone]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-cream-500">
      {!introDone && (
        <SplashIntro onReveal={() => setIntroRevealed(true)} onComplete={() => setIntroDone(true)} />
      )}
      <HeroSection ready={introRevealed} />
      <TentangSection />
      <TimelineSection />
      <RekrutmenSection />
      <GaleriSection />
      <SponsorSection />
    </main>
  );
}
