"use client";

import {useEffect, useState, useRef} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";

const TentangSection = ({className}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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
      {threshold: 0.2}
    );

    observer.observe(section);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const relativeScroll = window.scrollY - sectionTop + window.innerHeight;
        setScrollY(Math.max(0, relativeScroll));
      });
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax calculations
  const imageX = Math.min(scrollY * 0.1, 50);
  const textX = Math.min(scrollY * 0.05, 30);
  const decorRotate = scrollY * 0.02;

  return (
    <section
      ref={sectionRef}
      id="tentang"
      className={cn("relative min-h-screen bg-wine-500 overflow-hidden py-20 md:py-32", className)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 pattern-batik" />
      </div>

      {/* Decorative Flowers */}
      <div
        className="absolute w-20 h-20 top-10 right-10 md:w-32 md:h-32 opacity-20"
        style={{
          transform: `rotate(${decorRotate}deg)`
        }}
      >
        <Image src="/assets/bunga-5.webp" alt="Decoration" fill className="object-contain" />
      </div>

      <div
        className="absolute w-16 h-16 bottom-20 left-10 md:w-24 md:h-24 opacity-20"
        style={{
          transform: `rotate(${-decorRotate}deg)`
        }}
      >
        <Image src="/assets/bunga-2.webp" alt="Decoration" fill className="object-contain" />
      </div>

      {/* Main Content Container */}
      <div className="container relative z-10 px-4 mx-auto md:px-8 lg:px-16">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
          {/* Image Side */}
          <div
            className={cn(
              "relative w-full lg:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden",
              "transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            )}
            style={{
              transform: `translateX(${-imageX}px)`
            }}
          >
            {/* Frame decoration */}
            <div className="absolute inset-0 z-10 border-4 pointer-events-none border-cream-500/30 rounded-3xl" />
            <div className="absolute z-0 -inset-2 bg-gradient-to-br from-teal-500/30 to-rose-500/30 rounded-3xl blur-xl" />

            <div className="relative w-full h-full overflow-hidden z-5 rounded-3xl">
              <Image
                src="/assets/img-tentang.webp"
                alt="Banda Neira"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Floating Pala */}
            <div
              className="absolute z-20 w-20 h-20 -bottom-5 -right-5 md:w-28 md:h-28 animate-float"
              style={{
                transform: `translateY(${-scrollY * 0.05}px)`
              }}
            >
              <Image src="/assets/buah-pala.webp" alt="Buah Pala" fill className="object-contain" />
            </div>
          </div>

          {/* Text Side */}
          <div
            className={cn(
              "w-full lg:w-1/2 text-center lg:text-left",
              "transition-all duration-1000 ease-out delay-300",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            )}
            style={{
              transform: `translateX(${textX}px)`
            }}
          >
            {/* Section Label */}
            <span className="inline-block px-4 py-1 mb-4 text-sm rounded-full bg-cream-500/20 text-cream-100 font-plusjakartasans-medium">
              Tentang Kami
            </span>

            {/* Main Heading - Local Dialect */}
            <h2 className="mb-6 text-4xl leading-tight font-auromiya sm:text-5xl md:text-6xl lg:text-7xl text-cream-100">
              Katong Bacarita
              <span className="block text-teal-400">Par Banda Neira</span>
            </h2>

            {/* Description */}
            <p className="mb-6 text-base leading-relaxed text-cream-200 md:text-lg font-plusjakartasans-regular">
              Cerita Neira adalah program Kuliah Kerja Nyata Pembelajaran Pemberdayaan Masyarakat (KKN-PPM)
              UGM yang berlokasi di Banda Neira, Maluku. Kami hadir untuk berkontribusi dalam pemberdayaan
              masyarakat lokal melalui berbagai program yang berkelanjutan.
            </p>

            <p className="mb-8 text-base leading-relaxed text-cream-300 md:text-lg font-plusjakartasans-regular">
              Bersama-sama, kita akan menulis cerita baru untuk negeri Pala—melestarikan budaya, memberdayakan
              potensi, dan membangun harapan untuk generasi mendatang.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl text-teal-400 font-auromiya md:text-4xl">30+</div>
                <div className="text-sm text-cream-300 font-plusjakartasans-regular">Mahasiswa</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-auromiya md:text-4xl text-rose-400">45</div>
                <div className="text-sm text-cream-300 font-plusjakartasans-regular">Hari Pengabdian</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-auromiya md:text-4xl text-cream-100">10+</div>
                <div className="text-sm text-cream-300 font-plusjakartasans-regular">Program Kerja</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 40C672 50 768 70 864 75C960 80 1056 70 1152 55C1248 40 1344 20 1392 10L1440 0V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="#FFF5E8"
          />
        </svg>
      </div>
    </section>
  );
};

TentangSection.propTypes = {
  className: PropTypes.string
};

export default TentangSection;
