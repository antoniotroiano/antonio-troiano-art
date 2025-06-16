"use client";

import {useRef, useState} from "react";
import PrivacyCheckbox from "@/components/contact/PrivacyCheckbox";

export default function CommentForm({postId, onSuccess, onError,}: {
    postId: number; onSuccess: (message: string) => void; onError: (message: string) => void;
}) {
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; comment?: string; agreed?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const honeypotRef = useRef<HTMLInputElement>(null);
    const [formRenderTime] = useState<number>(Date.now());

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!comment.trim()) newErrors.comment = "Comment cannot be empty.";
        if (!agreed) newErrors.agreed = "You must accept the privacy policy.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setIsSubmitting(true);

        const payload = {
            name,
            content: comment,
            honeypot: honeypotRef.current?.value,
            formDisplayedAt: formRenderTime,
        };

        try {
            const res = await fetch(`/api/comments/post/${postId}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const contentType = res.headers.get("content-type");
                const message = contentType?.includes("application/json")
                    ? (await res.json()).error || "Unknown error"
                    : await res.text();
                onError(`Error ${res.status}: ${message}`);
                return;
            }

            setComment("");
            setName("");
            setErrors({});
            setAgreed(false);
            onSuccess("Comment was successfully added!");
        } catch (err) {
            console.error("❌ Unexpected error:", err);
            onError("Unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <input type="text" name="website" ref={honeypotRef} style={{display: "none"}} tabIndex={-1}
                   autoComplete="off"/>
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
                   className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white/80 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-300"/>
            {errors.name && <p className="text-red-500 text-sm -mt-2">{errors.name}</p>}
            <textarea placeholder="Write a comment…" value={comment} onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white/80 text-sm shadow-sm resize-none focus:outline-none focus:ring-1 focus:ring-violet-300"/>
            {errors.comment && <p className="text-red-500 text-sm -mt-2">{errors.comment}</p>}
            <PrivacyCheckbox agreed={agreed} setAgreed={setAgreed} error={errors.agreed}/>
            <div className="flex justify-between mt-1">
                <button onClick={handleSubmit} disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg border border-violet-200 text-slate-700 backdrop-blur bg-white/30 hover:bg-violet-100 hover:text-slate-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                    {isSubmitting ? "Submitting…" : "Comment"}
                </button>
            </div>
        </div>
    );
}
