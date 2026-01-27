"use client";

import {useRef, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";

// ParallaxSection - Komponen untuk membuat efek parallax pada section
const ParallaxSection = ({children, className, speed = 0.5, direction = "up", id, ...props}) => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Intersection Observer untuk deteksi visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {threshold: 0, rootMargin: "100px"}
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollProgress = -rect.top / window.innerHeight;

      let newOffset;
      switch (direction) {
        case "up":
          newOffset = scrollProgress * speed * 100;
          break;
        case "down":
          newOffset = -scrollProgress * speed * 100;
          break;
        default:
          newOffset = scrollProgress * speed * 100;
      }

      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, speed, direction]);

  return (
    <section ref={sectionRef} id={id} className={cn("relative overflow-hidden", className)} {...props}>
      <div
        className="parallax-element"
        style={{
          transform: `translateY(${offset}px)`
        }}
      >
        {children}
      </div>
    </section>
  );
};

ParallaxSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(["up", "down"]),
  id: PropTypes.string
};

// ParallaxElement - Komponen untuk elemen individual dengan parallax
const ParallaxElement = ({
  children,
  className,
  speed = 0.3,
  direction = "up",
  scale = false,
  rotate = false,
  fade = false,
  ...props
}) => {
  const elementRef = useRef(null);
  const [transform, setTransform] = useState({
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = (elementCenter - viewportCenter) / window.innerHeight;

        let y = 0;
        let scaleValue = 1;
        let rotateValue = 0;
        let opacityValue = 1;

        // Calculate Y offset
        switch (direction) {
          case "up":
            y = distanceFromCenter * speed * 100;
            break;
          case "down":
            y = -distanceFromCenter * speed * 100;
            break;
          case "left":
          case "right":
            y = 0;
            break;
          default:
            y = distanceFromCenter * speed * 100;
        }

        // Scale effect
        if (scale) {
          scaleValue = 1 - Math.abs(distanceFromCenter) * 0.2;
          scaleValue = Math.max(0.8, Math.min(1.1, scaleValue));
        }

        // Rotate effect
        if (rotate) {
          rotateValue = distanceFromCenter * 10;
        }

        // Fade effect
        if (fade) {
          opacityValue = 1 - Math.abs(distanceFromCenter) * 0.5;
          opacityValue = Math.max(0.3, Math.min(1, opacityValue));
        }

        setTransform({
          y,
          scale: scaleValue,
          rotate: rotateValue,
          opacity: opacityValue
        });
      });
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed, direction, scale, rotate, fade]);

  return (
    <div
      ref={elementRef}
      className={cn("parallax-element", className)}
      style={{
        transform: `translateY(${transform.y}px) scale(${transform.scale}) rotate(${transform.rotate}deg)`,
        opacity: transform.opacity
      }}
      {...props}
    >
      {children}
    </div>
  );
};

ParallaxElement.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(["up", "down", "left", "right"]),
  scale: PropTypes.bool,
  rotate: PropTypes.bool,
  fade: PropTypes.bool
};

export {ParallaxSection, ParallaxElement};
