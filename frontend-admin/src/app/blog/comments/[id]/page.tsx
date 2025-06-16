"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import {ContentDialog} from "@/components/ContentDialog";
import LogoutButton from "@/components/LogoutButton";
import {deleteComment, fetchCommentsForPost} from "@/lib/api/comment";

export default function Comments() {
    const [comments, setComments] = useState<any[]>([]);
    const [postName, setPostName] = useState<string | null>(null);
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        if (!id) return;

        fetchCommentsForPost(id)
            .then((data) => {
                setComments(data);
                if (data.length > 0 && data[0].postName) {
                    setPostName(data[0].postName);
                }
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleDelete = (id: number) => {
        deleteComment(id)
            .then(() => {
                setComments(comments.filter((comment) => comment.id !== id));
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="grid grid-cols-1 pt-10 pb-10 justify-center items-center px-6 mx-auto w-full max-w-7xl">
            <div className="text-6xl font-bold my-5">Comments for Post {postName ?? "Loading..."}</div>
            <div className="relative flex flex-col w-full h-full bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden bg-white rounded-none bg-clip-border">
                    <div className="flex">
                        <Link href="/blog"
                              className="mx-5 py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
                            Back
                        </Link>
                        <LogoutButton/>
                    </div>
                </div>
                <div className="p-6 px-0 overflow-scroll">
                    <table className="w-full mt-4 text-left table-fixed min-w-max">
                        <thead>
                        <tr>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <div className="font-bold text-md leading-none">Name</div>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <div className="font-bold text-md leading-none">Comment</div>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <div className="font-bold text-md leading-none">Delete</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {comments.map((comment) => (
                            <tr key={comment.id}>
                                <td className="p-4 border-b border-blue-gray-50 break-words">
                                    {comment.name}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50 truncate overflow-hidden text-ellipsis max-w-[200px]">
                                    <ContentDialog content={comment.content}/>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <button
                                        onClick={() => handleDelete(comment.id)} type="button"
                                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                        <span
                                            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 fill="currentColor" aria-hidden="true" className="w-4 h-4">
                                                <path
                                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z">
                                                </path>
                                            </svg>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {comments.length === 0 && (
                        <div className="p-6 text-gray-500">Keine Kommentare vorhanden.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
