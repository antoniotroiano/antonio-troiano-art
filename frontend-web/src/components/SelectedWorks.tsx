import {Image} from '@imagekit/next';
import {fetchRandomShopImages} from "@/lib/api/fetchShop";

export default async function SelectedWorks() {
    const shopImages = await fetchRandomShopImages(3);

    if (!shopImages) {
        return <div className="text-center py-20">Loading...</div>;
    }

    return (
        <>
            <h2 className="text-3xl font-bold mb-10 text-center tracking-wide">
                Featured Artworks
            </h2>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {shopImages.map((shopImages) => (
                    <div key={shopImages.id}
                         className="start-artwork-card rounded-2xl overflow-hidden backdrop-blur-lg bg-white/30 border border-white/25 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                        {shopImages.shopImageUrls.length > 0 && (
                            <Image urlEndpoint="https://ik.imagekit.io/atart" src={shopImages.shopImageUrls[0]}
                                   alt={`Artwork #${shopImages.id}`} width={400} height={400}
                                   className="object-cover w-full h-80" priority/>
                        )}
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-900">{shopImages.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-10">
                <a href="/shop" className="text-lg text-gray-700 hover:text-black">
                    Show more
                </a>
            </div>
        </>
    );
}
