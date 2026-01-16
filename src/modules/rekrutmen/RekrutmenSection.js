"use client";

import {useEffect, useState, useRef} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";
import {FiDownload, FiFileText, FiCheckCircle, FiExternalLink} from "react-icons/fi";

const documentsData = [
  {
    id: 1,
    title: "Template Surat Izin Orang Tua",
    description: "Surat persetujuan dari orang tua/wali untuk mengikuti program KKN-PPM di Banda Neira.",
    icon: <FiFileText className="w-6 h-6" />,
    downloadUrl: "#",
    color: "rose"
  },
  {
    id: 2,
    title: "Template Surat Pernyataan Komitmen",
    description: "Surat pernyataan kesanggupan mengikuti seluruh rangkaian program KKN-PPM.",
    icon: <FiCheckCircle className="w-6 h-6" />,
    downloadUrl: "#",
    color: "teal"
  }
];

const DocumentCard = ({document, isVisible, index}) => {
  const delay = index * 200;
  const colorClasses = {
    rose: {
      bg: "bg-rose-100",
      icon: "text-rose-500",
      button: "bg-rose-500 hover:bg-rose-600"
    },
    teal: {
      bg: "bg-teal-100",
      icon: "text-teal-500",
      button: "bg-teal-500 hover:bg-teal-600"
    }
  };

  const colors = colorClasses[document.color];

  return (
    <div
      className={cn(
        "group relative p-6 bg-white rounded-2xl shadow-lg",
        "transform transition-all duration-700 ease-out",
        "hover:shadow-xl hover:-translate-y-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{transitionDelay: `${delay}ms`}}
    >
      {/* Icon */}
      <div
        className={cn(
          "inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4",
          colors.bg,
          colors.icon
        )}
      >
        {document.icon}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-plusjakartasans-bold text-wine-600">{document.title}</h3>

      {/* Description */}
      <p className="mb-4 text-sm text-neutral-600 font-plusjakartasans-regular">{document.description}</p>

      {/* Download Button */}
      <a
        href={document.downloadUrl}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-plusjakartasans-semibold",
          "transition-all duration-300",
          colors.button
        )}
      >
        <FiDownload className="w-4 h-4" />
        Download Template
      </a>
    </div>
  );
};

DocumentCard.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    downloadUrl: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
};

const RekrutmenSection = ({className}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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
      {threshold: 0.1}
    );

    observer.observe(section);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrolled = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / (rect.height + viewportHeight)));
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
      id="rekrutmen"
      className={cn(
        "relative min-h-screen bg-gradient-to-b from-neutral-100 via-cream-200 to-cream-300 py-20 md:py-32",
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pattern-batik" />

      {/* Floating Decorations */}
      <div
        className="absolute w-24 h-24 bottom-20 right-20 opacity-20"
        style={{
          transform: `translateY(${scrollProgress * 100}px) rotate(${scrollProgress * 75}deg)`
        }}
      >
        <Image src="/assets/bunga-3.webp" alt="" fill className="object-contain" />
      </div>

      <div
        className="absolute w-20 h-20 top-56 left-10 opacity-20"
        style={{
          transform: `translateY(${-scrollProgress * 200}px) rotate(${scrollProgress * 55}deg)`
        }}
      >
        <Image src="/assets/bunga-5.webp" alt="" fill className="object-contain" />
      </div>

      <div className="absolute z-10 -bottom-24 animate-spin-slow-reverse left-32 w-44 h-44 opacity-30">
        <Image src="/assets/bunga-4.webp" alt="" fill className="object-contain" />
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
            Bergabung Bersama Kami
          </span>
          <h2 className="mb-4 text-4xl font-auromiya sm:text-5xl md:text-6xl text-wine-500">
            Rekrutmen Terbuka
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 font-plusjakartasans-regular">
            Jadilah bagian dari perjalanan bersejarah di Negeri Pala. Daftarkan dirimu sekarang!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* QR Code Section */}
          <div
            className={cn(
              "relative",
              "transform transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            )}
          >
            <div className="p-8 text-center shadow-2xl bg-cream-100 rounded-3xl md:p-12">
              {/* QR Code Placeholder */}
              <div className="relative w-48 h-48 p-4 mx-auto mb-6 bg-white shadow-inner md:w-64 md:h-64 rounded-2xl">
                {/* QR Code SVG Placeholder */}
                <div className="flex items-center justify-center w-full h-full bg-neutral-100 rounded-xl">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    {/* Simple QR-like pattern */}
                    <rect x="10" y="10" width="20" height="20" fill="#7B1F59" />
                    <rect x="70" y="10" width="20" height="20" fill="#7B1F59" />
                    <rect x="10" y="70" width="20" height="20" fill="#7B1F59" />
                    <rect x="15" y="15" width="10" height="10" fill="white" />
                    <rect x="75" y="15" width="10" height="10" fill="white" />
                    <rect x="15" y="75" width="10" height="10" fill="white" />
                    <rect x="18" y="18" width="4" height="4" fill="#7B1F59" />
                    <rect x="78" y="18" width="4" height="4" fill="#7B1F59" />
                    <rect x="18" y="78" width="4" height="4" fill="#7B1F59" />
                    {/* Random QR pattern */}
                    <rect x="35" y="10" width="5" height="5" fill="#7B1F59" />
                    <rect x="45" y="10" width="5" height="5" fill="#7B1F59" />
                    <rect x="55" y="10" width="5" height="5" fill="#7B1F59" />
                    <rect x="35" y="20" width="5" height="5" fill="#7B1F59" />
                    <rect x="50" y="20" width="5" height="5" fill="#7B1F59" />
                    <rect x="40" y="35" width="20" height="20" fill="#7B1F59" />
                    <rect x="45" y="40" width="10" height="10" fill="white" />
                    <rect x="48" y="43" width="4" height="4" fill="#7B1F59" />
                    <rect x="35" y="60" width="5" height="5" fill="#7B1F59" />
                    <rect x="45" y="65" width="5" height="5" fill="#7B1F59" />
                    <rect x="55" y="60" width="5" height="5" fill="#7B1F59" />
                    <rect x="70" y="40" width="5" height="5" fill="#7B1F59" />
                    <rect x="80" y="45" width="5" height="5" fill="#7B1F59" />
                    <rect x="10" y="40" width="5" height="5" fill="#7B1F59" />
                    <rect x="20" y="50" width="5" height="5" fill="#7B1F59" />
                    <rect x="70" y="70" width="20" height="20" fill="#46ABB7" />
                    <rect x="75" y="75" width="10" height="10" fill="white" />
                    <rect x="78" y="78" width="4" height="4" fill="#46ABB7" />
                  </svg>
                </div>
              </div>

              <h3 className="mb-2 text-xl font-plusjakartasans-bold text-wine-500">Scan untuk Mendaftar</h3>
              <p className="mb-4 text-sm text-neutral-600 font-plusjakartasans-regular">
                Atau klik tombol di bawah ini
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 transition-colors bg-wine-500 text-cream-100 rounded-xl font-plusjakartasans-semibold hover:bg-wine-600"
              >
                Daftar Sekarang
                <FiExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Documents Section */}
          <div
            className={cn(
              "transform transition-all duration-700 delay-400",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            )}
          >
            <h3 className="mb-2 text-2xl font-plusjakartasans-bold text-wine-600">Dokumen yang Diperlukan</h3>
            <p className="mb-6 text-neutral-600 font-plusjakartasans-regular">
              Unduh template dokumen berikut dan lengkapi sebelum mendaftar
            </p>

            <div className="space-y-4">
              {documentsData.map((doc, index) => (
                <DocumentCard key={doc.id} document={doc} isVisible={isVisible} index={index} />
              ))}
            </div>

            {/* Additional Info */}
            <div className="p-4 mt-8 bg-wine-500/10 rounded-xl">
              <h4 className="mb-2 font-plusjakartasans-semibold text-wine-600">📌 Informasi Penting</h4>
              <ul className="space-y-1 text-sm text-neutral-600 font-plusjakartasans-regular">
                <li>• Pendaftaran dibuka hingga 31 Januari 2026</li>
                <li>• Pastikan semua dokumen sudah lengkap</li>
                <li>• Perhatikan persyaratan khusus di formulir</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

RekrutmenSection.propTypes = {
  className: PropTypes.string
};

export default RekrutmenSection;
