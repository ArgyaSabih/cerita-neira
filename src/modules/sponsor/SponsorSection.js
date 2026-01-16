"use client";

import {useEffect, useState, useRef} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";

const sponsorsData = {
  platinum: [{id: 1, name: "Universitas Gadjah Mada", logo: "/assets/bunga-1.webp"}],
  gold: [
    {id: 2, name: "Sponsor Gold 1", logo: "/assets/bunga-2.webp"},
    {id: 3, name: "Sponsor Gold 2", logo: "/assets/bunga-3.webp"}
  ],
  silver: [
    {id: 4, name: "Sponsor Silver 1", logo: "/assets/bunga-4.webp"},
    {id: 5, name: "Sponsor Silver 2", logo: "/assets/bunga-5.webp"},
    {id: 6, name: "Sponsor Silver 3", logo: "/assets/buah-pala.webp"}
  ]
};

const SponsorCard = ({sponsor, tier, isVisible, index}) => {
  const tierStyles = {
    platinum: "w-32 h-32 md:w-40 md:h-40",
    gold: "w-24 h-24 md:w-32 md:h-32",
    silver: "w-20 h-20 md:w-24 md:h-24"
  };

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl p-4 shadow-lg",
        "transform transition-all duration-500 ease-out",
        "hover:shadow-xl hover:-translate-y-2",
        tierStyles[tier],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{transitionDelay: `${index * 100}ms`}}
    >
      <div className="relative w-full h-full">
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          fill
          className="object-contain p-2 transition-all duration-300 grayscale group-hover:grayscale-0"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-wine-500/90 rounded-2xl group-hover:opacity-100">
        <span className="px-2 text-xs text-center text-cream-100 font-plusjakartasans-medium">
          {sponsor.name}
        </span>
      </div>
    </div>
  );
};

SponsorCard.propTypes = {
  sponsor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }).isRequired,
  tier: PropTypes.oneOf(["platinum", "gold", "silver"]).isRequired,
  isVisible: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
};

const SponsorSection = ({className}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {threshold: 0.1}
    );

    observer.observe(section);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrolled = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / (rect.height + viewportHeight)));
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsor"
      className={cn("relative bg-cream-500 py-20 md:py-32 overflow-hidden", className)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pattern-batik" />

      {/* Floating Decorations */}
      <div
        className="absolute w-16 h-16 top-10 left-10 opacity-20"
        style={{transform: `translateY(${scrollProgress * 30}px) rotate(${scrollProgress * 20}deg)`}}
      >
        <Image src="/assets/bunga-1.webp" alt="" fill className="object-contain" />
      </div>
      <div
        className="absolute w-20 h-20 bottom-20 right-10 opacity-20"
        style={{transform: `translateY(${-scrollProgress * 40}px) rotate(${-scrollProgress * 15}deg)`}}
      >
        <Image src="/assets/bunga-4.webp" alt="" fill className="object-contain" />
      </div>

      {/* Container */}
      <div className="container relative z-10 px-4 mx-auto md:px-8 lg:px-16">
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-16",
            "transform transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm rounded-full bg-wine-500/10 text-wine-500 font-plusjakartasans-medium">
            Didukung Oleh
          </span>
          <h2 className="mb-4 text-4xl font-auromiya sm:text-5xl md:text-6xl text-wine-500">
            Sponsor & Partner
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 font-plusjakartasans-regular">
            Terima kasih kepada seluruh sponsor dan partner yang mendukung KKN-PPM Cerita Neira
          </p>
        </div>

        {/* Platinum Sponsors */}
        <div className="mb-12">
          <h3 className="mb-6 text-center font-plusjakartasans-semibold text-wine-500">Platinum Sponsor</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsorsData.platinum.map((sponsor, index) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                tier="platinum"
                isVisible={isVisible}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-12">
          <h3 className="mb-6 text-center font-plusjakartasans-semibold text-wine-500/80">Gold Sponsor</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {sponsorsData.gold.map((sponsor, index) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                tier="gold"
                isVisible={isVisible}
                index={index + sponsorsData.platinum.length}
              />
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div>
          <h3 className="mb-6 text-center font-plusjakartasans-semibold text-wine-500/60">Silver Sponsor</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {sponsorsData.silver.map((sponsor, index) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                tier="silver"
                isVisible={isVisible}
                index={index + sponsorsData.platinum.length + sponsorsData.gold.length}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mt-16 text-center",
            "transform transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <p className="mb-4 text-neutral-600 font-plusjakartasans-regular">
            Tertarik menjadi sponsor atau partner?
          </p>
          <a
            href="mailto:ceritaneira@ugm.ac.id"
            className="inline-flex items-center gap-2 px-6 py-3 transition-colors bg-wine-500 text-cream-100 rounded-xl font-plusjakartasans-semibold hover:bg-wine-600"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
};

SponsorSection.propTypes = {
  className: PropTypes.string
};

export default SponsorSection;
