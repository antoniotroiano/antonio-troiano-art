"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {fetchSingleImageShop, updateImageShop} from "@/lib/api/shop";

export default function EditImage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [shopImage, setShopImage] = useState({
        title: "",
        description: "",
        price: "",
        size: "",
        technique: "",
        year: "",
        youTubeLink: "",
        sold: false,
        shopImageUrls: ["", "", ""],
    });

    useEffect(() => {
        if (id) {
            fetchSingleImageShop(id)
                .then((data) => {
                    setShopImage({
                        ...data,
                        shopImageUrls: data.shopImageUrls || ["", "", ""],
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, type} = e.target;
        const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;

        setShopImage((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUrlChange = (index: number, value: string) => {
        const updatedUrls = [...shopImage.shopImageUrls];
        updatedUrls[index] = value;
        setShopImage((prev) => ({
            ...prev,
            imageUrls: updatedUrls,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await updateImageShop(id, shopImage);
            router.push("/shop");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="grid grid-cols-1 pt-10 pb-10 justify-center items-center px-6 mx-auto w-full xl:max-w-7xl max-w-5xl">
            <div className="text-5xl my-5">Edit image for shop</div>
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
                                <input type="text" name="title" value={shopImage.title} onChange={handleChange}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Price</span>
                                <input type="text" name="price" value={shopImage.price} onChange={handleChange}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Size</span>
                                <input type="text" name="size" value={shopImage.size} onChange={handleChange}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Technique</span>
                                <input type="text" name="technique" value={shopImage.technique} onChange={handleChange}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Year</span>
                                <input type="text" name="year" value={shopImage.year} onChange={handleChange}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>YouTube Link</span>
                                <input type="text" name="youTubeLink" value={shopImage.youTubeLink}
                                       onChange={handleChange}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                    </div>
                    <div>
                        {(shopImage.shopImageUrls || []).map((url, index) => (
                            <div key={index} className="p-3 w-full max-w-xl">
                                <label className="block">
                                    <span>Image URL {index + 1}</span>
                                    <input type="text" value={url}
                                           onChange={(e) => handleUrlChange(index, e.target.value)}
                                           className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                                </label>
                            </div>
                        ))}
                        <div className="p-3 pb-6 w-full max-w-xl">
                            <label className="block">
                                <span>Description</span>
                                <textarea rows={7} name="description" value={shopImage.description}
                                          onChange={handleChange}
                                          className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="inline-flex items-center">
                                <span className="mr-2">Sold</span>
                                <input type="checkbox" name="sold" checked={shopImage.sold} onChange={handleChange}
                                       className="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black required:border-red-500"/>
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit"
                        className="py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Edit image
                </button>
            </form>
        </div>
    );
}
