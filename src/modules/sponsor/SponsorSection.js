"use client";

import {useEffect, useState, useRef} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";

const sponsors = [
  {id: 1, name: "Sponsor 1", logo: "/assets/sponsor/sponsor_1.webp"},
  {id: 2, name: "Sponsor 2", logo: "/assets/sponsor/sponsor_2.webp"},
  {id: 3, name: "Sponsor 3", logo: "/assets/sponsor/sponsor_3.webp"}
];

const SponsorCard = ({sponsor, isVisible, index}) => {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl p-4 shadow-lg",
        "w-40 h-40 md:w-56 md:h-56",
        "transform transition-all duration-500 ease-out",
        "hover:shadow-xl hover:-translate-y-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{transitionDelay: `${index * 100}ms`}}
    >
      <div className="relative w-full h-full">
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          fill
          sizes="(min-width: 768px) 224px, 160px"
          className="object-contain p-2"
        />
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
        <Image src="/assets/bunga-1.webp" alt="" fill sizes="64px" className="object-contain" />
      </div>
      <div
        className="absolute w-20 h-20 bottom-20 right-10 opacity-20"
        style={{transform: `translateY(${-scrollProgress * 40}px) rotate(${-scrollProgress * 15}deg)`}}
      >
        <Image src="/assets/bunga-4.webp" alt="" fill sizes="80px" className="object-contain" />
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
          <h2 className="mb-4 text-4xl font-auromiya sm:text-5xl md:text-6xl text-wine-500">
            Sponsor & Partner
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 font-plusjakartasans-regular">
            Terima kasih kepada seluruh sponsor dan partner yang mendukung KKN-PPM Cerita Neira
          </p>
        </div>

        {/* Sponsors */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {sponsors.map((sponsor, index) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

SponsorSection.propTypes = {
  className: PropTypes.string
};

export default SponsorSection;
