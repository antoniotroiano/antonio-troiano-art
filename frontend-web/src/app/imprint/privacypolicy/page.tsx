import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import Link from "next/link";
import SubpageScrollEffects from "@/components/SubpageScrollEffects";

export const metadata = {
    title: "Datenschutzerklärung – Antonio Troiano Art",
    description:
        "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten auf der Website von Antonio Troiano Art.",
    openGraph: {
        title: "Datenschutzerklärung – Antonio Troiano Art",
        description:
            "Datenschutzinformationen und Hinweise zur Verarbeitung personenbezogener Daten.",
        url: "https://antonio-troiano.de/privacypolicy",
        siteName: "Antonio Troiano Art",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Datenschutzerklärung – Antonio Troiano Art",
        description:
            "Datenschutzinformationen der Website Antonio Troiano Art.",
    },
};

export default function PrivacyPolicy() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Datenschutzerklärung",
        url: "https://antonio-troiano.de/privacypolicy",
        description:
            "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten auf der Website Antonio Troiano Art.",
    };

    return (
        <div>
            <MainNav initial />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="main-styles">
                <section className="section section-padding">
                    <header className="imprint__header">
                        <h1 className="section-title">Datenschutzerklärung</h1>
                        <p className="imprint__subtitle">
                            Informationen darüber, wie personenbezogene Daten auf dieser Website verarbeitet werden.
                        </p>
                    </header>
                    <article className="imprint__content">
                        <section className="imprint__section">
                            <h2>1. Datenverantwortlicher</h2>
                            <p>
                                <strong>Antonio Troiano Art</strong>
                                <br />
                                E-Mail: <a className="imprint__link" href="mailto:info@antonio-troiano.de">info@antonio-troiano.de</a>
                            </p>
                        </section>
                        <section className="imprint__section">
                            <h2>2. Datenerhebung auf dieser Website</h2>
                            <p>
                                <strong>Kontaktformular</strong>
                                <br />
                                Wenn Sie über das Kontaktformular eine Nachricht senden, werden Ihr Name, Ihre E-Mail-Adresse, der Betreff und der
                                Inhalt der Nachricht verarbeitet, um Ihre Anfrage zu bearbeiten. Zusätzlich wird die IP-Adresse des Absenders
                                vorübergehend verarbeitet, um die Website vor Spam und Missbrauch zu schützen (Rate Limiting).
                                Diese IP-Adresse wird nicht dauerhaft gespeichert oder für Profiling verwendet.
                                Die Daten werden sicher übertragen und per E-Mail an unseren Provider (Ionos) gesendet.
                                Eine weitere Verarbeitung oder Weitergabe der Daten findet nicht statt.
                            </p>
                            <p>
                                <strong>Shop-Anfragen</strong>
                                <br />
                                Bei der Anforderung von Kunstwerken über die Shop-Seite werden die Daten des Kontaktformulars wie oben beschrieben verwendet.
                                Auf dieser Website findet kein automatisierter Kauf- oder Bezahlvorgang statt.
                            </p>
                        </section>
                        <hr className="imprint__rule" />
                        <section className="imprint__section">
                            <h2>3. Analyse</h2>
                            <p>
                                Diese Website verwendet{" "}
                                <a className="imprint__link" href="https://umami.is" target="_blank" rel="noopener noreferrer">
                                    Umami
                                </a>, ein selbst gehostetes, datenschutzfreundliches Webanalyse-Tool.
                            </p>
                            <p className="imprint__muted">
                                • Es werden keine Cookies verwendet.<br />
                                • Es werden keine personenbezogenen Daten gespeichert.<br />
                                • Alle Daten verbleiben auf einem Server in der Europäischen Union.
                            </p>
                        </section>
                        <section className="imprint__section">
                            <h2>4. Externe Links</h2>
                            <p>
                                Diese Website enthält Links zu externen Plattformen wie{" "}
                                <a className="imprint__link" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                                    YouTube
                                </a>.
                                Beim Besuch dieser Plattform können personenbezogene Daten gemäß deren eigenen Datenschutzrichtlinien verarbeitet werden.
                            </p>
                        </section>
                        <section className="imprint__section">
                            <h2>5. Hosting</h2>
                            <p>
                                Diese Website wird auf einem Server von Ionos gehostet.
                                Alle Daten werden innerhalb der Europäischen Union verarbeitet und gespeichert.
                            </p>
                        </section>
                        <section className="imprint__section">
                            <h2>6. Ihre Rechte</h2>
                            <p>Sie haben das Recht:</p>
                            <p className="imprint__muted">
                                • Zugriff auf gespeicherte personenbezogene Daten beantragen<br />
                                • Korrektur oder Löschung von Daten beantragen<br />
                                • Widerruf der Einwilligung für die zukünftige Verarbeitung<br />
                                • Eine Beschwerde bei einer Aufsichtsbehörde einreichen
                            </p>
                            <p>
                                Um Ihre Rechte auszuüben, verwenden Sie bitte das{" "}
                                <Link className="imprint__link" href="/#kontakt">
                                    Kontaktformular
                                </Link>.
                            </p>
                        </section>
                        <section className="imprint__section">
                            <h2>7. Änderungen dieser Richtlinie</h2>
                            <p>
                                Diese Datenschutzerklärung kann aktualisiert werden, um gesetzlichen Anforderungen oder Änderungen an der Website Rechnung zu tragen.
                            </p>
                        </section>
                        <p className="imprint__muted">Zuletzt aktualisiert: Juni 2025</p>
                    </article>
                </section>
            </main>
            <Footer />
            <SubpageScrollEffects />
        </div>
    );
}
