import AboutNotesEssay from "@/components/about/AboutNotesEssay";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import SubpageScrollEffects from "@/components/SubpageScrollEffects";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Über den Künstler – Antonio Troiano",
    description:
        "Erfahre mehr über Antonio Troiano – Künstler für abstrakte Kunst und moderne Gemälde. Einblicke in Werdegang, Inspiration und künstlerischen Fokus.",
    alternates: {
        canonical: "https://antonio-troiano.de/kuenstler",
    },
    openGraph: {
        title: "Über den Künstler – Antonio Troiano",
        description:
            "Einblicke in die abstrakte Kunst und den künstlerischen Werdegang von Antonio Troiano.",
        url: "https://antonio-troiano.de/kuenstler",
        type: "profile",
    },
};

export default function KünstlerPage() {

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AboutPage",
                name: "Über den Künstler – Antonio Troiano",
                url: "https://antonio-troiano.de/kuenstler",
                description:
                    "Biografie und künstlerischer Werdegang von Antonio Troiano, Künstler für abstrakte Kunst.",
                inLanguage: "de-DE",
            },
            {
                "@type": "Person",
                name: "Antonio Troiano",
                url: "https://antonio-troiano.de",
                jobTitle: "Künstler",
                description:
                    "Künstler für abstrakte Kunst und moderne Gemälde mit Fokus auf Struktur und Emotion.",
                knowsAbout: [
                    "Abstrakte Kunst",
                    "Moderne Malerei",
                    "Acrylmalerei",
                    "Mixed Media",
                ],
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
                        name: "Künstler",
                        item: "https://antonio-troiano.de/kuenstler",
                    },
                ],
            },
        ],
    };

    return (
        <div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <button id="scrollTopBtn" title="Nach oben">
                &#8679;
            </button>
            <MainNav initial />
            <main className="main-styles">
                <section className="section-padding">
                    <section className="section about-notes">
                        <div className="about-notes__top">
                            <h1 className="section-title">Über den Künstler</h1>
                            <div className="about-notes__actions">
                                <a className="btn-chip btn-chip--on-light btn-chip--shine" href="/shop">
                                    <span>Zum Shop</span>
                                </a>
                                <a className="btn-chip btn-chip--on-light" href="/portfolio">
                                    <span>Portfolio</span>
                                </a>
                                <a className="btn-chip btn-chip--on-light" href="/#kontakt">
                                    <span>Kontakt</span>
                                </a>
                            </div>
                        </div>
                        <div className="about-notes__layout">
                            <AboutNotesEssay />
                            <aside className="about-notes__info" aria-label="Kurzinfo">
                                <div className="about-notes__infoBlock">
                                    <div className="about-notes__k">Fokus</div>
                                    <div className="about-notes__v">Abstrakt · Struktur · Emotion</div>
                                </div>
                                <div className="about-notes__infoBlock">
                                    <div className="about-notes__k">Medien</div>
                                    <div className="about-notes__v">Acryl · Mixed Media</div>
                                </div>
                                <div className="about-notes__infoBlock">
                                    <div className="about-notes__k">Formate</div>
                                    <div className="about-notes__v">Originale</div>
                                </div>
                                <div className="about-notes__infoBlock">
                                    <div className="about-notes__k">Aufträge</div>
                                    <div className="about-notes__v">Auf Anfrage</div>
                                </div>
                            </aside>
                        </div>
                        <div className="about-notes__bottom">
                            <div className="about-notes__rule" />
                            <div className="about-notes__signature">
                                <span className="about-notes__name">Antonio Troiano</span>
                                <span className="about-notes__dot">•</span>
                                <span className="about-notes__tag">Originale · Aufträge</span>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
            <Footer />
            <SubpageScrollEffects />
        </div>
    );
}
