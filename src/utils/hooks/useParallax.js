"use client";

import {createContext, useContext, useEffect, useState, useCallback, useRef} from "react";
import PropTypes from "prop-types";

/**
 * ParallaxContext - Context untuk menyediakan data scroll ke seluruh aplikasi
 */
const ParallaxContext = createContext({
  scrollY: 0,
  scrollProgress: 0,
  viewportHeight: 0,
  documentHeight: 0
});

/**
 * useParallax - Custom hook untuk mengakses parallax context
 * @returns {Object} - scrollY, scrollProgress, viewportHeight, documentHeight
 */
export const useParallax = () => {
  const context = useContext(ParallaxContext);
  if (!context) {
    throw new Error("useParallax must be used within ParallaxProvider");
  }
  return context;
};

/**
 * ParallaxProvider - Provider component untuk parallax scrolling
 */
export const ParallaxProvider = ({children}) => {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollProgress: 0,
    viewportHeight: 0,
    documentHeight: 0
  });

  const rafRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      // Only update if scroll position changed significantly
      if (Math.abs(currentScrollY - lastScrollY.current) > 0.5) {
        lastScrollY.current = currentScrollY;
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - viewportHeight;
        const scrollProgress = documentHeight > 0 ? currentScrollY / documentHeight : 0;

        setScrollData({
          scrollY: currentScrollY,
          scrollProgress: Math.min(scrollProgress, 1),
          viewportHeight,
          documentHeight
        });
      }
    });
  }, []);

  useEffect(() => {
    // Initial values
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - viewportHeight;

    setScrollData({
      scrollY: window.scrollY,
      scrollProgress: documentHeight > 0 ? window.scrollY / documentHeight : 0,
      viewportHeight,
      documentHeight
    });

    window.addEventListener("scroll", handleScroll, {passive: true});
    window.addEventListener("resize", handleScroll, {passive: true});

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return <ParallaxContext.Provider value={scrollData}>{children}</ParallaxContext.Provider>;
};

ParallaxProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ParallaxProvider;
