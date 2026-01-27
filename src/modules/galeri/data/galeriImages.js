export const galeriImages = [
  // Layer 1: Foreground (closest to viewer)
  {
    src: "galeri/01.webp",
    alt: "Banda Neira View",
    positions: {
      xxs: {left: "-7%", top: "22%", z: -80},
      xs: {left: "2%", top: "22%", z: -80},
      sm: {left: "5%", top: "22%", z: -80},
      md: {left: "6%", top: "16%", z: -100},
      lg: {left: "10%", top: "15%", z: -120}
    }
  },
  {
    src: "galeri/02.webp",
    alt: "Tentang Banda Neira",
    positions: {
      xxs: {left: "68%", top: "28%", z: -140},
      xs: {left: "68%", top: "28%", z: -140},
      sm: {left: "68%", top: "28%", z: -140},
      md: {left: "70%", top: "26%", z: -180},
      lg: {left: "72%", top: "24%", z: -200}
    }
  },

  // Layer 2: Near-mid
  {
    src: "galeri/03.webp",
    alt: "Panorama Banda",
    positions: {
      xxs: {left: "72%", top: "68%", z: -360},
      xs: {left: "72%", top: "68%", z: -360},
      sm: {left: "72%", top: "68%", z: -360},
      md: {left: "75%", top: "66%", z: -420},
      lg: {left: "76%", top: "64%", z: -460}
    }
  },
  {
    src: "galeri/04.webp",
    alt: "Keindahan Banda",
    positions: {
      xxs: {left: "-11%", top: "62%", z: -480},
      xs: {left: "4%", top: "62%", z: -480},
      sm: {left: "12%", top: "62%", z: -480},
      md: {left: "15%", top: "70%", z: -550},
      lg: {left: "18%", top: "68%", z: -600}
    }
  },

  // Layer 3: Mid layer
  {
    src: "galeri/05.webp",
    alt: "Pemandangan Neira",
    positions: {
      xxs: {left: "-13%", top: "32%", z: -680},
      xs: {left: "2%", top: "32%", z: -680},
      sm: {left: "10%", top: "32%", z: -680},
      md: {left: "8%", top: "30%", z: -750},
      lg: {left: "4%", top: "28%", z: -820}
    }
  },
  {
    src: "galeri/06.webp",
    alt: "Warisan Banda",
    positions: {
      xxs: {left: "78%", top: "42%", z: -820},
      xs: {left: "78%", top: "42%", z: -820},
      sm: {left: "78%", top: "42%", z: -820},
      md: {left: "80%", top: "40%", z: -900},
      lg: {left: "82%", top: "38%", z: -980}
    }
  },

  // Layer 4: Mid-far layer
  {
    src: "galeri/07.webp",
    alt: "Cakrawala Banda",
    positions: {
      xxs: {left: "64%", top: "77%", z: -980},
      xs: {left: "64%", top: "77%", z: -980},
      sm: {left: "64%", top: "77%", z: -980},
      md: {left: "65%", top: "75%", z: -1100},
      lg: {left: "66%", top: "73%", z: -1250}
    }
  },
  {
    src: "galeri/08.webp",
    alt: "Pesona Neira",
    positions: {
      xxs: {left: "-3%", top: "22%", z: -1150},
      xs: {left: "8%", top: "22%", z: -1150},
      sm: {left: "18%", top: "22%", z: -1150},
      md: {left: "20%", top: "20%", z: -1300},
      lg: {left: "22%", top: "18%", z: -1450}
    }
  },

  // Layer 5: Far layer
  {
    src: "galeri/09.webp",
    alt: "Langit Banda",
    positions: {
      xxs: {left: "74%", top: "26%", z: -1380},
      xs: {left: "74%", top: "26%", z: -1380},
      sm: {left: "74%", top: "26%", z: -1380},
      md: {left: "75%", top: "25%", z: -1500},
      lg: {left: "76%", top: "24%", z: -1650}
    }
  },
  {
    src: "galeri/10.webp",
    alt: "Keajaiban Neira",
    positions: {
      xxs: {left: "-12%", top: "30%", z: -1550},
      xs: {left: "4%", top: "30%", z: -1550},
      sm: {left: "12%", top: "30%", z: -1550},
      md: {left: "10%", top: "55%", z: -1700},
      lg: {left: "8%", top: "52%", z: -1850}
    }
  },

  // Layer 6: Background layer (furthest)
  {
    src: "galeri/11.webp",
    alt: "Horison Banda",
    positions: {
      xxs: {left: "58%", top: "62%", z: -1800},
      xs: {left: "58%", top: "62%", z: -1800},
      sm: {left: "58%", top: "62%", z: -1800},
      md: {left: "60%", top: "60%", z: -1900},
      lg: {left: "62%", top: "58%", z: -2000}
    }
  }
];

export const ornamentImages = [
  // Spinning flower on far left
  {
    src: "bunga-1.webp",
    alt: "Bunga Berputar",
    positions: {
      xxs: {left: "-2%", top: "28%", z: -1200},
      xs: {left: "4%", top: "28%", z: -1200},
      sm: {left: "12%", top: "28%", z: -1200},
      md: {left: "11%", top: "26%", z: -1700},
      lg: {left: "10%", top: "25%", z: -2100}
    },
    animation: "animate-spin-slow scale-200",
    skew: true
  },

  // Near-mid ornaments
  {
    src: "bunga-2.webp",
    alt: "Bunga Tradisional",
    positions: {
      xxs: {left: "-3%", top: "78%", z: -220},
      xs: {left: "2%", top: "78%", z: -220},
      sm: {left: "6%", top: "78%", z: -220},
      md: {left: "5%", top: "76%", z: -350},
      lg: {left: "5%", top: "75%", z: -350}
    },
    animation: "animate-float"
  },
  {
    src: "bunga-3.webp",
    alt: "Bunga Neira",
    positions: {
      xxs: {left: "86%", top: "52%", z: -320},
      xs: {left: "86%", top: "52%", z: -320},
      sm: {left: "86%", top: "52%", z: -320},
      md: {left: "88%", top: "50%", z: -480},
      lg: {left: "88%", top: "50%", z: -480}
    },
    animation: "animate-float"
  },
  {
    src: "lumba-2.webp",
    alt: "Lumba-lumba Bermain",
    positions: {
      xxs: {left: "-5%", top: "44%", z: -420},
      xs: {left: "0%", top: "44%", z: -420},
      sm: {left: "4%", top: "44%", z: -420},
      md: {left: "2%", top: "40%", z: -620},
      lg: {left: "2%", top: "40%", z: -620}
    },
    animation: "animate-swim delay-500"
  },

  // Mid ornaments
  {
    src: "bunga-4.webp",
    alt: "Bunga Dekorasi",
    positions: {
      xxs: {left: "90%", top: "72%", z: -600},
      xs: {left: "90%", top: "72%", z: -600},
      sm: {left: "90%", top: "72%", z: -600},
      md: {left: "92%", top: "70%", z: -820},
      lg: {left: "92%", top: "70%", z: -820}
    },
    animation: "animate-float"
  },
  {
    src: "bunga-4.webp",
    alt: "Bunga Eksotis",
    positions: {
      xxs: {left: "-2%", top: "27%", z: -720},
      xs: {left: "2%", top: "27%", z: -720},
      sm: {left: "8%", top: "27%", z: -720},
      md: {left: "6%", top: "25%", z: -980},
      lg: {left: "6%", top: "25%", z: -980}
    },
    animation: "animate-float"
  },
  {
    src: "bunga-5.webp",
    alt: "Bunga Indah",
    positions: {
      xxs: {left: "83%", top: "32%", z: -880},
      xs: {left: "83%", top: "32%", z: -880},
      sm: {left: "83%", top: "32%", z: -880},
      md: {left: "85%", top: "30%", z: -1150},
      lg: {left: "85%", top: "30%", z: -1150}
    },
    animation: "animate-float"
  },

  // Far ornaments
  {
    src: "lumba-2.webp",
    alt: "Lumba-lumba Laut",
    positions: {
      xxs: {left: "-1%", top: "62%", z: -980},
      xs: {left: "4%", top: "62%", z: -980},
      sm: {left: "12%", top: "62%", z: -980},
      md: {left: "10%", top: "60%", z: -1400},
      lg: {left: "10%", top: "60%", z: -1400}
    },
    animation: "animate-swim delay-700 rotate-125"
  },
  {
    src: "bunga-1.webp",
    alt: "Bunga Cantik",
    positions: {
      xxs: {left: "88%", top: "88%", z: -1120},
      xs: {left: "88%", top: "88%", z: -1120},
      sm: {left: "88%", top: "88%", z: -1120},
      md: {left: "90%", top: "85%", z: -1550},
      lg: {left: "90%", top: "85%", z: -1550}
    },
    animation: "animate-float"
  },
  {
    src: "bunga-2.webp",
    alt: "Bunga Banda",
    positions: {
      xxs: {left: "-3%", top: "18%", z: -1250},
      xs: {left: "2%", top: "18%", z: -1250},
      sm: {left: "10%", top: "18%", z: -1250},
      md: {left: "8%", top: "15%", z: -1650},
      lg: {left: "8%", top: "15%", z: -1650}
    },
    animation: "animate-float"
  },

  // Background ornaments
  {
    src: "lumba-2.webp",
    alt: "Lumba-lumba Neira",
    positions: {
      xxs: {left: "86%", top: "48%", z: -1420},
      xs: {left: "86%", top: "48%", z: -1420},
      sm: {left: "86%", top: "48%", z: -1420},
      md: {left: "88%", top: "45%", z: -1850},
      lg: {left: "88%", top: "45%", z: -1850}
    },
    animation: "animate-swim delay-1000"
  },
  {
    src: "bunga-3.webp",
    alt: "Bunga Hiasan",
    positions: {
      xxs: {left: "-2%", top: "88%", z: -1520},
      xs: {left: "2%", top: "88%", z: -1520},
      sm: {left: "6%", top: "88%", z: -1520},
      md: {left: "5%", top: "85%", z: -1950},
      lg: {left: "5%", top: "85%", z: -1950}
    }
  },
  {
    src: "bunga-3.webp",
    alt: "Bunga Eksotis",
    positions: {
      xxs: {left: "90%", top: "22%", z: -1680},
      xs: {left: "90%", top: "22%", z: -1680},
      sm: {left: "90%", top: "22%", z: -1680},
      md: {left: "92%", top: "20%", z: -2180},
      lg: {left: "92%", top: "20%", z: -2180}
    },
    animation: "animate-float"
  }
];
