"use client";

import {useEffect, useState, useRef} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";

const HeroSection = ({className}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax calculations
  const backgroundY = scrollY * 0.3;
  const titleY = scrollY * 0.5;
  const titleScale = Math.max(0.8, 1 - scrollY * 0.0005);
  const titleOpacity = Math.max(0, 1 - scrollY * 0.002);
  const decorOpacity = Math.max(0, 1 - scrollY * 0.001);
  const waveY = scrollY * 0.6;

  return (
    <section
      ref={sectionRef}
      id="home"
      className={cn("relative min-h-[120vh] overflow-hidden bg-cream-500", className)}
    >
      {/* Background Layer - Batik Pattern */}
      <div
        className="absolute inset-0 pattern-batik opacity-30"
        style={{
          transform: `translateY(${backgroundY * 0.5}px)`
        }}
      />

      {/* Hero Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${backgroundY}px) scale(${1 + scrollY * 0.0002})`
        }}
      >
        <Image
          src="/assets/bg-hero.webp"
          alt="Banda Neira Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-500/30 via-transparent to-cream-500" />
      </div>

      {/* Decorative Elements - Flowers */}
      <div
        className="absolute z-10 w-24 h-24 top-10 left-10 md:w-32 md:h-32 animate-float"
        style={{
          transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.02}deg)`,
          opacity: decorOpacity
        }}
      >
        <Image src="/assets/bunga-1.webp" alt="Decorative Flower" fill className="object-contain" />
      </div>

      <div
        className="absolute z-10 w-20 h-20 delay-300 top-20 right-10 md:w-28 md:h-28 animate-float-slow"
        style={{
          transform: `translateY(${scrollY * 0.15}px) rotate(${-scrollY * 0.015}deg)`,
          opacity: decorOpacity
        }}
      >
        <Image src="/assets/bunga-2.webp" alt="Decorative Flower" fill className="object-contain" />
      </div>

      <div
        className="absolute z-10 w-16 h-16 delay-500 bottom-40 left-5 md:w-24 md:h-24 animate-float"
        style={{
          transform: `translateY(${scrollY * 0.25}px)`,
          opacity: decorOpacity
        }}
      >
        <Image src="/assets/bunga-3.webp" alt="Decorative Flower" fill className="object-contain" />
      </div>

      <div
        className="absolute top-40 right-[20%] z-10 w-12 h-12 md:w-20 md:h-20 animate-float-slow delay-700"
        style={{
          transform: `translateY(${scrollY * 0.18}px) rotate(${scrollY * 0.01}deg)`,
          opacity: decorOpacity
        }}
      >
        <Image src="/assets/bunga-4.webp" alt="Decorative Flower" fill className="object-contain" />
      </div>

      {/* Dolphins */}
      <div
        className="absolute bottom-[30%] right-[15%] z-10 w-16 h-12 md:w-24 md:h-18 animate-swim"
        style={{
          transform: `translateX(${scrollY * 0.1}px) translateY(${scrollY * 0.2}px)`,
          opacity: decorOpacity
        }}
      >
        <Image src="/assets/lumba-1.webp" alt="Dolphin" fill className="object-contain" />
      </div>

      <div
        className="absolute bottom-[25%] left-[10%] z-10 w-12 h-10 md:w-20 md:h-14 animate-swim delay-1000"
        style={{
          transform: `translateX(${-scrollY * 0.08}px) translateY(${scrollY * 0.15}px)`,
          opacity: decorOpacity
        }}
      >
        <Image src="/assets/lumba-2.webp" alt="Dolphin" fill className="object-contain" />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "relative z-20 flex flex-col items-center justify-center min-h-screen px-4 pt-20",
          "transition-all duration-700 ease-out",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          opacity: titleOpacity
        }}
      >
        {/* KKN Badge */}
        <div
          className={cn(
            "mb-4 px-6 py-2 rounded-full glass text-wine-500 font-plusjakartasans-semibold text-sm md:text-base",
            "transition-all duration-500 delay-300",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          )}
        >
          KKN-PPN UGM 2026
        </div>

        {/* Main Title */}
        <h1
          className={cn(
            "font-auromiya text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-wine-500 text-center leading-none",
            "transition-all duration-700 delay-500",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          Cerita
        </h1>
        <h1
          className={cn(
            "font-auromiya text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-teal-500 text-center leading-none -mt-2 md:-mt-4",
            "transition-all duration-700 delay-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          Neira
        </h1>

        {/* Coming Soon Badge */}
        <div
          className={cn(
            "mt-8 px-8 py-3 bg-wine-500 text-cream-100 rounded-2xl font-auromiya text-xl md:text-2xl",
            "shadow-lg transform hover:scale-105 transition-transform duration-300",
            "transition-all duration-700 delay-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          coming soon
        </div>

        {/* Scroll Indicator */}
        <div
          className={cn(
            "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
            "transition-all duration-700 delay-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{opacity: Math.max(0, 1 - scrollY * 0.005)}}
        >
          <span className="text-sm text-wine-500 font-plusjakartasans-medium">Scroll untuk menjelajah</span>
          <div className="flex justify-center w-6 h-10 p-1 border-2 rounded-full border-wine-500">
            <div className="w-1.5 h-3 bg-wine-500 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Wave Transition to Next Section */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30"
        style={{
          transform: `translateY(${waveY * 0.2}px)`
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 65C384 50 480 40 576 45C672 50 768 70 864 75C960 80 1056 70 1152 60C1248 50 1344 40 1392 35L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="#7B1F59"
          />
        </svg>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  className: PropTypes.string
};

export default HeroSection;
