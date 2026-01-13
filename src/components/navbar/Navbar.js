"use client";

import {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";
import {FiMenu, FiX} from "react-icons/fi";

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
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        isScrolled ? "bg-cream-100/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5",
        className
      )}
    >
      <div className="container px-4 mx-auto md:px-8 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-2xl font-auromiya md:text-3xl"
          >
            <span className={cn(isScrolled ? "text-wine-500" : "text-wine-500")}>Cerita</span>
            <span className={cn(isScrolled ? "text-teal-500" : "text-teal-500")}>Neira</span>
          </a>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "relative font-plusjakartasans-medium text-sm transition-colors duration-300",
                  "hover:text-teal-500",
                  activeSection === link.href.replace("#", "")
                    ? isScrolled
                      ? "text-teal-500"
                      : "text-teal-400"
                    : isScrolled
                    ? "text-wine-600"
                    : "text-wine-500"
                )}
              >
                {link.name}
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#rekrutmen"
            onClick={(e) => handleNavClick(e, "#rekrutmen")}
            className={cn(
              "hidden md:inline-flex items-center px-5 py-2 rounded-full font-plusjakartasans-semibold text-sm transition-all duration-300",
              isScrolled
                ? "bg-wine-500 text-cream-100 hover:bg-wine-600"
                : "bg-cream-100 text-wine-500 hover:bg-cream-200"
            )}
          >
            Daftar Sekarang
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-wine-500" : "text-wine-500"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 top-full bg-cream-100/95 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container px-4 py-4 mx-auto">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "py-2 px-4 rounded-lg font-plusjakartasans-medium transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "bg-teal-100 text-teal-600"
                      : "text-wine-600 hover:bg-cream-200"
                  )}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#rekrutmen"
                onClick={(e) => handleNavClick(e, "#rekrutmen")}
                className="px-4 py-3 mt-2 text-center transition-colors bg-wine-500 text-cream-100 rounded-xl font-plusjakartasans-semibold hover:bg-wine-600"
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
