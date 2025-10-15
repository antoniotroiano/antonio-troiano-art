import "../testPage.css"
import Script from "next/script";

export default function Page() {
    return (
        <div>
            <button id="scrollTopBtn" title="Nach oben">&#8679;</button>

            <nav className="main-nav nav-initial " id="mainNav">
                <a href="../test" className="logo">Antonio Troiano Art</a>
                <div className="nav-links">
                    <a href="../test/#portfolio">Portfolio</a>
                    <a href="../test/#shop">Shop</a>
                    <a href="../test/#blog">Blog</a>
                    <a href="../test/#künstler">Künstler</a>
                    <a href="../test/#kontakt">Kontakt</a>
                </div>
            </nav>

            <main style={{paddingTop: "40px"}}>
                <section className="section-padding">
                    <section className="section">
                        <h1 className="section-title">Shop</h1>
                        <div className="shop-grid">
                            <a href="shop/details" className="product-card">
                                <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500"
                                     alt="Kunstwerk"/>
                                <div className="product-card-info">
                                    <h3>Abstrakte Träume</h3>
                                    <p className="price">120,00 €</p>
                                </div>
                            </a>
                            <a href="shop/details" className="product-card">
                                <img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500"
                                     alt="Kunstwerk"/>
                                <div className="product-card-info">
                                    <h3>Das Farbenspiel</h3>
                                    <p className="price">250,00 €</p>
                                </div>
                            </a>
                            <a href="shop/details" className="product-card">
                                <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500"
                                     alt="Kunstwerk"/>
                                <div className="product-card-info">
                                    <h3>Abstrakte Träume</h3>
                                    <p className="price">120,00 €</p>
                                </div>
                            </a>
                            <a href="shop/details" className="product-card">
                                <img src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=500"
                                     alt="Kunstwerk"/>
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
