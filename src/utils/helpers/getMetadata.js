export function getMetadata({
  title = "PIONIR Gadjah Mada 2025",
  description = 'PIONIR Gadjah Mada merupakan kegiatan pembelajaran, pengenalan, penggalian potensi, dan orientasi untuk mendidik calon pemimpin muda yang memiliki visi seiring dengan nilai-nilai ke-UGM-an. Melalui tema \"Eksplorasi Gadjah Mada, Gemilang Emas Indonesia\", Gadjah Mada Muda diharapkan dapat menjadi pribadi yang memiliki rasa daya saing tinggi dan semangat kolaboratif untuk menjadi generasi yang unggul.',
}) {
  return {
    title,
    description,
    metadataBase: new URL("https://pionir.ugm.ac.id/2025/"),

    generator: "Next.js",
    applicationName: "PIONIR Gadjah Mada 2025",
    keywords: [
      "PIONIR Gadjah Mada 2025",
      "PPSMB",

      "Universitas Gadjah Mada",
      "PIONIR 2025",
      "Kontribusi Gadjah Mada Muda",
      "Gemilang Cita Indonesia",
      "PIONIRPEDIA",
      "KEMBARA LOKA",
      "Kelana Nusa Talenta",
      "Aktivitas",
      "Kegiatan",
      "Notifikasi",
      "Grha Sabha Pramana",
      "Palopo",
      "Palupi",
      "Palopi",
      "pendaftaran mahasiswa baru UGM 2025",
      "program pengenalan kehidupan kampus",
      "Pelatihan Pembelajar Sukses bagi Mahasiswa Baru",
      "2025",
      "PIONIR",
      "Gadjah Mada",
      "UGM",
      "PIONIR Universitas",
      "PIONIR Fakultas",
      "PIONIR UKM",
      "Action Plan",
      "PIONIR Softskill",
      "Selebrasi",
      "Formasi PIONIR",
      "IT PIONIR",
    ],

    authors: "IT PIONIR Gadjah Mada 2025",
    creator: "HumPubIT PIONIR Gadjah Mada 2025",
    publisher: "PIONIR Gadjah Mada 2025",

    category: "Education",
    applicationCategory: "education",
    classification: "Education",
    referrer: "origin-when-cross-origin",

    alternates: {
      canonical: "https://pionir.ugm.ac.id/2025/",
    },

    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // Robots meta tag
    robots: {
      index: true, // Allow indexing
      follow: true, // Allow link-following
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Open Graph metadata
    openGraph: {
      title,
      description,
      url: "https://pionir.ugm.ac.id/2025/",
      siteName: "PIONIR Gadjah Mada",
      images: [
        {
          url: `/2025/assets/favicon/android-chrome-512x512.png`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
      locale: "id_ID",
      type: "website",
    },

    // Twitter Card metadata
    twitter: {
      card: "summary",
      title,
      description,
      site: "@pionirugm",
      creator: "@pionirugm",
      images: [`/2025/assets/favicon/android-chrome-512x512.png`],
    },

    // Favicon and icon definitions
    icons: {
      icon: [
        {
          url: `/2025/assets/favicon/favicon-16x16.png`,
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: `/2025/assets/favicon/favicon-32x32.png`,
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: `/2025/assets/favicon/android-chrome-512x512.png`,
          sizes: "512x512",
          type: "image/png",
        },
        { url: `/2025/assets/favicon/favicon.ico` },
      ],
      apple: [
        {
          url: `/2025/assets/favicon/apple-touch-icon.png`,
          sizes: "180x180",
          type: "image/png",
        },
      ],
      shortcut: [{ url: `/2025/assets/favicon/favicon.ico` }],
      other: [
        {
          rel: "android-chrome-192x192",
          url: `/2025/assets/favicon/android-chrome-192x192.png`,
          sizes: "192x192",
        },
        {
          rel: "android-chrome-512x512",
          url: `/2025/assets/favicon/android-chrome-512x512.png`,
          sizes: "512x512",
        },
      ],
    },

    manifest: `/2025/assets/favicon/site.webmanifest`,
    other: {
      "mobile-web-app-capable": "yes",
    },
    verification: {
      google: "pCUfPuJvwW8VI4mok5IgieBCEGSjr1fKp5oeS8cLBlc",
      other: {
        "google-site-verification": "pCUfPuJvwW8VI4mok5IgieBCEGSjr1fKp5oeS8cLBlc",
      },
    },
  };
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalEvent",
  name: "PIONIR Gadjah Mada 2025",
  description:
    'PIONIR Gadjah Mada merupakan kegiatan pembelajaran, pengenalan, penggalian potensi, dan orientasi untuk mendidik calon pemimpin muda yang memiliki visi seiring dengan nilai-nilai ke-UGM-an. Melalui tema "Eksplorasi Gadjah Mada, Gemilang Emas Indonesia", Gadjah Mada Muda diharapkan dapat menjadi pribadi yang memiliki rasa daya saing tinggi dan semangat kolaboratif untuk menjadi generasi yang unggul.',
  organizer: {
    "@type": "EducationalOrganization",
    name: "Universitas Gadjah Mada",
  },
  location: {
    "@type": "Place",
    name: "Universitas Gadjah Mada",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bulaksumur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta",
      addressLocality: "Sleman",
      addressRegion: "DI Yogyakarta",
      postalCode: "55281",
      addressCountry: "ID",
    },
  },
};
