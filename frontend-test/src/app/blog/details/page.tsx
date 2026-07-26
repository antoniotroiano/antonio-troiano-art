import Script from "next/script";
import MainNav from "src/components/MainNav";

export default function Page() {
  return (
    <div>
      <button id="goBackBtn" title="Zurück zur vorherigen Seite">&#x2190;</button>

      <MainNav initial />

      <main style={{ padding: "110px 0px" }}>
        <article className="section">
          <header className="article-header">
            <h1>Der kreative Prozess hinter 'Symphonie in Blau'</h1>
            <p className="meta">Von Dein Name | Veröffentlicht am 01. Oktober 2025</p>
          </header>
          <img src="https://ik.imagekit.io/atart/2024_no7.webp?updatedAt=1751314254580"
            alt="Pinsel und Farben" className="article-hero-image" />
          <div className="article-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
              tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
              diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
            <h2>Die erste Inspiration</h2>
            <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit
              amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
              Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum
              augue. Praesent egestas leo in pede.</p>
            <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit
              amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
              Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum
              augue. Praesent egestas leo in pede.</p>
          </div>
        </article>
      </main>

      <footer>
        <p style={{ margin: "1em 0em" }}>&copy; 2025 Dein Name - Alle Rechte vorbehalten.</p>
        <p style={{ margin: "1em 0em" }}><a href="impressum.html">Impressum</a> | <a href="#">Datenschutz</a></p>
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
