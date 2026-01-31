"use client";

import {useEffect, useState, useRef} from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import {cn} from "@/utils/helpers/cn";
import {FiDownload, FiFileText, FiExternalLink} from "react-icons/fi";
import {LuNotebookPen} from "react-icons/lu";
import {IoBookOutline} from "react-icons/io5";
import Link from "next/link";

const documentsData = [
  {
    id: 1,
    title: "Template Surat Izin Orang Tua",
    description: "Surat persetujuan dari orang tua/wali untuk mengikuti program KKN-PPM.",
    icon: <LuNotebookPen className="w-6 h-6" />,
    downloadUrl:
      "https://docs.google.com/document/d/1CcAtQPPjIf9-Y6vcgpg6TA2ITtNpAwerBcop9fPoQWY/edit?usp=share_link",
    color: "rose",
    disabled: true,
    disabledInfo: "Tahap Pendaftaran tidak memerlukan Surat Izin Orang Tua dan Surat Pernyataan Komitmen"
  },
  {
    id: 2,
    title: "Template Surat Pernyataan Komitmen",
    description: "Surat pernyataan kesanggupan mengikuti seluruh rangkaian program KKN-PPM.",
    icon: <LuNotebookPen className="w-6 h-6" />,
    downloadUrl:
      "https://docs.google.com/document/d/13jxtjI7WCM6yJxsPQoZ96HDoiErG4RvEy24D5JzMBKw/edit?usp=sharing",
    color: "teal",
    disabled: true,
    disabledInfo: "Tahap Pendaftaran tidak memerlukan Surat Izin Orang Tua dan Surat Pernyataan Komitmen"
  },
  {
    id: 3,
    title: "Guidebook KKN-PPM Cerita Neira",
    description: "Panduan lengkap pendaftaran program KKN-PPM Cerita Neira.",
    icon: <FiFileText className="w-7 h-7" />,
    downloadUrl: "https://drive.google.com/file/d/1gf0m6uWxbro-F61KrRazMpBOTlpY39CG/view",
    color: "amber",
    featured: true
  }
];

const DocumentCard = ({document, isVisible, index}) => {
  const delay = index * 150;
  const colorClasses = {
    rose: {
      bg: "bg-rose-100",
      icon: "text-rose-500",
      button: "bg-rose-500",
      buttonHover: "group-hover:bg-rose-600 transition all duration-300 delay-300"
    },
    teal: {
      bg: "bg-teal-100",
      icon: "text-teal-500",
      button: "bg-teal-500",
      buttonHover: "group-hover:bg-teal-600 transition all duration-300 delay-300"
    },
    amber: {
      bg: "bg-amber-100",
      icon: "text-amber-400",
      button: "bg-amber-400",
      buttonHover: "group-hover:bg-amber-600 transition all duration-300 delay-300"
    }
  };

  const colors = colorClasses[document.color];
  const isFeatured = document.featured;
  const isDisabled = document.disabled;

  const cardContent = (
    <div
      className={cn(
        "group relative p-6 bg-white rounded-2xl shadow-lg",
        "transform transition-all duration-700 ease-out",
        isDisabled ? "cursor-not-allowed opacity-60" : "hover:shadow-xl hover:-translate-y-2",
        isFeatured && "bg-gradient-to-tr from-amber-50/95 to-white",
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

      {/* Disabled Info */}
      {isDisabled && document.disabledInfo && (
        <div className="p-3 mb-4 text-xs rounded-lg bg-amber-50 text-amber-700 font-plusjakartasans-medium">
          ⚠️ {document.disabledInfo}
        </div>
      )}

      {/* Download Button */}
      <div
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-plusjakartasans-semibold",
          "transition-all duration-300",
          isDisabled ? "opacity-60 cursor-not-allowed" : "",
          colors.button,
          !isDisabled && colors.buttonHover
        )}
      >
        {isFeatured ? <IoBookOutline className="w-4 h-4" /> : <FiDownload className="w-4 h-4" />}
        {isFeatured ? "Baca Guidebook" : "Download Template"}
      </div>
    </div>
  );

  if (isDisabled) {
    return <div className="block">{cardContent}</div>;
  }

  return (
    <Link href={document.downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
      {cardContent}
    </Link>
  );
};

DocumentCard.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    downloadUrl: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    disabledInfo: PropTypes.string
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
      className={cn("relative z-15 min-h-screen overflow-visible bg-neutral-100 py-20 md:py-32", className)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pattern-batik" />

      {/* Floating Decorations */}
      <div
        className="absolute w-24 h-24 bottom-60 left-16 opacity-20"
        style={{
          transform: `translateY(${scrollProgress * 100}px) rotate(${scrollProgress * 75}deg)`
        }}
      >
        <Image src="/assets/bunga-3.webp" alt="" fill sizes="96px" className="object-contain" />
      </div>

      <div
        className="absolute w-20 h-20 top-56 left-10 opacity-20"
        style={{
          transform: `translateY(${-scrollProgress * 200}px) rotate(${scrollProgress * 55}deg)`
        }}
      >
        <Image src="/assets/bunga-5.webp" alt="" fill sizes="80px" className="object-contain" />
      </div>

      <div className="absolute z-10 -bottom-24 animate-spin-slow-reverse right-0 sm:right-[10%] w-44 h-44 opacity-30">
        <Image src="/assets/bunga-4.webp" alt="" fill sizes="176px" className="object-contain" />
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
              "relative ",
              "transform transition-all duration-500 h-full hover:scale-105 lg:shadow-none lg:ring-0 shadow-md shadow-wine-500/50 ring-2 hover:shadow-lg hover:ring-2 ring-wine-500/50 hover:shadow-wine-500/50 rounded-3xl",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            )}
          >
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSdA1OSuUNl5uztTPqgBsJ_3ur9wjd08YAvLDeVEVAwUuBT16g/viewform?usp=send_form"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center h-full p-8 text-center shadow-lg bg-cream-100 rounded-3xl md:p-12"
            >
              {/* QR Code */}
              <div className="relative p-4 mx-auto bg-white shadow-inner w-60 h-60 sm:w-72 sm:h-72 lg:w-64 lg:h-64 xl:w-96 xl:h-96 rounded-2xl">
                <div className="relative w-full h-full bg-white rounded-xl">
                  <Image
                    src="/assets/qr-gform-oprec.svg"
                    alt="QR Code Pendaftaran"
                    fill
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, 384px"
                    className="object-contain p-2"
                  />
                </div>
              </div>

              <h3 className="mb-2 text-xl font-plusjakartasans-bold text-wine-500">Scan untuk Mendaftar</h3>
              <p className="mb-4 text-sm text-neutral-600 font-plusjakartasans-regular">
                Atau klik tombol di bawah ini
              </p>

              <div className="inline-flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105 bg-wine-500 text-cream-100 rounded-xl font-plusjakartasans-semibold hover:bg-wine-600">
                Daftar Sekarang
                <FiExternalLink className="w-4 h-4" />
              </div>
            </Link>
          </div>

          {/* Documents Section */}
          <div
            className={cn(
              "transform transition-all duration-700 delay-300",
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
