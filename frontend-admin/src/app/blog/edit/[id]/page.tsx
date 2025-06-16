"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {fetchSinglePost, updatePost} from '@/lib/api/blog';

export default function EditBlog() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [post, setPost] = useState({
        title: "",
        author: "",
        date: "",
        category: "",
        description: "",
        content: "",
        cover: "",
    });

    useEffect(() => {
        if (id) {
            fetchSinglePost(id)
                .then((data) => setPost(data))
                .catch((err) => console.error(err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost({...post, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await updatePost(id, post);
            router.push("/blog");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="grid grid-cols-1 pt-10 pb-10 justify-center items-center px-6 mx-auto w-full xl:max-w-7xl max-w-5xl">
            <div className="text-5xl my-5">Edit blog post</div>
            <div className="flex">
                <Link href="/blog"
                      className="my-5 py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Back
                </Link>
                <div className="mt-6.5">
                    <LogoutButton/>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2">
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Title</span>
                            <input type="text" name="title" value={post.title} onChange={handleChange}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Author</span>
                            <input type="text" name="author" value={post.author} onChange={handleChange}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Date</span>
                            <input type="date" name="date" value={post.date} onChange={handleChange}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Cover</span>
                            <input type="text" name="cover" value={post.cover} onChange={handleChange}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Category</span>
                            <input type="text" name="category" value={post.category} onChange={handleChange}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Description</span>
                            <input type="text" name="description" value={post.description} onChange={handleChange}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 pb-6 w-full max-w-xl">
                        <label className="block">
                            <span>Content</span>
                            <textarea rows={7} name="content" value={post.content} onChange={handleChange}
                                      className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                </div>
                <button type="submit"
                        className="py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Edit blog post
                </button>
            </form>
        </div>
    );
}
