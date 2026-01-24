"use client";

import Link from "next/link";
import {useEffect, useState, useRef, useCallback, memo} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";
import {galeriImages, ornamentImages} from "./data/galeriImages";
import {LuMouse} from "react-icons/lu";

// Memoized gallery image component for performance
const GalleryImageItem = memo(function GalleryImageItem({img, addToGallery}) {
  return (
    <div
      ref={addToGallery}
      className="image absolute inset-0 grid h-[140px] w-[220px] place-items-center transition-all duration-500 ease-out sm:h-[160px] sm:w-[260px] md:h-[200px] md:w-[320px] lg:h-[220px] lg:w-[360px]"
      style={{
        left: img.left,
        right: img.right,
        top: img.top,
        bottom: img.bottom,
        transform: `translate3d(0,0,${img.z}px)`,
        willChange: "transform, filter",
        zIndex: Math.round((img.z + 3000) / 10)
      }}
      data-zinit={img.z}
    >
      <div className="relative w-full h-full overflow-hidden shadow-lg rounded-xl">
        <Image
          src={`/assets/${img.src}`}
          alt={img.alt}
          fill
          sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, (max-width: 1024px) 320px, 360px"
          className="object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end p-3 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-wine-500/60 via-transparent to-transparent hover:opacity-100"></div>
      </div>
    </div>
  );
});

GalleryImageItem.propTypes = {
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    left: PropTypes.string,
    right: PropTypes.string,
    top: PropTypes.string,
    bottom: PropTypes.string,
    z: PropTypes.number.isRequired
  }).isRequired,
  addToGallery: PropTypes.func.isRequired
};

// Memoized ornament component - decorative elements with natural sizing
const OrnamentItem = memo(function OrnamentItem({img, addToGallery}) {
  const baseTransform = `translate3d(0,0,${img.z}px)`;
  const skewTransform = img.skew ? " skewY(-5deg) skewX(5deg)" : "";

  return (
    <div
      ref={addToGallery}
      className="absolute grid transition-all duration-500 ease-out pointer-events-none image place-items-center"
      style={{
        left: img.left,
        top: img.top,
        width: "120px",
        height: "120px",
        transform: baseTransform + skewTransform,
        willChange: "transform, filter",
        zIndex: Math.round((img.z + 3000) / 10)
      }}
      data-zinit={img.z}
    >
      <Image
        src={`/assets/${img.src}`}
        alt={img.alt}
        fill
        sizes="120px"
        className={cn("object-contain opacity-60", img.animation)}
        loading="lazy"
      />
    </div>
  );
});

OrnamentItem.propTypes = {
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    left: PropTypes.string,
    top: PropTypes.string,
    z: PropTypes.number.isRequired
  }).isRequired,
  addToGallery: PropTypes.func.isRequired
};

const GaleriSection = ({className}) => {
  const galleryRef = useRef([]);
  const gallerySection = useRef(null);
  const isScrolledRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [breakpoint, setBreakpoint] = useState("lg");
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Animation frame and scroll tracking refs
  const animationFrameRef = useRef(null);
  const lastScrollY = useRef(0);

  // Smooth interpolation helpers
  const roundTransform = useCallback((value) => {
    return Math.round(value * 100) / 100;
  }, []);

  // Add gallery item ref
  const addToGallery = useCallback((el) => {
    if (el && !galleryRef.current.includes(el)) {
      galleryRef.current.push(el);
    }
  }, []);

  // Resolve responsive positions from data file
  const resolvePosition = useCallback(
    (img) => {
      if (!img) return img;
      if (img.positions) {
        const pos =
          img.positions[breakpoint] ||
          img.positions.lg ||
          img.positions.md ||
          img.positions.sm ||
          img.positions.xs ||
          img.positions.xxs;
        return Object.assign({}, img, {left: pos.left, top: pos.top, z: pos.z});
      }
      return img;
    },
    [breakpoint]
  );

  useEffect(() => {
    let isMobileParallax = window.innerWidth < 1024;
    const section = gallerySection.current;

    if (!section) return;

    // Intersection observer for visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {threshold: 0.1}
    );

    observer.observe(section);

    const handleResize = () => {
      isMobileParallax = window.innerWidth < 1024;
    };

    // Optimized scroll handler using RAF
    const onScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (!gallerySection.current) return;

        const currScroll = window.scrollY;

        // Skip very small scroll changes to reduce jitter
        const scrollDelta = Math.abs(currScroll - lastScrollY.current);
        if (scrollDelta < 0.5) return;

        lastScrollY.current = currScroll;

        const rect = gallerySection.current.getBoundingClientRect();
        const elementTop = rect.top + currScroll;

        const topOffset = isMobileParallax ? 0 : 300;
        const bottomOffset = isMobileParallax ? 1200 : 1100;

        const topSection = elementTop + topOffset;
        const bottomSection = elementTop + gallerySection.current.offsetHeight - bottomOffset;

        // Update scroll state
        const newIsScrolled = topSection <= currScroll && currScroll <= bottomSection;
        if (newIsScrolled !== isScrolledRef.current) {
          setIsScrolled(newIsScrolled);
          isScrolledRef.current = newIsScrolled;
        }

        // Show/hide scroll hint based on scroll position
        const scrollThreshold = isMobileParallax ? 20 : 150;
        if (currScroll > elementTop + scrollThreshold) {
          setShowScrollHint(false);
        } else if (currScroll <= elementTop) {
          setShowScrollHint(true);
        }

        // Process each gallery item
        for (const item of galleryRef.current) {
          if (!item) continue;

          const zInit = Number(item.dataset.zinit);
          let result = 0;

          const speedMultiplier = isMobileParallax ? 1.8 : 1.2;
          const endSpeedMultiplier = isMobileParallax ? 1.8 : 1.2;

          if (topSection <= currScroll && currScroll <= bottomSection) {
            const targetZ = Math.min(zInit + speedMultiplier * (currScroll - topSection), 600);
            result = roundTransform(targetZ);
          } else if (currScroll < topSection) {
            result = zInit;
          } else {
            const maxZ = Math.min(zInit + endSpeedMultiplier * (bottomSection - topSection), 600);
            result = roundTransform(maxZ);
          }

          // Apply transform
          const isTextGallery =
            item.dataset.noBlur === "true" &&
            item.classList.contains("text-gallery") &&
            item.dataset.zinit === "50";

          if (isTextGallery) {
            item.style.transform = `translate(-50%, -50%) translate3d(0,0,${result}px)`;
          } else {
            item.style.transform = `translate3d(0,0,${result}px)`;
          }

          // Blur effect
          if (item.dataset.noBlur !== "true") {
            let blurValue = "0px";

            if (result < -400) {
              blurValue = "8px";
            } else if (result < -200) {
              const blurIntensity = (Math.abs(result) / 400) * 4;
              blurValue = `${Math.min(blurIntensity, 4)}px`;
            } else if (result < 0) {
              const blurIntensity = (Math.abs(result) / 200) * 2;
              blurValue = `${Math.min(blurIntensity, 2)}px`;
            }

            item.style.filter = `blur(${blurValue})`;
          } else {
            item.style.filter = "blur(0px)";
          }
        }
      });
    };

    // Use passive listeners for better performance
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", onScroll, {passive: true});

    // Initial call
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [roundTransform]);

  // Breakpoint updater (xxs/xs/sm/md/lg) used to resolve positions
  useEffect(() => {
    const updateBp = () => {
      const w = window.innerWidth;
      setBreakpoint(w >= 1024 ? "lg" : w >= 768 ? "md" : w >= 640 ? "sm" : w >= 480 ? "xs" : "xxs");
    };

    updateBp();
    window.addEventListener("resize", updateBp, {passive: true});
    return () => window.removeEventListener("resize", updateBp);
  }, []);

  return (
    <section ref={gallerySection} id="galeri" className={cn("relative z-10 bg-cream-300", className)}>
      {/* Parallax Content Container */}
      <div className="relative z-10 h-[2500px] w-full lg:h-[3500px]">
        <div className="sticky top-0 h-screen overflow-hidden" style={{perspective: 600}}>
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-cream-200/50 to-cream-300" />

          {/* Ornament images */}
          {ornamentImages.map((img, idx) => (
            <OrnamentItem key={`ornament-${idx}`} img={resolvePosition(img)} addToGallery={addToGallery} />
          ))}

          {/* Gallery images */}
          {galeriImages.map((img, idx) => (
            <GalleryImageItem key={idx} img={resolvePosition(img)} addToGallery={addToGallery} />
          ))}

          {/* Title Card - Intro */}
          <div
            ref={addToGallery}
            className={cn(
              "absolute grid transition duration-500 ease-out text-gallery left-1/2 top-1/2 place-items-center",
              isScrolled ? "opacity-70" : "opacity-100"
            )}
            style={{
              transform: "translate(-50%, -50%) translate3d(0,0,50px)",
              willChange: "transform, filter",
              zIndex: 500
            }}
            data-zinit="50"
            data-no-blur="true"
          >
            {/* Background flower ornaments for Title Card */}
            <div
              className={cn(
                "absolute -z-10 left-[-45px] top-[-95px] sm:left-[-40px] sm:top-[-105px] md:left-[-50px] md:top-[-130px] w-[120px] h-[120px] -rotate-12"
              )}
            >
              <Image src="/assets/bunga-2.webp" alt="Bunga dekor" fill className="object-contain" />
            </div>
            <div className="absolute -z-10 right-[-50px] bottom-[-50px] w-[110px] h-[110px] -rotate-[8deg]">
              <Image src="/assets/bunga-4.webp" alt="Bunga dekor" fill className="object-contain" />
            </div>

            <div
              className={cn(
                "relative -mt-[15%] min-w-[17rem] flex flex-col items-center gap-4 rounded-2xl border-4 border-wine-300 bg-cream-200/95 px-8 py-6 shadow-xl backdrop-blur-sm transition-all duration-300 sm:px-12 sm:py-8 md:px-16 md:py-10"
              )}
            >
              <span className="text-sm text-wine-400 font-plusjakartasans-medium sm:text-base">
                Jelajahi Keindahan
              </span>
              <h2 className="text-3xl text-center text-wine-500 font-auromiya sm:text-4xl md:text-5xl lg:text-6xl">
                Banda Neira
              </h2>
            </div>

            {/* Scroll Indicator */}
            <div
              className={cn(
                "absolute top-[calc(100%+7rem)] lg:top-[calc(100%+2.5rem)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500",
                showScrollHint ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <div className="flex items-center gap-1 animate-pulse">
                {/* Mouse Icon */}
                <LuMouse className="w-6 h-6 text-wine-400" />
                <span className="text-xs text-wine-400 font-plusjakartasans-medium sm:text-[1rem]">
                  Scroll
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                {/* Down Arrow */}
                <svg
                  className="w-4 h-4 text-wine-400 sm:w-5 sm:h-5 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* End Card - CTA */}
          <div
            ref={addToGallery}
            className="absolute z-10 grid transition duration-500 ease-out text-gallery left-1/2 top-1/2 place-items-center"
            style={{
              transform: "translate3d(0,0,0)"
            }}
            data-zinit="-2200"
          >
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "relative flex flex-col items-center justify-center delay-200 gap-6 cursor-pointer group"
              )}
              style={{transform: "translate(-50%, -50%)"}}
            >
              {/* Background flower ornaments for End Card */}
              <div className="absolute -z-10 left-[-70px] top-[-60px] w-[140px] h-[140px] -rotate-[45deg]">
                <Image src="/assets/bunga-4.webp" alt="Bunga dekor" fill className="object-contain" />
              </div>
              <div className="absolute -z-10 right-[-50px] bottom-[-40px] w-[100px] h-[100px]">
                <Image src="/assets/bunga-5.webp" alt="Bunga dekor" fill className="object-contain" />
              </div>
              <div
                className={cn(
                  "flex flex-col min-w-[16rem] items-center gap-2 px-8 py-8 transition-all duration-300 border-4 shadow-xl rounded-2xl border-wine-300 bg-cream-200/95 backdrop-blur-sm sm:px-12 sm:py-10 md:px-12 md:py-8 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-wine-400"
                )}
              >
                <h3 className="text-[1.4rem] text-center text-wine-500 font-auromiya sm:text-2xl md:text-2xl">
                  Siap menjadi bagian dari
                </h3>
                <p className="text-[1.6rem] text-center text-wine-600 font-auromiya sm:text-3xl md:text-3xl">
                  Cerita Neira?
                </p>
                <span className="inline-flex items-center gap-2 px-4 py-2 mt-2 text-[0.7rem] transition-all duration-300 rounded-full shadow-lg bg-wine-500 text-cream-100 group-hover:bg-wine-600 group-hover:shadow-xl font-plusjakartasans-medium">
                  Daftar Sekarang
                  <svg
                    className="w-4 h-4 mt-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

GaleriSection.propTypes = {
  className: PropTypes.string
};

export default GaleriSection;
