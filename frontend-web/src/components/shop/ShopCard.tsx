"use client";

import {LazyMotion, domAnimation, motion} from "framer-motion";
import {ShopImage} from "@/types/shopImages";
import {Image} from '@imagekit/next';
import {withImageKitTransform} from "@/lib/utils/imagekitUrl";

interface ShopImagesCardProps {
    shopImage: ShopImage;
}

export function ShopCard({shopImage}: ShopImagesCardProps) {
    return (
        <LazyMotion features={domAnimation}>
            <motion.div key={shopImage.id} initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}}
                        className="relative group overflow-hidden rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                        transition={{duration: 0.5, type: "spring", stiffness: 100}}>
                <Image urlEndpoint="https://ik.imagekit.io/atart"
                       src={withImageKitTransform(shopImage.shopImageUrls[0], "w-400")} alt={shopImage.title}
                       title={shopImage.title} width={400} height={400} decoding="async"
                       sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                       className="hide-on-touch w-full aspect-square object-cover rounded-t-xl rounded-l-xl rounded-r-xl rounded-b-none transition-all duration-300"/>
                <a href={`/shop/${shopImage.id}`} className="flex hide-on-touch">
                    <motion.div initial={{opacity: 0}} whileHover={{opacity: 1}} transition={{duration: 0.3}}
                                className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex flex-col justify-center items-center text-white transition-all duration-300">
                        <motion.div className="text-lg font-semibold tracking-wide" initial={{opacity: 0}}
                                    animate={{opacity: 1}} transition={{duration: 0.3, delay: 0.2}}>
                            {shopImage.title} · {shopImage.year}
                        </motion.div>
                        <motion.div className="text-sm mt-1" initial={{opacity: 0}} animate={{opacity: 1}}
                                    transition={{duration: 0.3, delay: 0.3}}>
                            {shopImage.price}
                        </motion.div>
                    </motion.div>
                </a>
                <a href={`/shop/${shopImage.id}`} className="show-on-touch">
                    <Image urlEndpoint="https://ik.imagekit.io/atart" src={shopImage.shopImageUrls[0]}
                           alt={shopImage.title} title={shopImage.title} width={400} height={400} decoding="async"
                           sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                           className="w-full aspect-square object-cover rounded-t-2xl rounded-l-2xl rounded-r-2xl rounded-b-none transition-all duration-300"/>
                </a>
                <div className="block show-on-touch mt-2 mb-2 text-center">
                    <a href={`/shop/${shopImage.id}`} className="text-gray-900 font-semibold text-base">
                        {shopImage.title} · {shopImage.year}
                        <div className="text-gray-700 text-sm mt-1">{shopImage.price}</div>
                    </a>
                </div>
            </motion.div>
        </LazyMotion>
    );
}
