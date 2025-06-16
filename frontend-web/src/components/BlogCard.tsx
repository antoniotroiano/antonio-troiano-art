"use client";

import {motion} from "framer-motion";
import {BlogPost} from "@/types/post";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({post}: BlogCardProps) {
    return (
        <motion.article initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}}
                        className="flex flex-col gap-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-md hover:shadow-lg rounded-2xl p-6 transition-transform hover:scale-[1.015]"
                        transition={{duration: 0.6, type: "spring", stiffness: 100}}>
            <a href={`/blog/${post.id}`}>
                <motion.img src={`https://ik.imagekit.io/atart${post.cover}`} alt={`Cover image for ${post.title}`}
                            className="rounded-xl mb-2" initial={{scale: 0.95}} animate={{scale: 1}}
                            transition={{duration: 0.5}}/>
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
