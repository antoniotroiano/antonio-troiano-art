import {aboutSections} from "@/data/aboutText";
import {ArtistImage} from "@/components/ArtistImage";

export const metadata = {
    title: 'About – Antonio Troiano Art',
    description: 'Discover Antonio Troiano’s journey as an artist – from early inspirations to his distinctive, ever-evolving abstract style. Learn more about the passion behind each acrylic creation.',
    keywords: [
        'Antonio Troiano',
        'About Antonio Troiano',
        'Contemporary Artist',
        'Artist Biography',
        'Modern Abstract Art',
        'Italian Artist',
        'Artist Story',
        'Antonio Troiano Biography',
    ],
    alternates: {
        canonical: 'https://antonio-troiano.de/about',
    },
    openGraph: {
        title: 'About – Antonio Troiano Art',
        description: 'Learn about Antonio Troiano, his inspirations, techniques and personal artistic evolution.',
        url: 'https://antonio-troiano.de/about',
        siteName: 'Antonio Troiano Art',
        images: [
            {
                url: "https://ik.imagekit.io/atart/titel-og.webp",
                width: 1200,
                height: 800,
                alt: 'Portrait of Antonio Troiano',
            },
        ],
        locale: 'de_DE',
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About – Antonio Troiano Art',
        description: 'Meet Antonio Troiano – a contemporary artist blending emotion and abstraction.',
        images: ['https://ik.imagekit.io/atart/titel-og.webp'],
    },
};

export default function About() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About – Antonio Troiano Art',
        url: 'https://antonio-troiano.de/about',
        description: 'Discover Antonio Troianos journey as an artist — from early inspirations to his distinctive abstract style.',
        mainEntity: {
            '@type': 'Person',
            name: 'Antonio Troiano',
            sameAs: [
                'https://www.instagram.com/antonio.troiano.art',
                'https://antonio-troiano.de'
            ]
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <div className="flex flex-col pt-35 px-7 pb-30 items-center">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">My Artistic Journey</h1>
                <blockquote
                    className="glassmorphism-bg-infobox p-5 text-center italic max-w-2xl mx-auto mb-15 text-lg text-gray-800">
                    "Discover the journey, passion, and inspirations behind my art. Learn more about my story and
                    creative process."
                </blockquote>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl gap-15 md-gap-0">
                    <div
                        className="bg-white/30 backdrop-blur-md p-7 rounded-xl shadow-xl border border-white/20 space-y-8">
                        {aboutSections.map(({title, body}, idx) => (
                            <div key={idx}>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
                                <p className="text-lg text-gray-700 leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-start justify-center pt-0 pt-15:sm">
                        <ArtistImage src="/about_582x776.png" alt="Portrait of the artist"/>
                    </div>
                </div>
            </div>
        </>
    );
}
