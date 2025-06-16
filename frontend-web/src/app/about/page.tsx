import {aboutSections} from "@/data/aboutText";
import {ArtistImage} from "@/components/ArtistImage";

export const metadata = {
    title: "About – Antonio Troiano Art",
    description: "Discover Antonio Troiano's journey as an artist — from early inspirations to his distinctive abstract style.",
    keywords: [
        "Antonio Troiano",
        "About Antonio Troiano",
        "Contemporary Artist",
        "Artist Biography",
        "Modern Abstract Art",
        "Italian Artist",
        "Artist Story",
        "Antonio Troiano Biography"
    ],
    alternates: {
        canonical: "https://www.antonio-troiano.de/about",
    },
    openGraph: {
        title: "About – Antonio Troiano Art",
        description: "Learn about Antonio Troiano, his inspirations, techniques and personal artistic evolution.",
        url: "https://www.antonio-troiano.de/about",
        siteName: "Antonio Troiano Art",
        images: [
            {
                url: "https://www.antonio-troiano.de/images/IMG_2443.jpg",
                width: 1200,
                height: 800,
                alt: "Portrait of Antonio Troiano",
            },
        ],
        locale: "de_DE",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: "About – Antonio Troiano Art",
        description: "Meet Antonio Troiano – a contemporary artist blending emotion and abstraction.",
        images: ["https://www.antonio-troiano.de/images/IMG_2443.jpg"],
    },
};

export default function About() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About – Antonio Troiano Art",
        url: "https://www.antonio-troiano.de/about",
        description: "Discover Antonio Troiano's journey as an artist — from early inspirations to his distinctive abstract style.",
        mainEntity: {
            "@type": "Person",
            name: "Antonio Troiano",
            sameAs: [
                "https://www.instagram.com/antonio.troiano.art",
                "https://www.antonio-troiano.de"
            ]
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <div className="flex flex-col items-center justify-center pt-45 pb-20 px-13">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl">
                    <div
                        className="bg-white/30 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20 space-y-8">
                        {aboutSections.map(({title, body}, idx) => (
                            <div key={idx}>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
                                <p className="text-lg text-gray-700 leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-start justify-center">
                        <ArtistImage src="/IMG_2443.jpg" alt="Portrait of the artist"/>
                    </div>
                </div>
            </div>
        </>
    );
}
