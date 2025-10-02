"use client";

import {ShopImageDetail} from "@/types/shopImages";
import {Image} from '@imagekit/next';
import {useState} from "react";
import {motion} from "framer-motion";
import {ChevronDown} from "lucide-react";
import {withImageKitTransform} from "@/lib/utils/imagekitUrl";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

interface ShopImagesCardProps {
    shopImageDetail: ShopImageDetail;
}

export function ShopDetailCard({shopImageDetail}: ShopImagesCardProps) {
    const [mainImage, setMainImage] = useState(shopImageDetail.shopImageUrls[0]);
    const [zoomPosition, setZoomPosition] = useState({x: 50, y: 50});
    const [isZooming, setIsZooming] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const {left, top, width, height} = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({x, y});
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-start">
            <div className="flex flex-col items-center space-y-6">
                <h1 className="text-4xl font-semibold text-gray-800 block lg:hidden mb-7 self-start">
                    {shopImageDetail.title}
                </h1>
                <div className="w-full max-w-xl overflow-hidden rounded-xl shadow-xl border border-white/20"
                     onMouseMove={handleMouseMove} onMouseEnter={() => setIsZooming(true)}
                     onMouseLeave={() => setIsZooming(false)}>
                    <Image urlEndpoint="https://ik.imagekit.io/atart" width={1000} height={800} loading="lazy"
                           src={withImageKitTransform(mainImage, "w-1000,q-70")} alt={shopImageDetail.title}
                           title={shopImageDetail.title}
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                           className={`w-full h-auto transition-transform duration-300 ease-in-out rounded-xl ${isZooming ? "md:scale-150" : ""}`}
                           style={{transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`}}/>
                </div>
                <div className="flex mt-2 flex-wrap justify-center gap-2">
                    {shopImageDetail.shopImageUrls.map((img, i) => (
                        <button key={i} onClick={() => setMainImage(img)}
                                className={`w-20 h-20 border-2 rounded-xl overflow-hidden transition hover:border-pastel-blue ${
                                    mainImage === img ? "border-pastel-blue" : "border-transparent"
                                }`}>
                            <Image urlEndpoint="https://ik.imagekit.io/atart"
                                   src={withImageKitTransform(img, "w-300,q-70")} alt={`Thumbnail ${i + 1}`} width={300}
                                   height={300} loading="lazy" sizes="100px"
                                   className="w-full aspect-square object-cover"/>
                        </button>
                    ))}
                </div>
            </div>
            <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
                        className="bg-white/10 backdrop-blur-lg p-7 rounded-3xl shadow-xl border border-white/30 space-y-6"
                        transition={{duration: 0.4, ease: "easeOut"}}>
                <h1 className="text-4xl font-semibold text-gray-800 hidden lg:block">
                    {shopImageDetail.title}
                </h1>
                <div className="prose text-base text-gray-600 leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkBreaks]} rehypePlugins={[rehypeRaw as any]}>
                        {shopImageDetail.description}
                    </ReactMarkdown>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-xl text-gray-700">{shopImageDetail.price}</span>
                    {shopImageDetail.sold && (
                        <span className="text-base font-semibold text-red-500 bg-red-100 px-3 py-1 rounded-full">
                            Sold
                        </span>
                    )}
                </div>
                {shopImageDetail.youTubeLink && (
                    <div>Watch <a href={shopImageDetail.youTubeLink} target="_blank" rel="noopener noreferrer"
                                  className="text-base text-indigo-400 hover:text-indigo-950">YouTube</a> Video
                    </div>
                )}
                <div>
                    Contact me for purchase inquiry: <a href="/contact"
                                                        className="text-indigo-400 hover:text-indigo-950">Contact</a>
                </div>
                <div className="border-t pt-4">
                    <button onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-between w-full text-gray-700 text-lg hover:text-black">
                        Product details
                        <motion.div animate={{rotate: isOpen ? 180 : 0}} transition={{duration: 0.3}}>
                            <ChevronDown size={24}/>
                        </motion.div>
                    </button>
                    {isOpen && (
                        <div className="mt-5 space-y-2 text-base text-gray-700">
                            <div><strong>Year: </strong>{shopImageDetail.year}</div>
                            <div><strong>Size: </strong>{shopImageDetail.size}</div>
                            <div><strong>Technique: </strong>{shopImageDetail.technique}</div>
                        </div>
                    )}
                </div>
                <button onClick={() => history.back()}
                        className="mt-4 inline-block px-4 py-2 text-sm border border-violet-200 text-slate-700 backdrop-blur bg-white/30 hover:bg-violet-100 hover:text-slate-900 rounded-lg shadow-md transition">
                    Back
                </button>
            </motion.div>
        </div>
    );
}
