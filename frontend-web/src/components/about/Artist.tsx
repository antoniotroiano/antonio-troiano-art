import Link from "next/link";

export default function Artist() {
    return (
        <section className="section">
            <h2 className="section-title">Über den Künstler</h2>
            <div className="about-notes__essay artist-container">
                <h3>Meine Leidenschaft wiederentdeckt</h3>
                <p className="about-notes__lead">
                    Nach mehr als einem Jahrzehnt habe ich die Malerei wiedergefunden und meinen Weg zur abstrakten Kunst
                    entdeckt. Mich reizt vor allem die Freiheit: Ich muss keinem Stil folgen und kann ausdrücken, was ich
                    gerade fühle.
                </p>
            </div>
            <div className="btn-center">
                <Link href="/kuenstler" className="btn-chip btn-chip--on-light btn-chip--shine">
                    <span>Mehr erfahren</span>
                </Link>
            </div>
        </section>
    );
}
