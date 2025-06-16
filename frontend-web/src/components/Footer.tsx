export default function Footer() {
    return (
        <footer
            className="w-full py-8 px-6 bg-white/30 backdrop-blur-md border-t border-white/20 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-gray-700 text-center min-h-[150px]">
            <div className="max-w-md text-center mx-auto">
                <p className="leading-relaxed">
                    &copy; {new Date().getFullYear()} Antonio Troiano Art. All rights reserved.
                </p>
                <a href="/imprint" className="text-sm hover:text-gray-400 inline-block mt-1">
                    Imprint
                </a>
            </div>
        </footer>
    );
}
