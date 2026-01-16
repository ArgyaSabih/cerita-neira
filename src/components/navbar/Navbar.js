"use client";

import {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";
import Image from "next/image";

const navLinks = [
  {id: 1, name: "Home", href: "#home"},
  {id: 2, name: "Tentang", href: "#tentang"},
  {id: 3, name: "Timeline", href: "#timeline"},
  {id: 4, name: "Rekrutmen", href: "#rekrutmen"},
  {id: 5, name: "Galeri", href: "#galeri"},
  {id: 6, name: "Sponsor", href: "#sponsor"}
];

const Navbar = ({className}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

      // Custom smooth scroll with easing animation
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 800;
      let startTime = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
    if (isMobileMenuOpen) {
      setTimeout(() => setIsMobileMenuOpen(false), 350);
    }
  };

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-4 z-[100] transition-all duration-500 ease-out",
        isScrolled ? "px-4 md:px-8 lg:px-16" : "top-4 px-4",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-out py-3",
          isScrolled
            ? "max-w-[1200px] bg-cream-100 backdrop-blur-sm shadow-xl drop-shadow-lg rounded-full px-6"
            : "container px-4 md:px-8 lg:px-16",
          isMobileMenuOpen
            ? "max-w-[1200px] bg-cream-100 backdrop-blur-sm shadow-xl drop-shadow-lg rounded-full px-6"
            : ""
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="relative flex items-center h-full gap-2 text-2xl transition-all duration-300 font-auromiya md:text-3xl"
          >
            <Image
              src="/favicon/android-chrome-192x192.png"
              alt="Cerita Neira logo"
              width={100}
              height={100}
              className={cn("w-10 h-10 md:w-12 md:h-12 rounded-full object-cover")}
            />
            <div className="relative flex items-center gap-1 mt-2">
              <div
                className={cn(
                  isScrolled ? "text-wine-500" : isMobileMenuOpen ? "text-wine-500" : "text-cream-100"
                )}
              >
                Cerita
              </div>
              <div
                className={cn(
                  isScrolled ? "text-teal-500" : isMobileMenuOpen ? "text-teal-500" : "text-teal-600"
                )}
              >
                Neira
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="flex justify-end gap-8">
            <div className="items-center hidden gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative font-plusjakartasans-medium text-sm transition-all duration-300",
                    isScrolled ? "hover:text-teal-600" : "hover:text-teal-600 text-cream-100",
                    activeSection === link.href.replace("#", "") ? "text-teal-600" : ""
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-500 ease-out",
                      activeSection === link.href.replace("#", "")
                        ? "bg-teal-600 w-full opacity-100"
                        : "w-0 opacity-0"
                    )}
                  />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#rekrutmen"
              onClick={(e) => handleNavClick(e, "#rekrutmen")}
              className={cn(
                "hidden lg:inline-flex items-center px-5 py-2 rounded-full font-plusjakartasans-semibold text-sm transition-all duration-300",
                isScrolled
                  ? "bg-wine-500 text-cream-100 hover:bg-wine-400 hover:scale-105"
                  : "bg-wine-500 text-cream-100 hover:bg-wine-400"
              )}
            >
              Daftar Sekarang
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "p-1.5 rounded-lg transition-colors relative flex aspect-square w-[1.3rem] flex-col items-center justify-center gap-1 sm:h-[4vw] sm:w-[3vw] md:w-6 md:gap-1.5 lg:hidden cursor-pointer"
            )}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "h-0.5 w-full transition-all bg-cream-100 duration-300",
                isScrolled ? "bg-wine-500" : "bg-cream-100",
                isMobileMenuOpen
                  ? "absolute top-0 right-0 bottom-0 left-0 bg-wine-500 m-auto opacity-0"
                  : "relative opacity-100"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-full transition-all duration-500",
                isScrolled ? "bg-wine-500" : "bg-cream-100",
                isMobileMenuOpen
                  ? "absolute top-0 bg-wine-500 right-0 bottom-0 left-0 m-auto rotate-315"
                  : "relative"
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-full bg-cream-100 transition-all duration-500",
                isScrolled ? "bg-wine-500" : "bg-cream-100",
                isMobileMenuOpen
                  ? "top-0 right-0 bottom-0 bg-wine-500 left-0 m-auto rotate-45 opacity-100"
                  : "opacity-100"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-full bg-cream-100 transition-all duration-300",
                isScrolled ? "bg-wine-500" : "bg-cream-100",
                isMobileMenuOpen ? "absolute bg-wine-500 opacity-0" : "relative opacity-100"
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute left-0 right-0 transition-all duration-400 overflow-hidden",
            "top-full mt-2 mx-2 bg-cream-100 backdrop-blur-sm rounded-2xl shadow-xl drop-shadow-2xl border border-wine-200",
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 py-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "py-2 px-4 rounded-lg font-plusjakartasans-medium transition-all duration-300",
                    activeSection === link.href.replace("#", "")
                      ? "bg-teal-100 text-teal-600"
                      : "text-wine-500 hover:bg-wine-50"
                  )}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#rekrutmen"
                onClick={(e) => handleNavClick(e, "#rekrutmen")}
                className={cn(
                  "px-4 py-3 mt-2 text-center transition-colors rounded-xl font-plusjakartasans-semibold",
                  "bg-wine-500 text-cream-100 hover:bg-wine-400"
                )}
              >
                Daftar Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  className: PropTypes.string
};

export default Navbar;
