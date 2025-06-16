import {Image} from '@imagekit/next';
import InstagramFeed from "@/components/InstagramFeed";
import {indexTextSection} from "@/data/indexText";
import SelectedWorks from "@/components/SelectedWorks";

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export const metadata = {
    title: "Antonio Troiano Art – Handcrafted Art That Speaks",
    description: "Discover unique, handcrafted artworks by Antonio Troiano. Emotions turned into visual stories – paintings that speak to your soul.",
    keywords: [
        "Antonio Troiano",
        "Art",
        "Handcrafted Art",
        "Unique Paintings",
        "Contemporary Art",
        "Modern Artist",
        "Abstract Art",
        "Emotional Artworks"
    ],
    alternates: {
        canonical: "https://www.antonio-troiano.de",
    },
    openGraph: {
        title: "Antonio Troiano Art – Handcrafted Art That Speaks",
        description: "Emotional and modern art pieces by Antonio Troiano – explore selected works and stay inspired.",
        url: "https://www.antonio-troiano.de",
        siteName: "Antonio Troiano Art",
        images: [
            {
                url: "https://www.antonio-troiano.de/images/titel.webp",
                width: 1200,
                height: 630,
                alt: "Antonio Troiano Titelbild",
            },
        ],
        locale: "en_EN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Antonio Troiano Art – Handcrafted Art That Speaks",
        description: "Modern and emotional art by Antonio Troiano – discover selected works and the story behind them.",
        images: ["https://www.antonio-troiano.de/images/titel.webp"],
    },
};

export default function Home() {
    return (
        <main className="pt-37 min-h-screen flex flex-col items-center px-6 py-16 text-gray-900">
            <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
                <Image urlEndpoint="https://ik.imagekit.io/atart" src="/titel.webp" alt="Antonio Troiano Titelbild" fill
                       className="object-cover brightness-75" priority/>
                <div className="absolute inset-0 bg-black/40"/>
                <div className="relative z-10 text-center px-4 max-w-3xl animate-fadeIn">
                    <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg">
                        Antonio Troiano Art
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl font-light drop-shadow-md">
                        Where emotions take shape — handcrafted art that tells your story.
                    </p>
                    <a href="/portfolio"
                       className="inline-block mt-8 px-8 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:bg-gray-200 transition">
                        View portfolio
                    </a>
                </div>
            </section>
            <section className="fade-in-up pt-20 max-w-6xl w-full mb-20">
                <SelectedWorks/>
            </section>
            <section
                className="fade-in-up max-w-3xl text-center mb-20 p-10 backdrop-blur-xl bg-white/25 border border-white/30 rounded-3xl shadow-md">
                {indexTextSection.map(({title, body}, idx) => (
                    <div key={idx}>
                        <h2 className="text-3xl font-bold mb-6">{title}</h2>
                        <p className="leading-relaxed text-gray-800 text-lg">{body}</p>
                    </div>
                ))}
            </section>
            <section className="fade-in-up max-w-6xl w-full mb-20">
               <InstagramFeed/>
            </section>
        </main>
    );
}
