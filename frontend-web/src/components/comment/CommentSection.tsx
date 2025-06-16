"use client";

import {useState, useRef, useEffect} from "react";
import CommentForm from "./CommentForm";
import Alert from "../Alert";

export default function CommentSection({postId, onCommentSubmitted,}: {
    postId: number;
    onCommentSubmitted: () => void;
}) {
    const [formOpen, setFormOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setFormOpen(false);
            }
        };

        if (formOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [formOpen]);

    const showAlert = (message: string) => {
        setAlertMessage(message);
        setAlertOpen(true);
    };

    return (
        <div className="relative pb-5" ref={containerRef}>
            <div className="text-xl font-semibold mb-4">Leave a comment</div>
            <button onClick={() => setFormOpen(!formOpen)}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg border border-violet-200 text-slate-700 backdrop-blur bg-white/30 hover:bg-violet-100 hover:text-slate-900 transition-colors duration-300 shadow-md">
                Comment
            </button>
            {formOpen && (
                <div
                    className="absolute z-50 mt-1 w-full max-w-md bg-white border border-purple-200/40 shadow-xl rounded-xl p-5">
                    <CommentForm postId={postId} onSuccess={(msg) => {
                        onCommentSubmitted();
                        showAlert(msg);
                        setFormOpen(false);
                    }} onError={showAlert}/>
                </div>
            )}
            <Alert open={alertOpen} message={alertMessage} onClose={() => setAlertOpen(false)}/>
        </div>
    );
}
