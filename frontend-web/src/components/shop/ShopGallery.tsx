import {ShopCard} from "@/components/shop/ShopCard";
import {ShopImage} from "@/types/shopImages";

type Props = {
    shopImages: ShopImage[];
};

export default async function ShopGallery({shopImages}: Props) {

    return (
        <>
            <div className="flex flex-col pt-35 px-7 pb-30 items-center">
                <div
                    className="bg-white/45 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-md max-w-2xl mx-auto mb-15 text-center">
                    <div className="flex justify-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 16l4-4 4 4m4 0l4-4 4 4"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Original Works for Sale</h1>
                    <p className="text-gray-800 text-lg italic md:text-xl leading-relaxed">
                        "Explore a curated collection of original artworks – ready to bring creativity, depth, and
                        inspiration into your space."
                    </p>
                </div>
                <div className="w-full max-w-7xl">
                    <div className="gap-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
                        {shopImages.map((shopImages) => (
                            <ShopCard key={shopImages.id} shopImage={shopImages}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
