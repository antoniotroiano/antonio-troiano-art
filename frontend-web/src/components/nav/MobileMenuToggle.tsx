"use client";

import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {navItems} from "@/types/navItems";

export default function MobileMenuToggle() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
                    className="z-50 flex flex-col justify-center items-center w-8 h-8 gap-1 md:hidden">
                <span className={`block w-6 h-0.5 bg-purple-800 rounded transition-transform origin-center ${
                    menuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}/>
                <span className={`block w-6 h-0.5 bg-purple-800 rounded transition-opacity ${
                    menuOpen ? "opacity-0" : "opacity-100"
                }`}/>
                <span className={`block w-6 h-0.5 bg-purple-800 rounded transition-transform origin-center ${
                    menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}/>
            </button>
            <ul
                className={`fixed top-0 left-0 w-full h-screen bg-white/90 backdrop-blur-md flex flex-col items-center justify-center space-y-10 text-lg font-bold uppercase transform transition-transform ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                } md:hidden z-40 overflow-y-auto`}>
                {navItems.map(({href, label}) => {
                    return (
                        <li key={href} className="relative">
                            <Link href={href} onClick={() => setMenuOpen(false)}
                                  className={`relative px-1 py-1 transition-colors duration-200 ${
                                      pathname === href ? "text-purple-700 font-semibold" : "hover:text-purple-600"
                                  }`}>
                                {label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}
