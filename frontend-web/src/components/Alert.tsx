"use client";

import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

type AlertProps = {
    open: boolean;
    message: string;
    onClose: () => void;
};

export default function Alert({open, message, onClose}: AlertProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);

        dialogRef.current?.focus();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    const modal = (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
            <div ref={dialogRef} tabIndex={-1} role="alertdialog" aria-modal="true" aria-labelledby="alert-title"
                 aria-describedby="alert-description"
                 className="relative z-50 w-[90vw] max-w-sm rounded-2xl p-6 bg-violet-50/90 shadow-xl border border-violet-200 animate-fadeInScale outline-none">
                <h2 id="alert-title" className="text-lg font-semibold text-center text-slate-800">
                    Notification
                </h2>
                <p id="alert-description" className="text-center text-slate-700 mt-2">
                    {message}
                </p>
                <div className="mt-6 flex justify-center">
                    <button onClick={onClose}
                            className="px-4 py-1.5 text-sm font-medium text-violet-800 bg-white/60 border border-violet-300 rounded-lg hover:bg-violet-100 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modal, document.body);
}
