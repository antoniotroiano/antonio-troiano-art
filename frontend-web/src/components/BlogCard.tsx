"use client";

import {motion} from "framer-motion";
import {BlogPost} from "@/types/post";
import {Image} from "@imagekit/next";
import {withImageKitTransform} from "@/lib/utils/imagekitUrl";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({post}: BlogCardProps) {
    return (
        <motion.article initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}}
                        className="flex flex-col gap-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-md hover:shadow-lg rounded-xl p-4 transition-transform hover:scale-[1.015]"
                        transition={{duration: 0.6, type: "spring", stiffness: 100}}>
            <a href={`/blog/${post.id}`}>
                <Image urlEndpoint="https://ik.imagekit.io/atart" src={withImageKitTransform(post.cover, "w-600,q-70")}
                       alt={`Cover image for ${post.title}`} title={post.title} width={600} height={400}
                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                       className="w-full h-auto object-cover rounded-xl mb-2" loading="lazy"/>
            </a>
            <div className="flex items-center justify-between text-xs">
                <time dateTime={post.date} className="text-gray-500">
                    {post.date}
                </time>
                <span
                    className="rounded-full border border-violet-200 bg-[#f3f0ff] text-[#7f5af0] px-3 py-1.5 font-medium hover:bg-[#e6e0ff] transition-colors">
                    {post.category}
                </span>
            </div>
            <a href={`/blog/${post.id}`}>
                <div className="group">
                    <h2 className="mt-2 text-lg font-semibold text-gray-800 transition-colors">
                        {post.title}
                    </h2>
                    <motion.p className="mt-3 text-sm text-gray-600 line-clamp-3" initial={{opacity: 0}}
                              animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.2}}>
                        {post.description}
                    </motion.p>
                </div>
            </a>
        </motion.article>
    );
}
