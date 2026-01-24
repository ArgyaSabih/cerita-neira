"use client";

import {useEffect, useState, useRef} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";
import DefaultLayout from "@/components/DefaultLayout";

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
    <DefaultLayout
      className={"lg:pt-4 xl:pt-6"}
      decoration={
        <>
          {/* Desktop background */}
          <Image
            src="/assets/bg-hero.webp"
            alt="Banda Neira Background"
            priority
            className="absolute top-0 right-0 object-cover object-bottom w-full h-full pointer-events-none "
            fill
          />

          {/* Batik pattern overlay */}
          <div
            className="absolute inset-0 pattern-batik opacity-30"
            style={{
              transform: `translateY(${backgroundY * 0.5}px)`,
              transition: "transform 300ms cubic-bezier(.22,1,.36,1)",
              willChange: "transform, opacity"
            }}
          />

          {/* small decorative accents in background */}
          <div
            className="absolute bottom-[30%] right-[8%] z-10 w-28 h-28 md:w-48 md:h-48 animate-swim delay-1000"
            style={{
              transform: `translateX(${-scrollY * 0.08}px) translateY(${scrollY * 0.15}px)`,
              opacity: decorOpacity,
              transition: "opacity 260ms linear, transform 300ms cubic-bezier(.22,1,.36,1)",
              willChange: "transform, opacity"
            }}
          >
            <Image src="/assets/lumba-2.webp" alt="Dolphin" fill className="object-contain" />
          </div>

          <div
            className="absolute z-10 w-20 h-20 delay-300 -rotate-[30deg] top-40 left-12 lg:top-48 lg:left-40 md:w-28 md:h-28 animate-float-slow"
            style={{
              transform: `translateY(${scrollY * 0.15}px) rotate(${-scrollY * 0.015}deg)`,
              opacity: decorOpacity,
              transition: "opacity 260ms linear, transform 300ms cubic-bezier(.22,1,.36,1)",
              willChange: "transform, opacity"
            }}
          >
            <Image src="/assets/bunga-2.webp" alt="Decorative Flower" fill className="object-contain" />
          </div>
        </>
      }
    >
      <section ref={sectionRef} id="beranda" className={cn("relative min-h-[120vh] overflow-hidden")}>
        {/* Main Content */}
        <div
          className={cn(
            "relative z-20 flex flex-col items-center justify-center min-h-screen",
            "transition-all duration-700 ease-out",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            opacity: titleOpacity
          }}
        >
          {/* Main Title */}
          <h1
            className={cn(
              "font-auromiya text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] text-neutral-100 text-center leading-none",
              "transition-all duration-700 delay-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Cerita
            <div
              className="absolute delay-700 w-14 h-14 -z-10 -right-[1.2rem] -top-[0.8rem] md:-right-[2.7rem] md:-top-[1.5rem] md:w-28 md:h-28"
              style={{
                opacity: decorOpacity,
                transition: "opacity 260ms linear, transform 300ms cubic-bezier(.22,1,.36,1)",
                willChange: "transform, opacity"
              }}
            >
              <Image src="/assets/bunga-4.webp" alt="Decorative Flower" fill className="object-contain" />
            </div>
          </h1>

          <h1
            className={cn(
              "font-auromiya text-[3.5rem] sm:text-[4rem] md:text-[5rem] lg:text-8xl text-neutral-100 text-center leading-none -mt-1",
              "transition-all duration-700 delay-700",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Neira
          </h1>

          {/* KKN Badge */}
          <div
            className={cn(
              "m-4 px-6 py-2 rounded-full glass text-wine-500 font-plusjakartasans-semibold text-sm md:text-xl",
              "transition-all duration-500 delay-300",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
            )}
          >
            KKN-PPM UGM BANDA NEIRA
          </div>
          <p
            className={cn(
              "text-sm text-center transition-all duration-500 delay-1000 text-shadow-sm  text-neutral-100 text-shadow-neutral-900 md:text-xl font-plusjakartasans-regular",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
          >
            Desa Rajawali & Desa TanaRatah, Kec. Banda, Maluku Tengah
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
};

HeroSection.propTypes = {
  className: PropTypes.string
};

export default HeroSection;
