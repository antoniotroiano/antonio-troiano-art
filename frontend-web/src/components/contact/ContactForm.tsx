"use client";

import {useState} from "react";
import {contactSchema} from "@/lib/validation/contactSchema";
import {sendContactRequest} from "@/lib/api/contact";
import ContactFields from "./ContactFields";
import PrivacyCheckbox from "./PrivacyCheckbox";
import SubmitButton from "./SubmitButton";
import HoneypotField from "./HoneypotField";
import {ContactRequest} from "@/types/contact";

type ContactFormProps = {
    formDisplayedAt: string;
    onAlert: (message: string) => void;
};

export default function ContactForm({formDisplayedAt, onAlert}: ContactFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [honeypot, setHoneypot] = useState("");
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = contactSchema.safeParse({name, email, subject, message, agreed});

        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
                name: formattedErrors.name?._errors[0],
                email: formattedErrors.email?._errors[0],
                subject: formattedErrors.subject?._errors[0],
                message: formattedErrors.message?._errors[0],
                agreed: formattedErrors.agreed?._errors[0],
            });
            return;
        }
        if (honeypot) return;

        setIsSending(true);
        setErrors({});

        const request: ContactRequest = {name, email, subject, message, honeypot, formDisplayedAt,};
        const response = await sendContactRequest(request);

        if (response.success) {
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setAgreed(false);
            onAlert("Message sent successfully!");
            console.log("Message from contact form sent successfully");
        } else {
            console.error("Message from contact form sent is failing");
            onAlert(`Error sending message: ${response.message}`);
        }
        setIsSending(false);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full py-6 md:px-8 space-y-6" noValidate>
            <HoneypotField honeypot={honeypot} setHoneypot={setHoneypot}/>
            <ContactFields name={name} setName={setName} email={email} setEmail={setEmail} subject={subject}
                           setSubject={setSubject} message={message} setMessage={setMessage} errors={errors}
                           setErrors={setErrors}/>
            <PrivacyCheckbox agreed={agreed} setAgreed={setAgreed} error={errors.agreed}/>
            {errors.form && <p className="text-red-600 mt-2">{errors.form}</p>}
            <SubmitButton isSending={isSending}/>
        </form>
    );
}
