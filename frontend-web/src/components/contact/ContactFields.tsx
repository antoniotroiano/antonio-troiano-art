type Props = {
    name: string;
    email: string;
    subject: string;
    message: string;
    errors: Record<string, string | undefined>;
    setName: (v: string) => void;
    setEmail: (v: string) => void;
    setSubject: (v: string) => void;
    setMessage: (v: string) => void;
    setErrors: (v: Record<string, string | undefined>) => void;
};

export default function ContactFields({
                                          name,
                                          setName,
                                          email,
                                          setEmail,
                                          subject,
                                          setSubject,
                                          message,
                                          setMessage,
                                          errors,
                                      }: Props) {
    const inputClasses =
        "mt-4 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black required:border-red-500";
    const labelClass = "block text-md font-medium text-slate-800";

    return (
        <div className="space-y-6">
            <label className={labelClass}>
                Full name
                <input type="text" placeholder="Max Mustermann" value={name}
                       onChange={(e) => setName(e.target.value)} className={inputClasses}/>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </label>
            <label className={labelClass}>
                Email address
                <input type="email" placeholder="john@example.com" value={email}
                       onChange={(e) => setEmail(e.target.value)} className={inputClasses}/>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </label>
            <label className={labelClass}>
                Subject
                <input type="text" placeholder="Subject" value={subject}
                       onChange={(e) => setSubject(e.target.value)} className={inputClasses}/>
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </label>
            <label className={labelClass}>
                Message
                <textarea rows={4} placeholder="Your message" value={message}
                          onChange={(e) => setMessage(e.target.value)} className={`${inputClasses} resize-none`}/>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </label>
        </div>
    );
}
