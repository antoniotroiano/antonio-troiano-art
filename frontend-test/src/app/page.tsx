"use client";

import LiquidGlass from "liquid-glass-react";
import Script from "next/script";

export default function Home() {
    return (
        <div>
            <button id="scrollTopBtn" title="Nach oben">&#8679;</button>

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

            <header className="hero-section">
                <video playsInline autoPlay muted loop poster="placeholder.jpg" id="hero-video">
                    <source src="https://videos.pexels.com/video-files/853874/853874-hd_1920_1080_25fps.mp4"
                            type="video/mp4"/>
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
                        <p style={{
                            textAlign: "center",
                            maxWidth: "600px",
                            margin: "-40px auto 40px",
                        }}>Eine kuratierte Auswahl
                            meiner Lieblingswerke. Klicke auf den Button, um meine gesamte Sammlung zu entdecken.</p>
                        <div className="portfolio-grid">
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2025_no3_1.webp?updatedAt=1757686795123"
                                alt="Kunstwerk"/>
                                <div className="overlay"><span>Nebelwald</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2023_no9.webp?updatedAt=1751314255107"
                                alt="Kunstwerk"/>
                                <div className="overlay"><span>Flüssiges Gold</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2024_no7.webp?updatedAt=1751314254580"
                                alt="Kunstwerk"/>
                                <div className="overlay"><span>Kosmos</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
                                alt="Kunstwerk"/>
                                <div className="overlay"><span>Struktur</span></div>
                            </div>
                            <div className="portfolio-item"><img
                                src="https://ik.imagekit.io/atart/2024_no10_2.webp?updatedAt=1750413036814"
                                alt="Kunstwerk"/>
                                <div className="overlay"><span>Pastell</span></div>
                            </div>
                        </div>
                        <div className="btn-center">
                            <a href="portfolio" className="btn-glass dark-text-on-light-bg">Alle Werke anzeigen</a>
                        </div>
                    </section>
                </section>

                {/*<section id="shop" className="section-padding section-gradient">
                    <section className="section">
                        <h2 className="section-title" style={{color: "white"}}>Shop</h2>
                        <div className="shop-grid">
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no9_1.webp?updatedAt=1750413052911"
                                     alt="Produkt"/>
                                <h3>Abstrakte Träume</h3>
                                <div className="price">120,00 €</div>
                                <a href="#" className="btn-glass-shop-request">Anfragen</a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                     alt="Produkt"/>
                                <h3>Das Farbenspiel</h3>
                                <div className="price">250,00 €</div>
                                <a href="#" className="btn-glass-shop-request">Anfragen</a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
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
                </section>*/}

                <section id="shop" className="section-padding section-gradient2">
                    <section className="section">
                        <h2 className="section-title" style={{color: "white"}}>Shop</h2>
                        <div className="shop-grid">
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no9_1.webp?updatedAt=1750413052911"
                                     alt="Produkt"/>
                                <h3>Abstrakte Träume</h3>
                                <div className="price">120,00 €</div>
                                <a href="#" className="btn-glass-shop-request">Anfragen</a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                     alt="Produkt"/>
                                <h3>Das Farbenspiel</h3>
                                <div className="price">250,00 €</div>
                                <a href="#" className="btn-glass-shop-request">Anfragen</a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
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

                <section id="shop" className="section-padding section-gradient5">
                    <section className="section">
                        <h2 className="section-title" style={{color: "white"}}>Shop</h2>
                        <div className="shop-grid">
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no9_1.webp?updatedAt=1750413052911"
                                     alt="Produkt"/>
                                <h3>Abstrakte Träume</h3>
                                <div className="price">120,00 €</div>
                                <a href="#" className="btn-glass-shop-request">Anfragen</a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                     alt="Produkt"/>
                                <h3>Das Farbenspiel</h3>
                                <div className="price">250,00 €</div>
                                <a href="#" className="btn-glass-shop-request">Anfragen</a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
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

                {/*style={{background: "url('https://ik.imagekit.io/atart/2024_no7.webp?updatedAt=1751314254580') center/cover fixed"}}*/}
                <section id="shop" className="section-padding "
                         style={{background: "url('/image-mesh-gradient.png') center/cover fixed"}}>
                    <section className="section">
                        <h2 className="section-title" style={{color: "white"}}>Shop</h2>


                        <section>
                            <div className="shop-grid">
                                <div className="card shop-item">
                                    <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                         alt="Produkt"/>
                                    <h3>Das Farbenspiel</h3>
                                    <div className="price">250,00 €</div>
                                    <a href="#" className="btn-glass-shop-request">Anfragen</a>
                                </div>

                                <div className="card shop-item">
                                    <img src="https://ik.imagekit.io/atart/2024_no10_1.webp?updatedAt=1750413052946"
                                         alt="Produkt"/>
                                    <h3>Das Farbenspiel</h3>
                                    <div className="price">250,00 €</div>
                                    <a href="#" className="btn-glass-shop-request">Anfragen</a>
                                </div>

                                <div className="card shop-item">
                                    <img src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
                                         alt="Produkt"/>
                                    <h3>Urbaner Dschungel</h3>
                                    <div className="price">Verkauft</div>
                                    <a href="#" className="btn-glass-shop-request"
                                       style={{background: "#888", color: "#ccc", cursor: "not-allowed"}}>Verkauft</a>
                                </div>

                                <svg style={{display: "none"}}>
                                    <filter id="displacementFilter">
                                        <feImage preserveAspectRatio="none"
                                                 href="data:image/png;base64,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"/>

                                        <feDisplacementMap in="SourceGraphic"
                                                           in2="turbulence"
                                                           scale="200" xChannelSelector="R" yChannelSelector="G"/>
                                    </filter>
                                </svg>
                            </div>
                        </section>

                        <p></p>
                        {/*<div className="shop-grid">
                            <div className="liquidGlass-wrapper shop-item dock">
                                <div className="liquidGlass-effect"></div>
                                <div className="liquidGlass-tint"></div>
                                <div className="liquidGlass-shine"></div>
                                <div className="liquidGlass-text">
                                    <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                         alt="Produkt"/>
                                    <h3>Das Farbenspiel</h3>
                                    <div className="price">250,00 €</div>
                                    <a href="#" className="btn-glass-shop-request">Anfragen</a>
                                </div>
                            </div>

                            <svg style={{display: "none"}}>
                                <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%"
                                        filterUnits="objectBoundingBox">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1"
                                                  seed="5" result="turbulence"/>
                                    <feComponentTransfer in="turbulence" result="mapped">
                                        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5"/>
                                        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0"/>
                                        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5"/>
                                    </feComponentTransfer>
                                    <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap"/>
                                    <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1"
                                                        specularExponent="100" lightingColor="white"
                                                        result="specLight">
                                        <fePointLight x="-200" y="-200" z="300"/>
                                    </feSpecularLighting>

                                    <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"
                                                 result="litImage"/>
                                    <feDisplacementMap in="SourceGraphic" in2="softMap" scale="60" xChannelSelector="R"
                                                       yChannelSelector="G"/>
                                </filter>
                            </svg>
                        </div>*/}

                        {/*<div className="glassContainer2">
                            <div className="glass-container2">
                                <div className="glass-filter"></div>
                                <div className="glass-overlay"></div>
                                <div className="glass-specular"></div>
                                <div className="glass-content">

                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                                    <filter id="subtleLensFilter" x="0%" y="0%" width="100%" height="100%"
                                            filterUnits="objectBoundingBox">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.003 0.003" numOctaves="2"
                                                      seed="92"
                                                      result="noise"/>
                                        <feGaussianBlur in="noise" stdDeviation="0.08" result="blur"/>
                                        <feDisplacementMap in="SourceGraphic" in2="blur" scale="15" xChannelSelector="R"
                                                           yChannelSelector="G"/>
                                    </filter>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                                    <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%"
                                            filterUnits="objectBoundingBox">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2"
                                                      seed="92"
                                                      result="noise"/>
                                        <feGaussianBlur in="noise" stdDeviation="0.02" result="blur"/>
                                        <feDisplacementMap in="SourceGraphic" in2="blur" scale="77" xChannelSelector="R"
                                                           yChannelSelector="G"/>
                                    </filter>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                                    <filter id="lensFilterBase" x="0%" y="0%" width="100%" height="100%">
                                        <feComponentTransfer in="SourceAlpha" result="alpha">
                                            <feFuncA type="identity"/>
                                        </feComponentTransfer>
                                        <feGaussianBlur in="alpha" stdDeviation="50" result="blur"/>
                                        <feDisplacementMap in="SourceGraphic" in2="blur" scale="50"
                                                           xChannelSelector="A" yChannelSelector="A"/>
                                    </filter>
                                </svg>


                                <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                                    <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%">
                                        <feComponentTransfer in="SourceAlpha" result="alpha">
                                            <feFuncA type="identity"/>
                                        </feComponentTransfer>
                                        <feGaussianBlur in="alpha" stdDeviation="80" result="blur"/>
                                        <feDisplacementMap in="SourceGraphic" in2="blur" scale="100"
                                                           xChannelSelector="A" yChannelSelector="A"/>
                                    </filter>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                                    <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%">
                                        <feComponentTransfer in="SourceAlpha" result="alpha">
                                            <feFuncA type="linear" slope="0.7"/>
                                        </feComponentTransfer>
                                        <feGaussianBlur in="alpha" stdDeviation="20" result="blur"/>
                                        <feDisplacementMap in="SourceGraphic" in2="blur" scale="15"
                                                           xChannelSelector="A" yChannelSelector="A"/>
                                    </filter>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                                    <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%">
                                        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3"
                                                      result="turb"/>
                                        <feDisplacementMap in="SourceGraphic" in2="turb" scale="80"
                                                           xChannelSelector="R" yChannelSelector="B"/>
                                    </filter>
                                </svg>
                            </div>
                        </div>*/}

                        {/*<div className="shop-item">
                                <div className="">
                                    <div className="glass-container">
                                        <div className="glass-filter"></div>
                                        <div className="glass-overlay"></div>
                                        <div className="glass-specular"></div>
                                        <div className="glass-content">
                                            <img
                                                src="https://ik.imagekit.io/atart/2024_no9_1.webp?updatedAt=1750413052911"
                                                alt="Produkt"/>
                                            <h3>Abstrakte Träume</h3>
                                            <div className="price">120,00 €</div>
                                            <a href="#" className="btn-glass-shop-request">Anfragen</a>
                                        </div>

                                        <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                                            <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%"
                                                    filterUnits="objectBoundingBox">
                                                <feComponentTransfer in="SourceAlpha" result="alpha">
                                                    <feFuncA type="identity"/>
                                                </feComponentTransfer>
                                                <feGaussianBlur in="alpha" stdDeviation="50" result="blur"/>
                                                <feDisplacementMap in="SourceGraphic" in2="blur" scale="50"
                                                                   xChannelSelector="A" yChannelSelector="A"/>
                                            </filter>
                                        </svg>
                                    </div>
                                </div>
                            </div>*/}
                        <p></p>
                        <div className="shop-grid ">
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                     alt="Produkt"/>
                                <h3>Das Farbenspiel</h3>
                                <div className="price">250,00 €</div>
                                <a href="#" className="btn-glass-shop-request">Anfragen</a>
                            </div>
                            <div className="shop-item glass-panel">
                                <img src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
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
                                src="https://ik.imagekit.io/atart/2024_no7.webp?updatedAt=1751314254580"
                                alt="Blog Bild"/>
                                <div className="blog-card-content"><h3>Der kreative Prozess hinter 'Symphonie in
                                    Blau'</h3>
                                    <p>Ein Einblick in die Inspiration, die Techniken und die Emotionen, die in mein
                                        neuestes Werk geflossen sind...</p></div>
                            </a></div>
                            <div className="blog-card"><a href="artikel2.html"><img
                                src="https://ik.imagekit.io/atart/2023_no9.webp?updatedAt=1751314255107"
                                alt="Blog Bild"/>
                                <div className="blog-card-content"><h3>Die Wahl der richtigen Leinwand: Ein
                                    Leitfaden</h3>
                                    <p>Nicht jede Leinwand ist gleich. Ich teile meine Erfahrungen und Tipps, wie du den
                                        perfekten Untergrund für dein nächstes Meisterwerk findest...</p></div>
                            </a></div>
                            <div className="blog-card"><a href="artikel3.html"><img
                                src="https://ik.imagekit.io/atart/2025_no3_1.webp?updatedAt=1757686795123"
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

                {/*style={{background: "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200') center/cover fixed"}}*/}
                <section id="kontakt" className="section-padding section-gradient6"
                         style={{background: "url('/linearGradiant2.png') center/cover fixed"}}>
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
