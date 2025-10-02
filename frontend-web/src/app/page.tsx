import {Image} from '@imagekit/next';
import InstagramFeed from "@/components/InstagramFeed";
import {indexTextSection} from "@/data/indexText";
import SelectedWorks from "@/components/SelectedWorks";
import {defaultKeywords} from "@/lib/seo/keywords";
import {withImageKitTransform} from "@/lib/utils/imagekitUrl";

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export const metadata = {
    title: 'Antonio Troiano Art – Handcrafted Art That Speaks',
    description: 'Experience the abstract world of Antonio Troiano. Unique paintings that tell visual stories and express raw emotions. Contemporary, handcrafted art full of meaning, color, and depth.',
    keywords: defaultKeywords,
    alternates: {
        canonical: 'https://antonio-troiano.de',
    },
    openGraph: {
        title: 'Antonio Troiano Art – Handcrafted Art That Speaks',
        description: 'Emotional and modern art pieces by Antonio Troiano – explore selected works and stay inspired.',
        url: 'https://antonio-troiano.de',
        siteName: 'Antonio Troiano Art',
        images: [
            {
                url: 'https://ik.imagekit.io/atart/titel-og.webp',
                width: 1200,
                height: 630,
                alt: 'Antonio Troiano Titelbild',
            },
        ],
        locale: 'de_DE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Antonio Troiano Art – Handcrafted Art That Speaks',
        description: 'Modern and emotional art by Antonio Troiano – discover selected works and the story behind them.',
        images: ['https://ik.imagekit.io/atart/titel-og.webp'],
    },
};

export default function Home() {
    return (
        <div className="flex flex-col items-center pt-35 px-7 pb-30">
            <section
                className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh] flex items-center justify-center text-white overflow-hidden">
                <Image urlEndpoint="https://ik.imagekit.io/atart"
                       src={withImageKitTransform("/titel.webp", "w-1600,q-60")} alt="Antonio Troiano Titelbild"
                       title="Antonio Troiano Art" fill className="object-cover brightness-75"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"/>
                <div className="absolute inset-0 bg-black/40"/>
                <div className="relative z-10 text-center px-4 max-w-3xl animate-fadeIn">
                    <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg">Antonio Troiano Art</h1>
                    <p className="mt-4 text-xl md:text-2xl font-light drop-shadow-md">
                        Where emotions take shape — handcrafted art that tells my story.
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
                className="fade-in-up max-w-3xl text-center mb-30 p-6 backdrop-blur-xl bg-white/25 border border-white/30 rounded-2xl shadow-md">
                {indexTextSection.map(({title, body}, idx) => (
                    <div key={idx}>
                        <h2 className="text-3xl font-bold mb-6">{title}</h2>
                        <p className="leading-relaxed text-gray-800 text-lg">{body}</p>
                    </div>
                ))}
            </section>
            <section className="fade-in-up max-w-6xl w-full">
                <InstagramFeed/>
            </section>
        </div>
    );
}
