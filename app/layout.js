import "@/styles/globals.css";
import {cn} from "@/utils/helpers/cn";
import AnimationProvider from "@/utils/contexts/AnimationProvider";
import QueryProvider from "@/utils/contexts/QueryProvider";
import Script from "next/script";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import {
  PlusJakartaSansBold,
  PlusJakartaSansLight,
  PlusJakartaSansRegular,
  PlusJakartaSansSemiBold,
  PlusJakartaSansMedium,
  Auromiya
} from "@/utils/helpers/font";

export const metadata = {
  title: "Cerita Neira | KKN-PPM UGM 2026",
  description:
    "Website resmi KKN-PPM UGM 2026 di Banda Neira, Maluku. Bergabunglah bersama kami dalam perjalanan bersejarah di Negeri Pala.",
  keywords: ["KKN", "UGM", "Banda Neira", "Maluku", "Cerita Neira", "KKN-PPM"],
  authors: [{name: "Tim Cerita Neira"}],
  openGraph: {
    title: "Cerita Neira | KKN-PPM UGM 2026",
    description: "Website resmi KKN-PPM UGM 2026 di Banda Neira, Maluku",
    type: "website"
  }
};

export const viewport = {
  themeColor: "#FFF5E8",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({children}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={cn(
          PlusJakartaSansBold.variable,
          PlusJakartaSansLight.variable,
          PlusJakartaSansRegular.variable,
          PlusJakartaSansSemiBold.variable,
          PlusJakartaSansMedium.variable,
          Auromiya.variable,
          "antialiased"
        )}
      >
        <QueryProvider>
          <Navbar />
          <AnimationProvider>{children}</AnimationProvider>
          <Footer />
        </QueryProvider>

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-3WNDZLJT9J" />
        <Script id="" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3WNDZLJT9J');`}
        </Script>
      </body>
    </html>
  );
}
