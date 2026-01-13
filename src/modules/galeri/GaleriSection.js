"use client";

import {useEffect, useState, useRef, useMemo} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";

const galleryImages = [
  {
    id: 1,
    src: "/assets/bg-hero.webp",
    alt: "Banda Neira View",
    position: {x: -30, y: -20, z: 100},
    size: "large",
    rotation: -5
  },
  {
    id: 2,
    src: "/assets/img-tentang.webp",
    alt: "Tentang Banda Neira",
    position: {x: 25, y: 10, z: 200},
    size: "medium",
    rotation: 3
  },
  {
    id: 3,
    src: "/assets/buah-pala.webp",
    alt: "Buah Pala",
    position: {x: -20, y: 30, z: 150},
    size: "small",
    rotation: 8
  },
  {
    id: 4,
    src: "/assets/bunga-1.webp",
    alt: "Bunga Khas",
    position: {x: 35, y: -25, z: 250},
    size: "small",
    rotation: -10
  },
  {
    id: 5,
    src: "/assets/bunga-2.webp",
    alt: "Bunga Dekorasi",
    position: {x: -35, y: 5, z: 180},
    size: "small",
    rotation: 12
  },
  {
    id: 6,
    src: "/assets/bunga-3.webp",
    alt: "Ornamen Bunga",
    position: {x: 10, y: -35, z: 120},
    size: "small",
    rotation: -8
  },
  {
    id: 7,
    src: "/assets/bunga-4.webp",
    alt: "Bunga Tradisional",
    position: {x: -15, y: 40, z: 220},
    size: "small",
    rotation: 5
  },
  {
    id: 8,
    src: "/assets/bunga-5.webp",
    alt: "Bunga Neira",
    position: {x: 40, y: 25, z: 160},
    size: "small",
    rotation: -15
  },
  {
    id: 9,
    src: "/assets/lumba-1.webp",
    alt: "Lumba-lumba",
    position: {x: -40, y: -15, z: 280},
    size: "medium",
    rotation: 6
  },
  {
    id: 10,
    src: "/assets/lumba-2.webp",
    alt: "Lumba-lumba Neira",
    position: {x: 30, y: 35, z: 300},
    size: "medium",
    rotation: -4
  }
];

const GalleryImage = ({image, scrollProgress, isVisible}) => {
  const sizeClasses = {
    small: "w-20 h-20 md:w-28 md:h-28",
    medium: "w-32 h-32 md:w-44 md:h-44",
    large: "w-40 h-40 md:w-56 md:h-56"
  };

  const depth = image.position.z;
  const parallaxStrength = depth / 100;

  const translateX = image.position.x + scrollProgress * parallaxStrength * 20;
  const translateY = image.position.y - scrollProgress * parallaxStrength * 50;
  const translateZ = scrollProgress * parallaxStrength * 100;
  const scale = 1 + scrollProgress * 0.1 * (depth / 300);
  const opacity = Math.min(1, 0.3 + scrollProgress * 0.7);

  return (
    <div
      className={cn(
        "absolute transform-gpu transition-opacity duration-500",
        sizeClasses[image.size],
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{
        left: `calc(50% + ${translateX}%)`,
        top: `calc(50% + ${translateY}%)`,
        transform: `
          translate(-50%, -50%)
          translateZ(${translateZ}px)
          scale(${scale})
          rotate(${image.rotation + scrollProgress * 5}deg)
        `,
        opacity: opacity,
        zIndex: Math.floor(depth / 10),
        filter: `blur(${Math.max(0, (1 - scrollProgress) * 2)}px)`
      }}
    >
      <div className="relative w-full h-full overflow-hidden shadow-2xl rounded-xl group">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100px, 200px"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end p-2 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-wine-500/60 to-transparent group-hover:opacity-100">
          <span className="text-xs truncate text-cream-100 font-plusjakartasans-medium">{image.alt}</span>
        </div>
      </div>
    </div>
  );
};

GalleryImage.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      z: PropTypes.number.isRequired
    }).isRequired,
    size: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    rotation: PropTypes.number.isRequired
  }).isRequired,
  scrollProgress: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired
};

const GaleriSection = ({className}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  // Memoize images to prevent re-renders
  const memoizedImages = useMemo(() => galleryImages, []);

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
        const sectionCenter = rect.top + rect.height / 2;

        // Progress from 0 (entering) to 1 (leaving)
        const progress = Math.max(0, Math.min(1, 1 - sectionCenter / viewportHeight));

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
      id="galeri"
      className={cn("relative min-h-[150vh] bg-wine-500 py-20 md:py-32 overflow-hidden", className)}
      style={{
        perspective: "1000px",
        perspectiveOrigin: "center center"
      }}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-wine-500 via-wine-600 to-wine-700"
        style={{
          transform: `translateZ(-100px) scale(1.2)`
        }}
      />

      {/* Animated Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollProgress * 50}px)`
        }}
      >
        <div className="absolute inset-0 pattern-batik" />
      </div>

      {/* Section Header */}
      <div
        className={cn(
          "relative z-50 text-center mb-16 px-4",
          "transform transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{
          transform: `translateY(${-scrollProgress * 30}px)`
        }}
      >
        <span className="inline-block px-4 py-1 mb-4 text-sm rounded-full bg-cream-500/20 text-cream-100 font-plusjakartasans-medium">
          Jelajahi Keindahan
        </span>
        <h2 className="mb-4 text-4xl font-auromiya sm:text-5xl md:text-6xl lg:text-7xl text-cream-100">
          Galeri Neira
        </h2>
        <p className="max-w-2xl mx-auto text-cream-200 font-plusjakartasans-regular">
          Masuki galeri kami dan rasakan pengalaman visual yang memukau dari Banda Neira
        </p>
      </div>

      {/* 3D Gallery Container */}
      <div
        className="relative z-10 h-[80vh] mx-auto max-w-6xl"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${scrollProgress * 5}deg)`
        }}
      >
        {/* Center vortex effect */}
        <div
          className="absolute w-64 h-64 rounded-full left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + scrollProgress})`,
            background: `radial-gradient(circle, transparent 0%, rgba(123, 31, 89, 0.3) 50%, transparent 100%)`
          }}
        />

        {/* Gallery Images */}
        {memoizedImages.map((image) => (
          <GalleryImage key={image.id} image={image} scrollProgress={scrollProgress} isVisible={isVisible} />
        ))}

        {/* Depth indicator lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg, transparent 49%, rgba(255,245,232,0.03) 50%, transparent 51%),
              linear-gradient(0deg, transparent 49%, rgba(255,245,232,0.03) 50%, transparent 51%)
            `,
            transform: `scale(${1 + scrollProgress * 0.5})`
          }}
        />
      </div>

      {/* Scroll hint */}
      <div
        className={cn(
          "absolute bottom-32 left-1/2 -translate-x-1/2 text-center",
          "transition-opacity duration-500"
        )}
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 3)
        }}
      >
        <p className="mb-2 text-sm text-cream-200/60 font-plusjakartasans-regular">
          Scroll untuk menjelajah lebih dalam
        </p>
        <div className="flex justify-center w-6 h-10 p-1 mx-auto border-2 rounded-full border-cream-200/30">
          <div className="w-1.5 h-3 bg-cream-200/50 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 z-40">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L60 65C120 70 240 80 360 80C480 80 600 70 720 55C840 40 960 20 1080 15C1200 10 1320 20 1380 25L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FFF5E8"
          />
        </svg>
      </div>
    </section>
  );
};

GaleriSection.propTypes = {
  className: PropTypes.string
};

export default GaleriSection;
