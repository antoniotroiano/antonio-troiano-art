import {FaInstagram, FaYoutube} from "react-icons/fa";

export default function FloatingSocialSidebar() {
    return (
        <div
            className="fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] right-0 flex flex-col space-y-4 bg-white/30 backdrop-blur-md glassmorphism-bg-social_media border border-white/40 rounded-l-md p-2 z-50 shadow-lg landscape:right-[env(safe-area-inset-right)]">
            <a href="https://www.instagram.com/antonio.troiano.art/" target="_blank" rel="noopener noreferrer"
               aria-label="Instagram" className="text-gray-600 hover:text-pink-600 transition-colors">
                <FaInstagram size={28}/>
            </a>
            <a href="https://www.youtube.com/@antoniotroiano4806" target="_blank" rel="noopener noreferrer"
               aria-label="YouTube" className="text-gray-600 hover:text-red-600 transition-colors">
                <FaYoutube size={28}/>
            </a>
        </div>
    );
}
