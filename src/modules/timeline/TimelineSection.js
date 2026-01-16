"use client";

import {useEffect, useState, useRef} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";

const timelineData = [
  {
    id: 1,
    date: "Januari 2026",
    title: "Pembukaan Pendaftaran",
    description: "Pendaftaran peserta KKN-PPM Cerita Neira dibuka untuk seluruh mahasiswa UGM.",
    icon: "📋"
  },
  {
    id: 2,
    date: "Februari 2026",
    title: "Seleksi & Pengumuman",
    description: "Proses seleksi berkas dan wawancara calon peserta KKN-PPM.",
    icon: "📝"
  },
  {
    id: 3,
    date: "Maret 2026",
    title: "Pembekalan",
    description: "Pembekalan materi dan persiapan keberangkatan ke Banda Neira.",
    icon: "📚"
  },
  {
    id: 4,
    date: "April - Mei 2026",
    title: "Pelaksanaan KKN",
    description: "Pelaksanaan program KKN-PPM di Banda Neira selama 45 hari.",
    icon: "🏝️"
  },
  {
    id: 5,
    date: "Juni 2026",
    title: "Penarikan & Evaluasi",
    description: "Penarikan peserta dan evaluasi program yang telah dilaksanakan.",
    icon: "🎓"
  }
];

const TimelineItem = ({item, index, isVisible, scrollProgress}) => {
  const isLeft = index % 2 === 0;
  const delay = index * 150;

  // Parallax effect berdasarkan scroll
  const translateY = Math.max(0, 50 - scrollProgress * 100);
  const opacity = Math.min(1, scrollProgress * 2);

  return (
    <div
      className={cn(
        "relative flex items-center w-full mb-8 md:mb-0",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Content Card */}
      <div
        className={cn(
          "w-full md:w-5/12 p-6 bg-white rounded-2xl shadow-lg",
          "transform transition-all duration-700 ease-out",
          "hover:shadow-xl hover:-translate-y-1",
          isLeft ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{
          transitionDelay: `${delay}ms`,
          transform: `translateY(${translateY * (isLeft ? 1 : -1) * 0.3}px)`
        }}
      >
        {/* Icon */}
        <div
          className={cn(
            "inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-teal-100 text-2xl",
            isLeft ? "md:ml-auto" : "md:mr-auto"
          )}
        >
          {item.icon}
        </div>

        {/* Date Badge */}
        <div
          className={cn(
            "inline-block px-3 py-1 mb-2 text-xs font-plusjakartasans-semibold text-wine-500 bg-rose-100 rounded-full"
          )}
        >
          {item.date}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg md:text-xl font-plusjakartasans-bold text-wine-600">{item.title}</h3>

        {/* Description */}
        <p className="text-sm text-neutral-600 font-plusjakartasans-regular">{item.description}</p>
      </div>

      {/* Timeline Dot - Center */}
      <div
        className={cn(
          "hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center",
          "w-6 h-6 bg-wine-500 rounded-full border-4 border-cream-500",
          "transform transition-all duration-500",
          isVisible ? "scale-100" : "scale-0"
        )}
        style={{transitionDelay: `${delay + 100}ms`}}
      >
        <div className="w-2 h-2 rounded-full bg-cream-100" />
      </div>

      {/* Empty space for the other side */}
      <div className="hidden w-5/12 md:block" />
    </div>
  );
};

TimelineItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  scrollProgress: PropTypes.number.isRequired
};

const TimelineSection = ({className}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

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
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight + viewportHeight)));

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

  const lineHeight = `${Math.min(100, scrollProgress * 150)}%`;

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className={cn(
        "relative min-h-screen bg-gradient-to-b from-cream-300 via-cream-200 to-neutral-100 py-20 md:py-32",
        className
      )}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5 pattern-batik" />

      {/* Floating decorations */}
      <div className="absolute w-28 h-28 md:w-48 md:h-48 animate-spin lg:top-12 top-24 left-10 lg:left-40 opacity-30">
        <Image src="/assets/bunga-1.webp" alt="" fill className="object-contain" />
      </div>

      <div
        className="absolute w-28 h-28 bottom-32 right-60 opacity-30"
        style={{
          transform: `translateY(${-scrollProgress * 150}px) rotate(${-scrollProgress * 120}deg)`
        }}
      >
        <Image src="/assets/bunga-4.webp" alt="" fill className="object-contain" />
      </div>

      <div
        className="absolute z-10 w-60 h-60 -right-12 -bottom-4 md:-right-28 md:-bottom-20 md:w-96 md:h-96"
        style={{
          transform: `rotate(-20deg) translateY(${scrollProgress * 150}px)`
        }}
      >
        <Image src="/assets/ring-pala.webp" alt="" fill className="object-contain" />
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
            Perjalanan Kami
          </span>
          <h2 className="mb-4 text-4xl font-auromiya sm:text-5xl md:text-6xl text-wine-500">Timeline</h2>
          <p className="max-w-2xl mx-auto text-neutral-600 font-plusjakartasans-regular">
            Rangkaian kegiatan KKN-PPM Cerita Neira dari awal hingga akhir program
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute top-0 bottom-0 hidden w-1 -translate-x-1/2 md:block left-1/2 bg-neutral-200">
            {/* Animated fill */}
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full transition-all duration-300 bg-gradient-to-b from-wine-500 via-rose-500 to-teal-500"
              style={{height: lineHeight}}
            />
          </div>

          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-200">
            <div
              className="absolute top-0 left-0 w-full transition-all duration-300 bg-gradient-to-b from-wine-500 to-teal-500"
              style={{height: lineHeight}}
            />
          </div>

          {/* Timeline Items */}
          <div className="relative md:py-8">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isVisible={isVisible}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

TimelineSection.propTypes = {
  className: PropTypes.string
};

export default TimelineSection;
