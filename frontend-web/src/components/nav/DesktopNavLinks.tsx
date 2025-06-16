"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {motion} from "framer-motion";
import {navItems} from "@/types/navItems";

export default function DesktopNavLinks() {
    const pathname = usePathname();

    return (
        <ul className="hidden md:flex items-center space-x-8 text-gray-800 text-md font-bold uppercase mr-10">
            {navItems.map(({href, label}) => {
                const isActive = pathname === href;
                return (
                    <li key={href} className="relative">
                        <Link href={href} className={`relative px-1 py-1 transition-colors duration-200 ${
                            isActive ? "text-purple-700 font-semibold" : "hover:text-purple-600"
                        }`}>
                            {label}
                        </Link>
                        {isActive && (
                            <motion.div layoutId="underline" initial={{width: 0}} animate={{width: "100%"}}
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-600 rounded-full"
                                        transition={{
                                            type: "spring", stiffness: 250, damping: 30, duration: 0.4,
                                        }}/>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
