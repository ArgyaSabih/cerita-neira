"use client";

import {useRef, useState, useEffect} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";
import {FiInstagram, FiMail, FiMapPin, FiPhone, FiYoutube} from "react-icons/fi";
import {PiTiktokLogo} from "react-icons/pi";

const socialLinks = [
  {
    id: 1,
    name: "Instagram",
    icon: <FiInstagram />,
    url: "https://www.instagram.com/cerita.neira"
  },
  {id: 2, name: "TikTok", icon: <PiTiktokLogo />, url: "https://www.tiktok.com/@cerita.neira"}
];

const quickLinks = [
  {id: 1, name: "Beranda", href: "#beranda"},
  {id: 2, name: "Tentang Kami", href: "#tentang"},
  {id: 3, name: "Timeline", href: "#timeline"},
  {id: 4, name: "Rekrutmen", href: "#rekrutmen"},
  {id: 5, name: "Galeri", href: "#galeri"}
];

const Footer = ({className}) => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {threshold: 0.1}
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

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
  };

  return (
    <footer ref={footerRef} className={cn("relative bg-wine-600 text-cream-100 overflow-hidden", className)}>
      {/* Decorative Wave Top */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="#FFF8F1"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 35C672 40 768 50 864 50C960 50 1056 40 1152 35C1248 30 1344 30 1392 30L1440 30V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z"
            fill="#FFF8F1"
          />
        </svg>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pattern-batik" />

      {/* Decorative Elements */}
      <div className="absolute w-20 h-20 top-20 right-10 opacity-10">
        <Image src="/assets/bunga-1.webp" alt="" fill sizes="80px" className="object-contain" />
      </div>
      <div className="absolute w-16 h-16 bottom-20 left-10 opacity-10">
        <Image src="/assets/bunga-3.webp" alt="" fill sizes="64px" className="object-contain" />
      </div>

      {/* Main Footer Content */}
      <div className="container relative z-10 px-4 pt-24 pb-8 mx-auto md:px-8 lg:px-16">
        <div className="grid gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div
            className={cn(
              "lg:col-span-2",
              "transform transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="mb-4 text-4xl font-auromiya md:text-5xl text-cream-100">
              Cerita <span className="text-teal-400">Neira</span>
            </h2>
            <p className="max-w-md mb-6 text-cream-200 font-plusjakartasans-regular">
              KKN-PPM UGM 2026 Desa Rajawali & Desa TanaRatah, Kec. Banda, Maluku Tengah.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-cream-100/10 text-cream-100 hover:bg-teal-500"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={cn(
              "transform transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h3 className="mb-4 text-lg font-plusjakartasans-bold">Navigasi</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="transition-colors cursor-pointer text-cream-200 hover:text-teal-400 font-plusjakartasans-regular"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className={cn(
              "transform transition-all duration-700 delay-400",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h3 className="mb-4 text-lg font-plusjakartasans-bold">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-cream-200 font-plusjakartasans-regular">
                  Kecamatan Banda, Kabupaten Maluku Tengah, Provinsi Maluku, Indonesia.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="flex-shrink-0 w-5 h-5 text-teal-400" />
                <a
                  href="mailto:cerita.neira@gmail.com"
                  className="text-sm transition-colors text-cream-200 hover:text-teal-400 font-plusjakartasans-regular"
                >
                  cerita.neira@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="flex-shrink-0 w-5 h-5 text-teal-400" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-cream-200 font-plusjakartasans-regular">
                    Saintek & Soshum:
                  </span>
                  <span className="text-sm text-cream-200 font-plusjakartasans-regular">
                    {"+62 895-3103-3551\u00A0\u00A0\u00A0(Nadia)"}
                  </span>
                  <span className="text-sm text-cream-200 font-plusjakartasans-regular">Agro & Medika:</span>
                  <span className="text-sm text-cream-200 font-plusjakartasans-regular">
                    {"+62 819-4967-6325\u00A0\u00A0\u00A0(Denna)"}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-cream-100/10">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <p className="text-sm text-center text-cream-300 font-plusjakartasans-regular">
              © 2026 Cerita Neira - KKN-PPM UGM. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
