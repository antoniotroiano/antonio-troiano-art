"use client";

import {useEffect, useMemo, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {Image} from '@imagekit/next';
import clsx from 'clsx';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import {PortfolioImage} from "@/types/portfolio";
import {withImageKitTransform} from '@/lib/utils/imagekitUrl';

type Props = {
    portfolio: PortfolioImage[];
    availableYears: number[];
    availableTags: string[];
};

export default function PortfolioGallery({portfolio, availableYears, availableTags}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            const yearParam = searchParams.get('year');
            setSelectedYear(yearParam ? parseInt(yearParam, 10) : null);
            const tagParam = searchParams.get('tag');
            setSelectedTag(tagParam || null);
            setInitialized(true);
        }
    }, [searchParams, initialized]);

    const updateURL = (year: number | null, tag: string | null) => {
        const params = new URLSearchParams();
        if (year !== null) params.set('year', year.toString());
        if (tag !== null) params.set('tag', tag);
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    };

    const handleYearClick = (year: number) => {
        const newYear = selectedYear === year ? null : year;
        setSelectedYear(newYear);
        updateURL(newYear, selectedTag);
    };

    const handleTagClick = (tag: string) => {
        const newTag = selectedTag === tag ? null : tag;
        setSelectedTag(newTag);
        updateURL(selectedYear, newTag);
    };

    const filtered = useMemo(() =>
        portfolio.filter(item =>
            (!selectedYear || item.year === selectedYear) &&
            (!selectedTag || item.tags.includes(selectedTag))
        ), [portfolio, selectedYear, selectedTag]
    );

    return (
        <div className="pt-35 px-7 pb-30 max-w-7xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">A selection of my
                artworks</h1>
            <blockquote
                className="glassmorphism-bg-infobox p-5 text-center italic max-w-2xl mx-auto mb-10 text-lg text-gray-800">
                "Each piece tells its own story – a journey through color, texture, and emotion. Discover recent works
                fresh from my studio."
            </blockquote>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
                <div className="flex flex-wrap gap-2">
                    {availableYears.map(year => (
                        <button key={year} onClick={() => handleYearClick(year)}
                                className={clsx("rounded-full border border-violet-200 text-[#7f5af0] text-sm px-4 py-2 transition-colors",
                                    selectedYear === year ? "bg-[#e6e0ff]" : "bg-[#f3f0ff] hover:bg-[#e6e0ff]")}>
                            {year}
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2 overflow-x-auto">
                    {availableTags.filter(tag => tag.trim() !== "").map(tag => (
                        <button key={tag} onClick={() => handleTagClick(tag)}
                                className={clsx("rounded-full border border-violet-200 text-[#7f5af0] text-sm px-4 py-2 transition-colors",
                                    selectedTag === tag ? "bg-[#e6e0ff]" : "bg-[#f3f0ff] hover:bg-[#e6e0ff]")}>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            {filtered.length === 0 ? (
                <p className="text-neutral-500 text-center">No artworks found.</p>
            ) : (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-9 space-y-12">
                    {filtered.map((item, idx) => (
                        <div key={item.id} className="break-inside-avoid">
                            <div className="group relative overflow-hidden rounded-lg shadow-md cursor-zoom-in"
                                 onClick={() => setLightboxIndex(idx)}>
                                <Image urlEndpoint="https://ik.imagekit.io/atart"
                                       src={withImageKitTransform(item.imageUrls[0], "w-600,q-70")} alt={item.title}
                                       title={item.title} width={600} height={800} decoding="async"
                                       sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                       className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"/>
                                <div className="absolute bottom-0 w-full bg-black/60 text-white px-3 py-2 text-sm">
                                    {item.title} · {item.year}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {lightboxIndex !== null && (
                <Lightbox open index={lightboxIndex} close={() => setLightboxIndex(null)}
                          slides={filtered.map(item => ({
                              src: "https://ik.imagekit.io/atart" + withImageKitTransform(item.imageUrls[0], "w-1200,q-70"),
                              alt: item.title, description: `${item.title} · ${item.year}`,
                          }))} animation={{fade: 50}}
                />
            )}
        </div>
    );
}
