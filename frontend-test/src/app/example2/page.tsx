import Script from "next/script";

export default function Home() {
    return (
        <div>
            <button id="scrollTopBtn" title="Nach oben">&#8679;</button>

            <header className="hero-section-e">
                <nav className="main-nav nav-top" id="mainNav">
                    <a href="#" className="logo">Antonio Troiano Art</a>
                    <div className="nav-links">
                        <a href="#portfolio">Portfolio</a>
                        <a href="#shop">Shop</a>
                        <a href="#blog">Blog</a>
                        <a href="#künstler">Künstler</a>
                        <a href="#kontakt">Kontakt</a>
                    </div>
                </nav>
                <div className="main-showcase glass-panel-hero">
                    <div className="artwork-info">
                        <h1>Symphonie in Blau</h1>
                        <p>Willkommen in meiner Welt, in der jede Farbe eine Emotion und jeder Pinselstrich eine
                            Geschichte ist.</p>
                    </div>
                    <div className="artist-bio">
                        <h2 style={{fontFamily: "var(--font-headline)", fontSize: "1.5em", margin: "0.83em 0em "}}>Über den Künstler</h2>
                        <p>Seit über einem Jahrzehnt übersetze ich Emotionen in visuelle Erlebnisse...</p>
                    </div>
                </div>
            </header>

            <main>
                {/*<section id="künstler" className="section-padding"
                         style={{background: "url('https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover fixed"}}>
                    <section className="section">
                        <h2 className="section-title" style={{color: "white"}}>Über den Künstler</h2>
                        <div className="contact-container glass-panel">
                            <p>Seit über einem Jahrzehnt übersetze ich Emotionen in visuelle Erlebnisse..</p>
                        </div>
                    </section>
                </section>*/}

                <section id="portfolio" className="section-padding">
                    <section className="section">
                        <h2 className="section-title">Portfolio</h2>
                        <p style={{
                            textAlign: "center",
                            maxWidth: "600px",
                            margin: "-40px auto 40px",
                        }}>Eine kuratierte Auswahl
                            meiner Lieblingswerke. Klicke auf den Button, um meine gesamte Sammlung zu entdecken.</p>
                        <div className="portfolio-grid">
                            <div className="portfolio-item"><img
                                src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600"
                                alt="Kunstwerk"/>
                                <div className="overlay"><span>Nebelwald</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600"
                                alt="Kunstwerk"/>
                                <div className="overlay"><span>Flüssiges Gold</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=600" alt="Kunstwerk"/>
                                <div className="overlay"><span>Kosmos</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600" alt="Kunstwerk"/>
                                <div className="overlay"><span>Struktur</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600"
                                alt="Kunstwerk"/>
                                <div className="overlay"><span>Pastell</span></div>
                            </div>
                        </div>
                        <div className="btn-center">
                            <a href="portfolio" className="btn-glass dark-text-on-light-bg">Alle Werke anzeigen</a>
                        </div>
                    </section>
                </section>

                <section id="shop" className="section-padding"
                         style={{background: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200') center/cover fixed"}}>
                    <section className="section">
                        <h2 className="section-title" style={{color: "white"}}>Shop</h2>
                        <div className="shop-grid">
                            <div className="shop-item glass-panel">
                                <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500"
                                     alt="Produkt"/>
                                <h3>Abstrakte Träume</h3>
                                <div className="price">120,00 €</div>
                                <a href="#" className="btn-glass-shop-request">Anfragen</a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500"
                                     alt="Produkt"/>
                                <h3>Das Farbenspiel</h3>
                                <div className="price">250,00 €</div>
                                <a href="#" className="btn-glass-shop-request">Anfragen</a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500"
                                     alt="Produkt"/>
                                <h3>Urbaner Dschungel</h3>
                                <div className="price">Verkauft</div>
                                <a href="#" className="btn-glass-shop-request"
                                   style={{background: "#888", color: "#ccc", cursor: "not-allowed"}}>Verkauft</a>
                            </div>
                        </div>
                        <div className="btn-center">
                            <a href="shop" className="btn-glass">Zum kompletten Shop</a>
                        </div>
                    </section>
                </section>

                <section id="blog" className="section-padding">
                    <section className="section">
                        <h2 className="section-title">Aktuelles aus dem Atelier</h2>
                        <div className="blog-grid">
                            <div className="blog-card"><a href="artikel1.html"><img
                                src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=500"
                                alt="Blog Bild"/>
                                <div className="blog-card-content"><h3>Der kreative Prozess hinter 'Symphonie in
                                    Blau'</h3>
                                    <p>Ein Einblick in die Inspiration, die Techniken und die Emotionen, die in mein
                                        neuestes Werk geflossen sind...</p></div>
                            </a></div>
                            <div className="blog-card"><a href="artikel2.html"><img
                                src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=500"
                                alt="Blog Bild"/>
                                <div className="blog-card-content"><h3>Die Wahl der richtigen Leinwand: Ein
                                    Leitfaden</h3>
                                    <p>Nicht jede Leinwand ist gleich. Ich teile meine Erfahrungen und Tipps, wie du den
                                        perfekten Untergrund für dein nächstes Meisterwerk findest...</p></div>
                            </a></div>
                            <div className="blog-card"><a href="artikel3.html"><img
                                src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=500"
                                alt="Blog Bild"/>
                                <div className="blog-card-content"><h3>Ausstellung in Hamburg: Ein Rückblick</h3>
                                    <p>Fotos,
                                        Eindrücke und ein großes Dankeschön an alle, die meine erste Solo-Ausstellung zu
                                        einem
                                        unvergesslichen Erlebnis gemacht haben...</p></div>
                            </a></div>
                        </div>
                        <div className="btn-center">
                            <a href="blog" className="btn-glass dark-text-on-light-bg">Alle Beiträge lesen</a>
                        </div>
                    </section>
                </section>

                <section id="kontakt" className="section-padding"
                         style={{background: "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200') center/cover fixed"}}>
                    <section className="section">
                        <h2 className="section-title" style={{color: "white"}}>Kontakt</h2>
                        <div className="contact-container glass-panel">
                            <p>Hast du Fragen zu einem Werk oder Interesse an einer Auftragsarbeit? Schreib mir!</p>
                            <form className="contact-form">
                                <div className="form-group"><input type="text" placeholder="Dein Name" required/></div>
                                <div className="form-group"><input type="email" placeholder="Deine E-Mail-Adresse"
                                                                   required/></div>
                                <div className="form-group"><input type="subject" placeholder="Betreff"
                                                                   required/></div>
                                <div className="form-group"><textarea rows={6} placeholder="Deine Nachricht"
                                                                      required></textarea></div>
                                <button type="submit" className="btn-glass">Nachricht senden</button>
                            </form>
                        </div>
                    </section>
                </section>

                <section id="künstler" className="section-padding">
                    <section className="section">
                        <h2 className="section-title">Über den Künstler</h2>
                        <div className="glass-panel" style={{margin: "0 auto"}}>
                            <p>Seit über einem Jahrzehnt übersetze ich Emotionen in visuelle Erlebnisse..</p>
                        </div>
                    </section>
                </section>
            </main>

            <footer>
                <p style={{margin: "1em 0em"}}>&copy; 2025 Dein Name - Alle Rechte vorbehalten.</p>
                <p style={{margin: "1em 0em"}}><a href="impressum.html">Impressum</a> | <a href="#">Datenschutz</a></p>
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
        </div>
    );
}
