export default function SubmitButton({isSending}: { isSending: boolean }) {
    return (
        <button type="submit" disabled={isSending}
                className="flex mx-auto items-center justify-center px-6 py-2 rounded-lg border border-violet-200 text-slate-700 backdrop-blur bg-white/30 hover:bg-violet-100 hover:text-slate-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
            {isSending ? "Sending..." : "Send Message"}
        </button>
    );
}
