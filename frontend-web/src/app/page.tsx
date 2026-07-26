import Portfolio from "@/components/portfolio/Portfolio";
import React from "react";
import MainNav from "@/components/MainNav";
import Shop from "@/components/shop/Shop";
import Blog from "@/components/blog/Blog";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/Footer";
import Artist from "@/components/about/Artist";
import HeroVideo from "@/components/HeroVideo";
import type { Metadata } from "next";
import ArtContext from "@/components/ArtContext";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Antonio Troiano – Abstrakte Kunst & Moderne Gemälde kaufen",
    description:
        "Antonio Troiano ist Künstler für abstrakte Kunst und moderne Gemälde. Entdecke einzigartige, handgefertigte Originale voller Emotion und Farbe.",
    keywords: [
        "Antonio Troiano",
        "Abstrakte Kunst",
        "Moderne Kunst",
        "Gemälde kaufen",
        "Kunst online kaufen",
        "Abstrakte Malerei",
        "Original Kunstwerk",
        "Künstler Deutschland"
    ],
    alternates: {
        canonical: "https://antonio-troiano.de",
    },
    openGraph: {
        title: "Antonio Troiano – Abstrakte Kunst & Moderne Gemälde",
        description:
            "Moderne abstrakte Kunstwerke von Antonio Troiano. Entdecke ausdrucksstarke Originale und handgefertigte Gemälde.",
        url: "https://antonio-troiano.de",
        siteName: "Antonio Troiano",
        images: [
            {
                url: "https://ik.imagekit.io/atart/titel-og.webp",
                width: 1200,
                height: 630,
                alt: "Abstraktes Gemälde von Antonio Troiano",
            },
        ],
        locale: "de_DE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Antonio Troiano – Abstrakte Kunst",
        description:
            "Abstrakte und moderne Gemälde von Antonio Troiano. Jetzt einzigartige Kunstwerke entdecken.",
        images: ["https://ik.imagekit.io/atart/titel-og.webp"],
    },
};

export default function Home() {

    return (
        <div>
            {/* https://videos.pexels.com/video-files/853874/853874-hd_1920_1080_25fps.mp4 */}
            <button id="scrollTopBtn" title="Nach oben">&#8679;</button>
            <MainNav />
            <header className="hero-section">
                <HeroVideo />
                <div className="glass-panel">
                    <h1>Abstrakte & moderne Kunst</h1>
                    <p>Willkommen in einer Welt, in der jede Leinwand eine Geschichte erzählt.</p>
                </div>
            </header>
            <main>
                <section className="section-padding section-gradient-artist-context section-has-grain">
                    <ArtContext />
                </section>
                <section id="portfolio" className="section-padding">
                    <Portfolio />
                </section>
                <section id="shop" className="section-padding section-gradient-gallery-ink section-has-grain">
                    <Shop />
                </section>
                <section id="blog" className="section-padding">
                    <Blog />
                </section>
                <section id="kontakt" className="section-padding section-gradient-from-image section-has-grain">
                    <Contact />
                </section>
                <section id="künstler" className="section-padding">
                    <Artist />
                </section>
            </main>
            <Footer />
        </div >
    );
}
