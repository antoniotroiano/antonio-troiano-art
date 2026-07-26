"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {fetchSinglePortfolio, updatePortfolio} from "@/lib/api/portfolio";

export default function EditPortfolio() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [portfolio, setPortfolio] = useState({
        title: "",
        year: "",
        tags: ["", ""],
        imageUrls: [""],
    });

    useEffect(() => {
        if (id) {
            fetchSinglePortfolio(id)
                .then((data) => {
                    setPortfolio({
                        ...data,
                        imageUrls: data.imageUrls || [""],
                        tags: data.tags || ["", ""],
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, type} = e.target;
        const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
        setPortfolio((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTagChange = (index: number, value: string) => {
        const updatedTags = [...portfolio.tags];
        updatedTags[index] = value;
        setPortfolio((prev) => ({
            ...prev,
            tags: updatedTags,
        }));
    };

    const handleUrlChange = (index: number, value: string) => {
        const updatedUrls = [...portfolio.imageUrls];
        updatedUrls[index] = value;
        setPortfolio((prev) => ({
            ...prev,
            imageUrls: updatedUrls,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await updatePortfolio(id, portfolio);
            router.push("/portfolio");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="grid grid-cols-1 pt-10 pb-10 justify-center items-center px-6 mx-auto w-full xl:max-w-7xl max-w-5xl">
            <div className="text-5xl my-5">Edit portfolio</div>
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
                                <input type="text" name="title" value={portfolio.title} onChange={handleChange}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                        <div className="p-3 w-full max-w-xl">
                            <label className="block">
                                <span>Year</span>
                                <input type="text" name="year" value={portfolio.year} onChange={handleChange}
                                       className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                            </label>
                        </div>
                    </div>
                    <div>
                        {(portfolio.tags || []).map((tag, index) => (
                            <div key={index} className="p-3 w-full max-w-xl">
                                <label className="block">
                                    <span>Tag {index + 1}</span>
                                    <input type="text" value={tag}
                                           onChange={(e) => handleTagChange(index, e.target.value)}
                                           className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div>
                        {(portfolio.imageUrls || []).map((url, index) => (
                            <div key={index} className="p-3 w-full max-w-xl">
                                <label className="block">
                                    <span>Image URL {index + 1}</span>
                                    <input type="text" value={url}
                                           onChange={(e) => handleUrlChange(index, e.target.value)}
                                           className="mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500"/>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit"
                        className="py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                    Edit portfolio
                </button>
            </form>
        </div>
    );
}
