"use client";

import HeroSection from "@/modules/hero/HeroSection";
import TentangSection from "@/modules/tentang/TentangSection";
import TimelineSection from "@/modules/timeline/TimelineSection";
import RekrutmenSection from "@/modules/rekrutmen/RekrutmenSection";
import GaleriSection from "@/modules/galeri/GaleriSection";
import Lenis from "lenis";
import {useEffect} from "react";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({});
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream-500">
      <HeroSection />
      <TentangSection />
      <TimelineSection />
      <RekrutmenSection />
      <GaleriSection />
    </main>
  );
}
