"use client";

import { FaYoutube, FaWhatsapp, FaLink, FaPinterest } from "react-icons/fa";

export default function ArtworkShare({
    youtubeUrl,
    artworkUrl,
    imageUrl,
}: {
    youtubeUrl: string;
    artworkUrl: string;
    imageUrl: string;
}) {
    const copyLink = () => {
        navigator.clipboard.writeText(artworkUrl);
        alert("Link kopiert");
    };

    return (
        <div className="artwork-share">
            <a href={youtubeUrl} target="_blank" className="share-btn">
                <FaYoutube size={16} />Making-of Video
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(artworkUrl)}`} target="_blank" className="share-btn">
                <FaWhatsapp size={16} />Teilen
            </a>
            <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                artworkUrl
            )}&media=${encodeURIComponent(imageUrl)}`} target="_blank" className="share-btn" >
                <FaPinterest size={16} />Pin
            </a>
            <button onClick={copyLink} className="share-btn">
                <FaLink size={16} />Link kopieren
            </button>
        </div>
    );
}