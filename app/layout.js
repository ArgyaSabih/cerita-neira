import "@/styles/globals.css";
import {cn} from "@/utils/helpers/cn";
import AnimationProvider from "@/utils/contexts/AnimationProvider";
import QueryProvider from "@/utils/contexts/QueryProvider";
import Script from "next/script";

import {
  PlusJakartaSansBold,
  PlusJakartaSansLight,
  PlusJakartaSansRegular,
  PlusJakartaSansSemiBold,
  PlusJakartaSansMedium,
  Auromiya
} from "@/utils/helpers/font";

export const metadata = {
  title: "Cerita Neira",
  description: "KKN PPM UGM Cerita Neira"
};

export const viewport = {
  themeColor: "#FFFFFF"
};

export default function RootLayout({children}) {
  return (
    <html lang="id">
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
          <AnimationProvider>{children}</AnimationProvider>
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
