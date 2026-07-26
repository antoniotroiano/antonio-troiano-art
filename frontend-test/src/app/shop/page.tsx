import Script from "next/script";
import MainNav from "src/components/MainNav";

export default function Page() {
    return (
        <div>
            <button id="scrollTopBtn" title="Nach oben">&#8679;</button>

            <MainNav initial />

            <main style={{ paddingTop: "40px" }}>
                <section className="section-padding">
                    <section className="section">
                        <h1 className="section-title">Shop</h1>
                        <div className="shop-grid">
                            <a href="shop/details" className="product-card">
                                <img src="https://ik.imagekit.io/atart/2024_no9_1.webp?updatedAt=1750413052911"
                                    alt="Kunstwerk" />
                                <div className="product-card-info">
                                    <h3>Abstrakte Träume</h3>
                                    <p className="price">120,00 €</p>
                                </div>
                            </a>
                            <a href="shop/details" className="product-card">
                                <img src="https://ik.imagekit.io/atart/2024_no6_1.webp?updatedAt=1750413052946"
                                    alt="Kunstwerk" />
                                <div className="product-card-info">
                                    <h3>Das Farbenspiel</h3>
                                    <p className="price">250,00 €</p>
                                </div>
                            </a>
                            <a href="shop/details" className="product-card">
                                <img src="https://ik.imagekit.io/atart/2024_no14_1.webp?updatedAt=1750413036742"
                                    alt="Kunstwerk" />
                                <div className="product-card-info">
                                    <h3>Abstrakte Träume</h3>
                                    <p className="price">120,00 €</p>
                                </div>
                            </a>
                            <a href="shop/details" className="product-card">
                                <img src="https://ik.imagekit.io/atart/2024_no9_1.webp?updatedAt=1750413052911"
                                    alt="Kunstwerk" />
                                <div className="product-card-info">
                                    <h3>Das Farbenspiel</h3>
                                    <p className="price">250,00 €</p>
                                </div>
                            </a>
                        </div>
                    </section>
                </section>
            </main>

            <footer>
                <p style={{ margin: "1em 0em" }}>&copy; 2025 Dein Name - Alle Rechte vorbehalten.</p>
                <p style={{ margin: "1em 0em" }}><a href="impressum.html">Impressum</a> | <a href="#">Datenschutz</a></p>
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
