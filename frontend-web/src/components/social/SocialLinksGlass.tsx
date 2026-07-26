"use client";

import { useEffect, useRef } from "react";
import { FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

export default function SocialLinksGlass() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el?.classList.add("social-visible");
                }
            },
            { threshold: 0.3 }
        );

        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="social-glass social-hidden">
            <a href="https://instagram.com/antonio.troiano.art/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-glass-btn" >
                <FaInstagram size={18} />
            </a>
            <a href="https://youtube.com/@antoniotroiano4806" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-glass-btn">
                <FaYoutube size={18} />
            </a>
            <a href="https://de.pinterest.com/art_by_antonio_troiano/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-glass-btn">
                <FaPinterest size={18} />
            </a>
        </div>
    );
}