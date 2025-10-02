import Link from "next/link";
import MobileMenuToggle from "./MobileMenuToggle";
import DesktopNavLinks from "./DesktopNavLinks";
import Image from 'next/image';

export default function Nav() {
    return (
        <nav aria-label="Hauptnavigation"
             className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-white/40 glassmorphism-bg px-6 flex items-center justify-between pt-[env(safe-area-inset-top)]">
            <Link href="/" className="flex-shrink-0">
                <Image src="/logo_transparent_480x240.png" alt="Antonio Troiano Logo" title="Antonio Troiano Logo"
                       priority width={440} height={248} sizes="220px" className="w-[220px] h-auto object-cover"/>
            </Link>
            <DesktopNavLinks/>
            <MobileMenuToggle/>
        </nav>
    );
}
