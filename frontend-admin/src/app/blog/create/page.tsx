"use client";

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {createPost} from '@/lib/api/blog';

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [cover, setCover] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postData = {title, author, date, cover, category, description, content};

        try {
            await createPost(postData);
            router.push('/blog');
        } catch (error) {
            console.error('Fehler beim Erstellen des Beitrags', error);
        }
    };

    return (
        <div
            className="grid grid-cols-1 pt-10 pb-10 justify-center items-center px-6 mx-auto w-full xl:max-w-7xl max-w-5xl">
            <div className="text-5xl my-5">Create blog post</div>
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
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Author</span>
                            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Date</span>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Cover</span>
                            <input type="text" value={cover} onChange={(e) => setCover(e.target.value)}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Category</span>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 w-full max-w-xl">
                        <label className="block">
                            <span>Description</span>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                                   className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                    <div className="p-3 pb-6 w-full max-w-xl">
                        <label className="block">
                            <span>Content</span>
                            <textarea rows={7} value={content} onChange={(e) => setContent(e.target.value)}
                                      className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                        </label>
                    </div>
                </div>
                <button type="submit"
                        className="py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Create blog post
                </button>
            </form>
        </div>
    );
}
