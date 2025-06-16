type Props = {
    agreed: boolean;
    setAgreed: (v: boolean) => void;
    error?: string;
};

export default function PrivacyCheckbox({agreed, setAgreed, error}: Props) {
    return (
        <div>
            <label className="flex items-start gap-2 text-sm text-slate-700 pt-1 pb-1">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                       className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-300"/>
                <span>I agree to the processing of my data according to the{" "}
                    <a href="/privacy" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                        privacy policy
                    </a>.
                </span>
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
