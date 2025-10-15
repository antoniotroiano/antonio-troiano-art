import Script from "next/script";

export default function Page() {
    return (
        <div>
            <button id="goBackBtn" title="Zurück zur vorherigen Seite">&#x2190;</button>

            <nav className="main-nav nav-initial " id="mainNav">
                <a href=".." className="logo">Antonio Troiano Art</a>
                <div className="nav-links">
                    <a href="..#portfolio">Portfolio</a>
                    <a href="..#shop">Shop</a>
                    <a href="..#blog">Blog</a>
                    <a href="..#künstler">Künstler</a>
                    <a href="..#kontakt">Kontakt</a>
                </div>
            </nav>

            <main style={{padding: "80px 0px"}}>
                <section className="product-detail-section">
                    <div className="product-image">
                        <img src="https://ik.imagekit.io/atart/2024_no9_1.webp?updatedAt=1750413052911"
                             alt="Kunstwerk: Abstrakte Träume"/>
                    </div>
                    <div className="product-info">
                        <h1>Abstrakte Träume</h1>
                        <p className="price">120,00 €</p>
                        <p className="description">
                            Ein fesselndes Werk, das die Grenzen zwischen Traum und Wirklichkeit erkundet. Die
                            dynamische Komposition und die lebendigen Farben schaffen eine emotionale Tiefe, die den
                            Betrachter in ihren Bann zieht.
                        </p>
                        <ul className="product-specs">
                            <li><strong>Technik:</strong> Acryl auf Leinwand</li>
                            <li><strong>Größe:</strong> 80cm x 120cm</li>
                            <li><strong>Jahr:</strong> 2024</li>
                            <li><strong>Status:</strong> Verfügbar</li>
                        </ul>
                        <a href="mailto:deine-email@adresse.de?subject=Anfrage%20zum%20Kunstwerk%20'Abstrakte%20Träume'"
                           className="btn-glass-shop-request dark-text-on-light-bg">Kunstwerk anfragen</a>
                    </div>
                </section>
            </main>

            <footer>
                <p style={{margin: "1em 0em"}}>&copy; 2025 Dein Name - Alle Rechte vorbehalten.</p>
                <p style={{margin: "1em 0em"}}><a href="impressum.html">Impressum</a> | <a href="#">Datenschutz</a></p>
            </footer>

            <Script id="go-back-functionality" strategy="afterInteractive">
                {`
  const goBackBtn = document.getElementById('goBackBtn');

  if (goBackBtn) {
    goBackBtn.addEventListener('click', () => {
      // Nutzt die Browser-History, um zur vorherigen Seite zurückzukehren
      window.history.back();
    });
  }
`}
            </Script>

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
