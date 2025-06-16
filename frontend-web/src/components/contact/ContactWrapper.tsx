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
        <div className="flex flex-col items-center w-full pt-45 pb-30 px-13">
            <div
                className="w-full max-w-3xl bg-white/40 backdrop-blur rounded-2xl shadow-lg py-8 px-8 border border-gray-200">
                <p className="text-center text-lg font-bold text-gray-800 mb-8">
                    Send a message for inquiries, collaborations, or commissions.
                </p>
                <Alert open={alertOpen} message={alertMessage} onClose={() => setAlertOpen(false)}/>
                <ContactForm formDisplayedAt={formDisplayedAt} onAlert={showAlert}/>
            </div>
        </div>
    );
}
