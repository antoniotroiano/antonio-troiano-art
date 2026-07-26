import PortfolioGrid from "./PortfolioGrid";

export default function Portfolio() {
    return (
        <section className="section">
            <h2 className="section-title">Portfolio</h2>
            <p className="portfolio-intro">Eine kuratierte Auswahl
                meiner Lieblingswerke. Klicke auf den Button, um meine gesamte Sammlung zu entdecken.</p>
            <PortfolioGrid folder="portfolio" limit={4} />
            <div className="btn-center">
                <a href="portfolio" className="btn-chip btn-chip--on-light btn-chip--shine"><span>Alle Werke anzeigen</span></a>
            </div>
        </section>
    );
}
