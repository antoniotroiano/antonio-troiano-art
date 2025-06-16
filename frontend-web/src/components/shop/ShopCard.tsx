"use client";

import {LazyMotion, domAnimation, motion} from "framer-motion";
import {ShopImage} from "@/types/shopImages";
import {Image} from '@imagekit/next';

interface ShopImagesCardProps {
    shopImage: ShopImage;
}

export function ShopCard({shopImage}: ShopImagesCardProps) {
    return (
        <LazyMotion features={domAnimation}>
            <motion.div key={shopImage.id} initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}}
                        className="relative group overflow-hidden rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                        transition={{duration: 0.5, type: "spring", stiffness: 100}}>
                <Image urlEndpoint="https://ik.imagekit.io/atart" src={shopImage.shopImageUrls[0]} alt={shopImage.title} width={400}
                       height={400} className="w-full aspect-square object-cover rounded-2xl" priority/>
                <a href={`/shop/${shopImage.id}`}>
                    <motion.div initial={{opacity: 0}} whileHover={{opacity: 1}} transition={{duration: 0.3}}
                                className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex flex-col justify-center items-center text-white transition-all duration-300">
                        <motion.div className="text-lg font-semibold tracking-wide" initial={{opacity: 0}}
                                    animate={{opacity: 1}} transition={{duration: 0.3, delay: 0.2}}>
                            {shopImage.title}
                        </motion.div>
                        <motion.div className="text-sm mt-1" initial={{opacity: 0}} animate={{opacity: 1}}
                                    transition={{duration: 0.3, delay: 0.3}}>
                            {shopImage.price}
                        </motion.div>
                    </motion.div>
                </a>
            </motion.div>
        </LazyMotion>
    );
}
