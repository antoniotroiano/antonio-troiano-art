import type { Metadata } from "next";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import SubpageScrollEffects from "@/components/SubpageScrollEffects";
import SocialLinksMinimal from "@/components/social/SocialLinksMinimal";

export const metadata: Metadata = {
    title: "Impressum – Antonio Troiano Art",
    description:
        "Impressum mit rechtlichen Angaben und Kontaktinformationen der Website Antonio Troiano Art.",
    openGraph: {
        title: "Impressum – Antonio Troiano Art",
        description:
            "Rechtliche Angaben und Kontaktinformationen gemäß deutschem Recht.",
        url: "https://antonio-troiano.de/imprint",
        siteName: "Antonio Troiano Art",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Impressum – Antonio Troiano Art",
        description:
            "Rechtliche Angaben und Kontaktinformationen der Website Antonio Troiano Art.",
    },
};

export default function Imprint() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Impressum",
        url: "https://antonio-troiano.de/imprint",
        description:
            "Impressum mit rechtlichen Angaben und Kontaktinformationen der Website Antonio Troiano Art.",
    };

    return (
        <div>
            <MainNav initial />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="main-styles">
                <section className="section section-padding">
                    <header className="imprint__header">
                        <h1 className="section-title">Impressum</h1>
                        <p className="imprint__subtitle">
                            Rechtliche Hinweise und Kontaktinformationen gemäß deutschem Recht.
                        </p>
                    </header>
                    <article className="imprint__content">
                        <section className="imprint__section">
                            <h2>
                                Informationen gemäß § 5 TMG
                            </h2>
                            <p>
                                <strong>Antonio Troiano Art</strong>
                                <br />
                                E-Mail:{" "}
                                <a className="imprint__link" href="mailto:info@antonio-troiano.de">
                                    info@antonio-troiano.de
                                </a>
                            </p>
                            <SocialLinksMinimal />
                            <p>
                                <strong>Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV:</strong>
                                <br />
                                Antonio Troiano
                            </p>
                            <p className="imprint__muted">
                                Bitte beachten Sie: Zum Schutz meiner Privatsphäre wird hier keine Postanschrift veröffentlicht. Eine Postanschrift kann
                                auf berechtigte Anfrage hin mitgeteilt werden.
                            </p>

                            <p className="imprint__muted">
                                Diese Website ist ein persönliches Portfolio und Kunstprojekt von Antonio Troiano.
                            </p>
                        </section>
                        <hr className="imprint__rule" />
                        <section className="imprint__section">
                            <h2>
                                Online Dispute Resolution (ODR)
                            </h2>
                            <p>
                                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit. (ODR):{" "}
                                <a className="imprint__link" href="https://ec.europa.eu/consumers/odr" target="_blank"
                                    rel="noopener noreferrer">https://ec.europa.eu/consumers/odr
                                </a>
                            </p>
                        </section>
                    </article>
                </section>
            </main>
            <Footer />
            <SubpageScrollEffects />
        </div>
    );
}
