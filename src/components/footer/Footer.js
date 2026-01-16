"use client";

import {useRef, useState, useEffect} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";
import {FiInstagram, FiTwitter, FiMail, FiMapPin, FiPhone, FiYoutube} from "react-icons/fi";

const socialLinks = [
  {id: 1, name: "Instagram", icon: <FiInstagram />, url: "https://instagram.com/ceritaneira"},
  {id: 2, name: "Twitter", icon: <FiTwitter />, url: "https://twitter.com/ceritaneira"},
  {id: 3, name: "YouTube", icon: <FiYoutube />, url: "https://youtube.com/@ceritaneira"},
  {id: 4, name: "Email", icon: <FiMail />, url: "mailto:ceritaneira@ugm.ac.id"}
];

const quickLinks = [
  {id: 1, name: "Tentang Kami", href: "#tentang"},
  {id: 2, name: "Timeline", href: "#timeline"},
  {id: 3, name: "Rekrutmen", href: "#rekrutmen"},
  {id: 4, name: "Galeri", href: "#galeri"},
  {id: 5, name: "Sponsor", href: "#sponsor"}
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

  return (
    <footer ref={footerRef} className={cn("relative bg-wine-600 text-cream-100 overflow-hidden", className)}>
      {/* Decorative Wave Top */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
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
        <Image src="/assets/bunga-1.webp" alt="" fill className="object-contain" />
      </div>
      <div className="absolute w-16 h-16 bottom-20 left-10 opacity-10">
        <Image src="/assets/bunga-3.webp" alt="" fill className="object-contain" />
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
              KKN-PPM UGM 2026 di Banda Neira, Maluku. Bersama-sama menulis cerita untuk Negeri Pala,
              melestarikan budaya dan memberdayakan potensi lokal.
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
                    className="transition-colors text-cream-200 hover:text-teal-400 font-plusjakartasans-regular"
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
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-cream-200 font-plusjakartasans-regular">
                  Universitas Gadjah Mada, Yogyakarta, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="flex-shrink-0 w-5 h-5 text-teal-400" />
                <a
                  href="mailto:ceritaneira@ugm.ac.id"
                  className="text-sm transition-colors text-cream-200 hover:text-teal-400 font-plusjakartasans-regular"
                >
                  ceritaneira@ugm.ac.id
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="flex-shrink-0 w-5 h-5 text-teal-400" />
                <span className="text-sm text-cream-200 font-plusjakartasans-regular">+62 xxx xxxx xxxx</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-cream-100/10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-center text-cream-300 font-plusjakartasans-regular md:text-left">
              © 2026 Cerita Neira - KKN-PPM UGM. All rights reserved.
            </p>
            <p className="text-sm text-cream-300 font-plusjakartasans-regular">
              Made with ❤️ by Tim Cerita Neira
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
