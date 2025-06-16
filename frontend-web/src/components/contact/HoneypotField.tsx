type Props = {
    honeypot: string;
    setHoneypot: (v: string) => void;
};

export default function HoneypotField({honeypot, setHoneypot}: Props) {
    return (
        <div className="hidden">
            <label>
                Do not fill this out if you're human:
                <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website"/>
            </label>
        </div>
    );
}
