import {FaInstagram, FaYoutube} from "react-icons/fa";

export default function FloatingSocialSidebar() {
    return (
        <div
            className="fixed top-1/3 right-0 flex flex-col space-y-4 bg-white/30 backdrop-blur-md glassmorphism-bg border border-white/40 rounded-l-md p-2 z-50 shadow-lg">
            <a href="https://www.instagram.com/antonio.troiano.art/" target="_blank" rel="noopener noreferrer"
               aria-label="Instagram"
               className="text-gray-600 hover:text-pink-600 transition-colors">
                <FaInstagram size={28}/>
            </a>
            <a href="https://www.youtube.com/@antoniotroiano4806" target="_blank" rel="noopener noreferrer"
               aria-label="YouTube"
               className="text-gray-600 hover:text-red-600 transition-colors">
                <FaYoutube size={28}/>
            </a>
        </div>
    );
}
