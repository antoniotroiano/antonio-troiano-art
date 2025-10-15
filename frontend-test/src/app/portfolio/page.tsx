import Script from "next/script";

export default function Page() {
    return (
        <div>
            <button id="scrollTopBtn" title="Nach oben">&#8679;</button>

            <nav className="main-nav nav-initial " id="mainNav">
                <a href="../" className="logo">Antonio Troiano Art</a>
                <div className="nav-links">
                    <a href="../#portfolio">Portfolio</a>
                    <a href="../#shop">Shop</a>
                    <a href="../#blog">Blog</a>
                    <a href="../#künstler">Künstler</a>
                    <a href="../#kontakt">Kontakt</a>
                </div>
            </nav>

            <main style={{paddingTop: "40px"}}>
                <section className="section-padding">
                    <section className="section">
                        <h1 className="section-title">Gesamtwerk</h1>
                        <div className="filter-nav">
                            <button className="active btn-portfolio">Alle</button>
                            <button className="btn-portfolio">Malerei</button>
                            <button className="btn-portfolio">Digitale Kunst</button>
                            <button className="btn-portfolio">Skulpturen</button>
                        </div>
                        <div className="filter-nav">
                            <button className="active">Alle</button>
                            <button>Malerei</button>
                            <button>Digitale Kunst</button>
                            <button>Skulpturen</button>
                        </div>
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
                    </section>
                </section>
            </main>

            <footer>
                <p style={{margin: "1em 0em"}}>&copy; 2025 Dein Name - Alle Rechte vorbehalten.</p>
                <p style={{margin: "1em 0em"}}><a href="impressum.html">Impressum</a> | <a href="#">Datenschutz</a></p>
            </footer>

            <Script id="sticky-nav-and-scrolltop-subpage" strategy="afterInteractive">
                {`
  const nav = document.getElementById('mainNav');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  // Die Startklasse auf der Unterseite ist 'nav-initial'
  const NAV_INITIAL_CLASS = 'nav-initial';
  const NAV_SCROLLED_CLASS = 'nav-scrolled';

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        // Beim Scrollen wird der verkleinerte Zustand gesetzt
        nav.classList.add(NAV_SCROLLED_CLASS);
        nav.classList.remove(NAV_INITIAL_CLASS);
      } else {
        // Beim Zurückscrollen nach ganz oben wird der initiale Zustand gesetzt
        nav.classList.add(NAV_INITIAL_CLASS);
        nav.classList.remove(NAV_SCROLLED_CLASS);
      }
    });
    
    // Wichtig: Beim Laden der Seite direkt auf den Startzustand prüfen
    // Wenn die Seite bereits gescrollt geladen wird, sollte der gescrollte Zustand aktiv sein.
    if (window.scrollY > 50) {
        nav.classList.add(NAV_SCROLLED_CLASS);
        nav.classList.remove(NAV_INITIAL_CLASS);
    }
  }

  // Logik für den Scroll-to-Top-Button bleibt unverändert
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
    
    // Zustand beim Laden prüfen
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    }
  }
`}
            </Script>
        </div>
    );
}
