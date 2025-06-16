"use client";

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {createPortfolio} from '@/lib/api/portfolio';

export default function CreatePortfolio() {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [tags, setTags] = useState<string[]>(["", "", ""]);
    const [imageUrls, setImageUrls] = useState<string[]>([""]);
    const router = useRouter();

    const handleTagChange = (index: number, value: string) => {
        const updatedTags = [...tags];
        updatedTags[index] = value;
        setTags(updatedTags);
    };

    const handleUrlChange = (index: number, value: string) => {
        const updatedUrls = [...imageUrls];
        updatedUrls[index] = value;
        setImageUrls(updatedUrls);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const portfolioData = {
            title, year, tags, imageUrls
        };

        try {
            await createPortfolio(portfolioData);
            router.push('/portfolio');
        } catch (error) {
            console.error('Error during creation of portfolio', error);
        }
    };

    return (
        <div
            className="grid grid-cols-1 pt-10 pb-10 justify-center items-center px-6 mx-auto w-full xl:max-w-7xl max-w-5xl">
            <div className="text-5xl my-5">Create portfolio</div>
            <div className="flex">
                <Link href="/portfolio"
                      className="my-5 py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Back
                </Link>
                <div className="mt-6.5">
                    <LogoutButton/>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2">
                    <div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Title</span>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Year</span>
                                <input type="text" value={year} onChange={(e) => setYear(e.target.value)}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        {imageUrls.map((url, index) => (
                            <div key={index} className="p-3 pb-6 w-full max-w-xl">
                                <label className="block">
                                    <span>Image URL {index + 1}</span>
                                    <input type="text" value={url}
                                           onChange={(e) => handleUrlChange(index, e.target.value)}
                                           className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div>
                        {tags.map((tag, index) => (
                            <div key={index} className="p-3 pb-6 w-full max-w-xl">
                                <label className="block">
                                    <span>Tag {index + 1}</span>
                                    <input type="text" value={tag}
                                           onChange={(e) => handleTagChange(index, e.target.value)}
                                           className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit"
                        className="py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Create portfolio
                </button>
            </form>
        </div>
    );
}
