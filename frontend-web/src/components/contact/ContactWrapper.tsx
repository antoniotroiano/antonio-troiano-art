"use client";

import {useState} from "react";
import ContactForm from "./ContactForm";
import Alert from "../Alert";

export default function ContactWrapper() {
    const [formDisplayedAt] = useState(() => new Date().toISOString());
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const showAlert = (message: string) => {
        setAlertMessage(message);
        setAlertOpen(true);
    };

    return (
        <div className="flex flex-col items-center w-full pt-35 px-7 pb-30">
            <div
                className="bg-white/45 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-md max-w-2xl mx-auto mb-15 text-center">
                <div className="flex justify-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 16l4-4 4 4m4 0l4-4 4 4"/>
                    </svg>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Get in Touch</h1>
                <p className="text-gray-800 text-lg italic md:text-xl leading-relaxed">
                    "Whether you have questions, want to collaborate, or commission a piece, feel free to reach out."
                </p>
            </div>
            <div
                className="w-full max-w-3xl bg-white/40 backdrop-blur rounded-xl shadow-lg py-7 px-7 border border-gray-200">
                <Alert open={alertOpen} message={alertMessage} onClose={() => setAlertOpen(false)}/>
                <ContactForm formDisplayedAt={formDisplayedAt} onAlert={showAlert}/>
            </div>
        </div>
    );
}
