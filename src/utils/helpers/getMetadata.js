export function getMetadata({
  title = "Cerita Neira | KKN-PPM UGM",
  description = "Website resmi KKN-PPM UGM di Banda Neira, Maluku. Bergabunglah bersama kami dalam perjalanan bersejarah di Negeri Pala."
}) {
  return {
    title,
    description,
    metadataBase: new URL("https://ceritaneira.com/"),

    generator: "Next.js",
    applicationName: "Cerita Neira | KKN-PPM UGM",
    keywords: ["KKN", "UGM", "Banda Neira", "Maluku", "Cerita Neira", "KKN-PPM"],

    authors: "Tim Cerita Neira",
    creator: "Tim Cerita Neira",
    publisher: "Tim Cerita Neira",
    category: "Education",
    applicationCategory: "education",
    classification: "Education",
    referrer: "origin-when-cross-origin",

    alternates: {
      canonical: "https://ceritaneira.com/"
    },

    formatDetection: {
      email: false,
      address: false,
      telephone: false
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
        "max-snippet": -1
      }
    },

    // Open Graph metadata
    openGraph: {
      title,
      description,
      url: "https://ceritaneira.com/",
      siteName: "Cerita Neira",
      images: [
        {
          url: `/favicon/android-chrome-512x512.png`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png"
        }
      ],
      locale: "id_ID",
      type: "website"
    },

    // Twitter Card metadata
    twitter: {
      card: "summary",
      title,
      description,
      site: "@ceritaneira",
      creator: "@ceritaneira",
      images: [`/favicon/android-chrome-512x512.png`]
    },

    // Favicon and icon definitions
    icons: {
      icon: [
        {
          url: `/favicon/favicon-16x16.png`,
          sizes: "16x16",
          type: "image/png"
        },
        {
          url: `/favicon/favicon-32x32.png`,
          sizes: "32x32",
          type: "image/png"
        },
        {
          url: `/favicon/android-chrome-512x512.png`,
          sizes: "512x512",
          type: "image/png"
        },
        {url: `/favicon/favicon.ico`}
      ],
      apple: [
        {
          url: `/favicon/apple-touch-icon.png`,
          sizes: "180x180",
          type: "image/png"
        }
      ],
      shortcut: [{url: `/favicon/favicon.ico`}],
      other: [
        {
          rel: "android-chrome-192x192",
          url: `/favicon/android-chrome-192x192.png`,
          sizes: "192x192"
        },
        {
          rel: "android-chrome-512x512",
          url: `/favicon/android-chrome-512x512.png`,
          sizes: "512x512"
        }
      ]
    },

    manifest: `/favicon/site.webmanifest`,
    other: {
      "mobile-web-app-capable": "yes"
    }
  };
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalEvent",
  name: "KKN-PPM UGM — Cerita Neira",
  description:
    "Program KKN-PPM Universitas Gadjah Mada di Banda Neira, Maluku. Situs ini mendokumentasikan kegiatan pengabdian masyarakat, cerita lapangan, dan hasil kolaborasi antara mahasiswa UGM dan komunitas lokal selama program KKN-PPM.",
  url: "https://ceritaneira.com/",
  organizer: {
    "@type": "EducationalOrganization",
    name: "KKN-PPM Universitas Gadjah Mada",
    url: "https://www.ugm.ac.id/"
  },
  location: {
    "@type": "Place",
    name: "Banda Neira",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Banda Neira",
      addressRegion: "Maluku",
      addressCountry: "ID"
    }
  },
  image: ["/favicon/android-chrome-512x512.png"],
  audience: {
    "@type": "Audience",
    audienceType: "Masyarakat lokal, Mahasiswa, Pengunjung situs"
  },
  keywords: ["KKN", "KKN-PPM", "Cerita Neira", "UGM", "Banda Neira"]
};
