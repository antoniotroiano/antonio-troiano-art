import { Metadata } from "next";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import SubpageScrollEffects from "@/components/SubpageScrollEffects";

export const metadata: Metadata = {
  title: "Portfolio – Abstrakte Kunst von Antonio Troiano",
  description:
    "Entdecke das Portfolio von Antonio Troiano. Eine Sammlung moderner und abstrakter Gemälde voller Emotion, Farbe und Ausdruck.",
  alternates: {
    canonical: "https://antonio-troiano.de/portfolio",
  },
  openGraph: {
    title: "Portfolio – Abstrakte Kunst von Antonio Troiano",
    description:
      "Moderne abstrakte Kunstwerke im Portfolio von Antonio Troiano entdecken.",
    url: "https://antonio-troiano.de/portfolio",
    type: "website",
  },
};

export default async function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Portfolio – Abstrakte Kunst von Antonio Troiano",
        url: "https://antonio-troiano.de/portfolio",
        description:
          "Portfolio mit modernen und abstrakten Gemälden von Antonio Troiano.",
        inLanguage: "de-DE",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: "https://antonio-troiano.de",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: "https://antonio-troiano.de/portfolio",
          },
        ],
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <button id="scrollTopBtn" title="Nach oben">&#8679;</button>
      <MainNav initial />
      <main className="main-styles">
        <section className="section-padding">
          <section className="section">
            <h1 className="section-title-subpages">Portfolio</h1>
            <p className="section-subtitle">
              Abstrakte Kunst und moderne Gemälde von Antonio Troiano
            </p>
            <PortfolioGrid folder="portfolio" />
          </section>
        </section>
      </main>
      <Footer />
      <SubpageScrollEffects />
    </div>
  );
}
