"use client";

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {createImageShop} from '@/lib/api/shop';

export default function CreateImage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [technique, setTechnique] = useState('');
    const [year, setYear] = useState('');
    const [youTubeLink, setYouTubeLink] = useState('');
    const [sold, setSold] = useState(false);
    const [shopImageUrls, setShopImageUrls] = useState<string[]>(["", "", ""]);
    const router = useRouter();

    const handleUrlChange = (index: number, value: string) => {
        const updatedUrls = [...shopImageUrls];
        updatedUrls[index] = value;
        setShopImageUrls(updatedUrls);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postData = {
            title, description, price, size, technique, year, youTubeLink, sold: Boolean(sold), shopImageUrls
        };

        try {
            await createImageShop(postData);
            router.push('/shop');
        } catch (error) {
            console.error('Fehler beim Erstellen des Images', error);
        }
    };

    return (
        <div
            className="grid grid-cols-1 pt-10 pb-10 justify-center items-center px-6 mx-auto w-full xl:max-w-7xl max-w-5xl">
            <div className="text-5xl my-5">Create image for shop</div>
            <div className="flex">
                <Link href="/shop"
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
                                <span>Price</span>
                                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Size</span>
                                <input type="text" value={size} onChange={(e) => setSize(e.target.value)}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Technique</span>
                                <input type="text" value={technique} onChange={(e) => setTechnique(e.target.value)}
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
                        <div className="p-3 pb-6 w-full max-w-xl">
                            <label className="block">
                                <span>YouTube Link</span>
                                <input type="text" value={youTubeLink} onChange={(e) => setYouTubeLink(e.target.value)}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                    </div>
                    <div>
                        {shopImageUrls.map((url, index) => (
                            <div key={index} className="p-3 pb-6 w-full max-w-xl">
                                <label className="block">
                                    <span>Image URL {index + 1}</span>
                                    <input type="text" value={url}
                                           onChange={(e) => handleUrlChange(index, e.target.value)}
                                           className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                                </label>
                            </div>
                        ))}
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Description</span>
                                <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)}
                                          className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 pb-6 w-full max-w-xl">
                            <label className="inline-flex items-center">
                                <span className="mr-2">Sold</span>
                                <input type="checkbox" checked={sold} onChange={(e) => setSold(e.target.checked)}
                                       className="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black required:border-red-500"/>
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit"
                        className="py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Create image
                </button>
            </form>
        </div>
    );
}
