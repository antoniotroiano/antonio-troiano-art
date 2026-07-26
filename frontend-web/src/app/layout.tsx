import "@/styles/globals.css";
import "@/styles/btn.css";
import "@/styles/nav.css";
import "@/styles/portfolio.css";
import "@/styles/shop.css";
import "@/styles/blog.css";
import "@/styles/contact.css";
import "@/styles/artist.css";
import "@/styles/imprint.css";
import "@/styles/footer.css";
import "@/styles/section.css";
import "@/styles/hero.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
      metadataBase: new URL("https://antonio-troiano.de"),
      title: {
            default: "Antonio Troiano – Abstrakte Kunst & Moderne Gemälde",
            template: "%s | Antonio Troiano",
      },
      description:
            "Antonio Troiano ist Künstler für abstrakte Kunst und moderne Gemälde. Entdecke einzigartige, handgefertigte Originale voller Emotion und Tiefe.",
      alternates: {
            canonical: "https://antonio-troiano.de",
      },
      openGraph: {
            title: "Antonio Troiano – Abstrakte Kunst & Moderne Gemälde",
            description:
                  "Moderne abstrakte Kunstwerke von Antonio Troiano. Ausdrucksstarke Originale online entdecken.",
            url: "https://antonio-troiano.de",
            siteName: "Antonio Troiano",
            locale: "de_DE",
            type: "website",
      },
      twitter: {
            card: "summary_large_image",
            title: "Antonio Troiano – Abstrakte Kunst",
            description:
                  "Abstrakte und moderne Gemälde von Antonio Troiano.",
      },
      robots: {
            index: true,
            follow: true,
      },
};

export const viewport: Viewport = {
      themeColor: "#f3e5f5",
      viewportFit: "cover",
      width: "device-width",
      initialScale: 1,
};

export default function RootLayout({
      children,
}: Readonly<{ children: React.ReactNode }>) {
      const jsonLd = {
            "@context": "https://schema.org",
            "@graph": [
                  {
                        "@type": "Person",
                        name: "Antonio Troiano",
                        url: "https://antonio-troiano.de",
                        jobTitle: "Künstler",
                        description:
                              "Künstler für abstrakte Kunst und moderne Gemälde in Deutschland",
                        image: "https://ik.imagekit.io/atart/titel-og.webp",
                  },
                  {
                        "@type": "Organization",
                        name: "Antonio Troiano",
                        url: "https://antonio-troiano.de",
                        logo: "https://ik.imagekit.io/atart/titel-og.webp",
                  },
                  {
                        "@type": "WebSite",
                        name: "Antonio Troiano",
                        url: "https://antonio-troiano.de",
                        inLanguage: "de-DE",
                  },
            ],
      };

      return (
            <html lang="de">
                  <head>
                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                        <script defer src="https://stats.antonio-troiano.de/script.js" data-website-id="496e49c3-56bd-4878-9306-1a0823749685"></script>
                        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
                        <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
                        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                        <link rel="manifest" href="/site.webmanifest" />
                  </head>
                  <body>{children}</body>
            </html>
      );
}
