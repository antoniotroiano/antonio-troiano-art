/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
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
