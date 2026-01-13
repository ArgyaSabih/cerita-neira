import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/modules/hero/HeroSection";
import TentangSection from "@/modules/tentang/TentangSection";
import TimelineSection from "@/modules/timeline/TimelineSection";
import RekrutmenSection from "@/modules/rekrutmen/RekrutmenSection";
import GaleriSection from "@/modules/galeri/GaleriSection";
import SponsorSection from "@/modules/sponsor/SponsorSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream-500">
      <Navbar />
      <HeroSection />
      <TentangSection />
      <TimelineSection />
      <RekrutmenSection />
      <GaleriSection />
      <SponsorSection />
      <Footer />
    </main>
  );
}
