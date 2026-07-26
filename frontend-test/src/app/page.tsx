"use client";

import Script from "next/script";
import React from "react";
import MainNav from "src/components/MainNav";

export default function Home() {

    return (
        <div>
            <button id="scrollTopBtn" title="Nach oben">&#8679;</button>

            <MainNav />

            <header className="hero-section">
                <video playsInline autoPlay muted loop poster="placeholder.jpg" id="hero-video">
                    <source src="https://videos.pexels.com/video-files/853874/853874-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    Dein Browser unterstützt keine HTML5-Videos.
                </video>
                <div className="glass-panel">
                    <h1>Die Seele der Farbe</h1>
                    <p>Willkommen in einer Welt, in der jede Leinwand eine Geschichte erzählt und jeder Pinselstrich
                        eine Emotion ist.</p>
                </div>
            </header>

            <main>
                <section id="portfolio" className="section-padding">
                    <section className="section">
                        <h2 className="section-title">Portfolio</h2>
                        <p style={{ textAlign: "center", maxWidth: "600px", margin: "-40px auto 40px", }}>Eine kuratierte Auswahl
                            meiner Lieblingswerke. Klicke auf den Button, um meine gesamte Sammlung zu entdecken.</p>
                        <div className="portfolio-grid">
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2025_no3_1.webp?updatedAt=1757686795123"
                                alt="Kunstwerk" />
                                <div className="overlay"><span>Nebelwald</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2023_no9.webp?updatedAt=1751314255107"
                                alt="Kunstwerk" />
                                <div className="overlay"><span>Flüssiges Gold</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2024_no7.webp?updatedAt=1751314254580"
                                alt="Kunstwerk" />
                                <div className="overlay"><span>Kosmos</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
                                alt="Kunstwerk" />
                                <div className="overlay"><span>Struktur</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2024_no10_2.webp?updatedAt=1750413036814"
                                alt="Kunstwerk" />
                                <div className="overlay"><span>Pastell</span></div>
                            </div>
                        </div>
                        <div className="btn-center">
                            <a href="portfolio" className="btn-chip btn-chip--on-light btn-chip--shine"><span>Alle Werke anzeigen</span></a>
                        </div>
                    </section>
                </section>

                {/* <section id="shop" className="section-padding section-gradient2"
                    style={{

                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundAttachment: "fixed",
                        position: "relative",
                    }}>
                    <section className="section">
                        <h2 className="section-title" style={{ color: "white" }}>Shop Neu</h2>

                        <div style={{ width: 360, marginTop: 120, marginLeft: 24 }}>
                            <BackdropGlassCard />
                        </div>
                        <div style={{ width: 360, marginTop: 120, marginLeft: 24 }}>
                            <LiquidEdgeCard />
                        </div>
                    </section>
                </section> */}

                {/*style={{background: "url('https://ik.imagekit.io/atart/2024_no7.webp?updatedAt=1751314254580') center/cover fixed"}}*/}
                <section id="shop" className="section-padding section-gradient-gallery-ink section-has-grain">
                    <section className="section">
                        <h2 className="section-title" style={{ color: "white" }}>Shop</h2>
                        {/* <section>
                            <div className="shop-grid">
                                <div className="card shop-item">
                                    <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                        alt="Produkt" />
                                    <h3>Das Farbenspiel</h3>
                                    <div className="price">250,00 €</div>
                                    <a href="#" className="btn-glass-shop-request">Anfragen</a>
                                </div>
                                <div className="card shop-item">
                                    <img src="https://ik.imagekit.io/atart/2024_no10_1.webp?updatedAt=1750413052946"
                                        alt="Produkt" />
                                    <h3>Das Farbenspiel</h3>
                                    <div className="price">250,00 €</div>
                                    <a href="#" className="btn-glass-shop-request">Anfragen</a>
                                </div>
                                <div className="card shop-item">
                                    <img src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
                                        alt="Produkt" />
                                    <h3>Urbaner Dschungel</h3>
                                    <div className="price">Verkauft</div>
                                    <a href="#" className="btn-glass-shop-request"
                                        style={{ background: "#888", color: "#ccc", cursor: "not-allowed" }}>Verkauft</a>
                                </div>
                            </div>
                        </section>
                        <p></p>
                        <p></p> */}
                        <div className="shop-grid ">
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                    alt="Produkt" />
                                <h3>Das Farbenspiel</h3>
                                <div className="price">250,00 €</div>
                                <a href="#" className="btn-chip btn-chip--shine"><span>Anfragen</span></a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                    alt="Produkt" />
                                <h3>Das Farbenspiel</h3>
                                <div className="price">250,00 €</div>
                                <a href="#" className="btn-chip btn-chip--shine"><span>Anfragen</span></a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
                                    alt="Produkt" />
                                <h3>Urbaner Dschungel</h3>
                                <div className="price">Verkauft</div>
                                <a href="#" className="btn-chip btn-chip--shine"
                                    style={{ background: "#888", color: "#ccc", cursor: "not-allowed" }}>Verkauft</a>
                            </div>
                        </div>
                        <div className="btn-center">
                            <a className="btn-chip btn-chip--shine" href="shop"><span>Zum kompletten Shop</span></a>
                        </div>
                    </section>
                </section>

                <section id="blog" className="section-padding">
                    <section className="section">
                        <h2 className="section-title">Aktuelles aus dem Atelier</h2>
                        <div className="blog-grid">
                            <div className="blog-card"><a href="artikel1.html"><img
                                src="https://ik.imagekit.io/atart/2024_no7.webp?updatedAt=1751314254580"
                                alt="Blog Bild" />
                                <div className="blog-card-content"><h3>Der kreative Prozess hinter 'Symphonie in
                                    Blau'</h3>
                                    <p>Ein Einblick in die Inspiration, die Techniken und die Emotionen, die in mein
                                        neuestes Werk geflossen sind...</p></div>
                            </a></div>
                            <div className="blog-card"><a href="artikel2.html"><img
                                src="https://ik.imagekit.io/atart/2023_no9.webp?updatedAt=1751314255107"
                                alt="Blog Bild" />
                                <div className="blog-card-content"><h3>Die Wahl der richtigen Leinwand: Ein
                                    Leitfaden</h3>
                                    <p>Nicht jede Leinwand ist gleich. Ich teile meine Erfahrungen und Tipps, wie du den
                                        perfekten Untergrund für dein nächstes Meisterwerk findest...</p></div>
                            </a></div>
                            <div className="blog-card"><a href="artikel3.html"><img
                                src="https://ik.imagekit.io/atart/2025_no3_1.webp?updatedAt=1757686795123"
                                alt="Blog Bild" />
                                <div className="blog-card-content"><h3>Ausstellung in Hamburg: Ein Rückblick</h3>
                                    <p>Fotos,
                                        Eindrücke und ein großes Dankeschön an alle, die meine erste Solo-Ausstellung zu
                                        einem
                                        unvergesslichen Erlebnis gemacht haben...</p></div>
                            </a></div>
                        </div>
                        <div className="btn-center">
                            <a href="blog" className="btn-chip btn-chip--on-light btn-chip--shine"><span>Alle Beiträge lesen</span></a>
                        </div>
                    </section>
                </section>

                {/*style={{background: "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200') center/cover fixed"}}*/}
                <section id="kontakt" className="section-padding section-gradient6"
                    style={{ background: "url('/linearGradiant2.png') center/cover fixed" }}>
                    <section className="section">
                        <h2 className="section-title" style={{ color: "white" }}>Kontakt</h2>
                        <div className="contact-container glass-panel">
                            <p>Hast du Fragen zu einem Werk oder Interesse an einer Auftragsarbeit? Schreib mir!</p>
                            <form className="contact-form">
                                <div className="form-group">
                                    <input type="text" placeholder="Dein Name" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Deine E-Mail-Adresse" required />
                                </div>
                                <div className="form-group">
                                    <input type="subject" placeholder="Betreff" required />
                                </div>
                                <div className="form-group">
                                    <textarea rows={6} placeholder="Deine Nachricht" required></textarea>
                                </div>
                                <button type="submit" className="btn-chip btn-chip--shine"><span>Nachricht senden</span></button>
                            </form>
                        </div>
                    </section>
                </section>

                <section id="künstler" className="section-padding">
                    <section className="section about-notes">
                        <div className="about-notes__top">
                            <h2 className="section-title">Über den Künstler</h2>

                            <div className="about-notes__actions">
                                <a className="btn-chip btn-chip--on-light btn-chip--shine" href="#shop">
                                    <span>Zum Shop</span>
                                </a>
                                <a className="btn-chip btn-chip--on-light" href="#portfolio">
                                    <span>Portfolio</span>
                                </a>
                                <a className="btn-chip btn-chip--on-light" href="#kontakt">
                                    <span>Kontakt</span>
                                </a>
                            </div>
                        </div>

                        <div className="about-notes__layout">
                            <div className="about-notes__essay">
                                <p className="about-notes__lead">
                                    Seit über einem Jahrzehnt übersetze ich Emotionen in visuelle Erlebnisse.
                                </p>

                                <p>
                                    Meine Arbeiten entstehen aus Schichten, Kontrasten und Ruhe – als Einladung, langsamer
                                    zu schauen und Details zu entdecken. Ich mag Bilder, die nicht „laut“ sind, sondern
                                    nach und nach mehr zeigen.
                                </p>

                                <p className="about-notes__muted">
                                    Originale & Prints findest du im Shop. Aufträge sind nach Absprache möglich.
                                </p>
                            </div>

                            <aside className="about-notes__info" aria-label="Kurzinfo">
                                <div className="about-notes__infoBlock">
                                    <div className="about-notes__k">Fokus</div>
                                    <div className="about-notes__v">Abstrakt · Struktur · Emotion</div>
                                </div>

                                <div className="about-notes__infoBlock">
                                    <div className="about-notes__k">Medien</div>
                                    <div className="about-notes__v">Acryl · Mixed Media · Digital</div>
                                </div>

                                <div className="about-notes__infoBlock">
                                    <div className="about-notes__k">Formate</div>
                                    <div className="about-notes__v">Originale & Prints</div>
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
                                <span className="about-notes__tag">Originale · Prints · Aufträge</span>
                            </div>
                        </div>
                    </section>
                </section>

            </main>

            <footer>
                <p style={{ margin: "1em 0em" }}>&copy; 2026 Antonio Troiano - Alle Rechte vorbehalten.</p>
                <p style={{ margin: "1em 0em" }}><a href="impressum.html">Impressum</a> | <a href="#">Datenschutz</a></p>
            </footer>

            <Script id="sticky-nav-and-scrolltop" strategy="afterInteractive">
                {`
                    const nav = document.getElementById('mainNav');
                    const scrollTopBtn = document.getElementById('scrollTopBtn');

                    if (nav) {
                    window.addEventListener('scroll', () => {
                        if (window.scrollY > 50) {
                        nav.classList.add('nav-scrolled');
                        nav.classList.remove('nav-top');
                        } else {
                        nav.classList.add('nav-top');
                        nav.classList.remove('nav-scrolled');
                        }
                    });
                    }

                    if (scrollTopBtn) {
                    window.addEventListener('scroll', () => {
                        if (window.scrollY > 300) {
                        scrollTopBtn.classList.add('show');
                        } else {
                        scrollTopBtn.classList.remove('show');
                        }
                    });

                    scrollTopBtn.addEventListener('click', () => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                    }
                `}
            </Script>
        </div >
    );
}
