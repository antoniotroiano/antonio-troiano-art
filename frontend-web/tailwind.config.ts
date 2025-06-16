import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "pastel-blue": "#a0c4ff",
                "pastel-pink": "#ffc6c6",
                "pastel-green": "#d0f4de",
                "pastel-yellow": "#fdfd96",
            },
        },
    },
    plugins: [],
};

export default config;
