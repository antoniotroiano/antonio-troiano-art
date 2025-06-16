import Link from "next/link";
import MobileMenuToggle from "./MobileMenuToggle";
import DesktopNavLinks from "./DesktopNavLinks";

export default function Nav() {
    return (
        <nav aria-label="Hauptnavigation"
             className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 border-b border-white/40 glassmorphism-bg px-6 py-4 flex items-center justify-between">
            <Link href="/">
                <img src="/logo.png" alt="Antonio Troiano Logo" className="h-22 w-70 object-cover"/>
            </Link>
            <DesktopNavLinks/>
            <MobileMenuToggle/>
        </nav>
    );
}
