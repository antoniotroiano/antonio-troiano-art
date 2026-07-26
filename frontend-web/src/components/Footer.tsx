import SocialLinksGlass from "@/components/social/SocialLinksGlass";

export default function Footer() {
    return (
        <footer className="footer-styles">
            <SocialLinksGlass />
            <p>
                &copy; 2026 Antonio Troiano - Alle Rechte vorbehalten.
            </p>
            <p>
                <a className="link" href="/imprint"><span>Impressum</span></a> |{" "}
                <a className="link" href="imprint/privacypolicy"><span>Datenschutzerklärung</span></a>
            </p>
        </footer>
    );
}