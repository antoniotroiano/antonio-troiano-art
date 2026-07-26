"use client";

import { FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

export default function SocialLinksMinimal() {
    return (
        <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
            <a href="https://instagram.com/antonio.troiano.art/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ opacity: 0.8 }}>
                <FaInstagram size={22} />
            </a>
            <a href="https://youtube.com/@antoniotroiano4806" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ opacity: 0.8 }}>
                <FaYoutube size={22} />
            </a>
            <a href="https://de.pinterest.com/art_by_antonio_troiano/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ opacity: 0.8 }}>
                <FaPinterest size={22} />
            </a>
        </div>
    );
}