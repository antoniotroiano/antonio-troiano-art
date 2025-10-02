import {raleway} from "./fonts";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import FloatingSocialSidebar from "@/components/FloatingSocialSidebar";
import Script from "next/script";
import {Viewport} from "next";

export const metadata = {
    title: "Antonio Troiano Art – Handcrafted Artworks",
    description: "Discover handcrafted artworks by Antonio Troiano. Unique paintings, illustrations, and more.",
    openGraph: {
        title: "Antonio Troiano Art",
        description: "Discover handcrafted artworks by Antonio Troiano.",
        url: "https://antonio-troiano.de",
        siteName: "Antonio Troiano Art",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Antonio Troiano Art",
        description: "Discover handcrafted artworks by Antonio Troiano.",
    },
};

export const viewport: Viewport = {
    themeColor: "#f3e5f5",
    viewportFit: "cover",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Antonio Troiano Art",
        url: "https://antonio-troiano.de",
        description: "Discover handcrafted artworks by Antonio Troiano.",
    };

    return (
        <html lang="en" className={`${raleway.variable}`}>
        <head>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png"/>
            <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="apple-touch-startup-image" href="/splashscreen_1024x1536.png"
                  media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"/>
            <link rel="apple-touch-startup-image" href="/splashscreen_1024x1536.png"
                  media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)"/>
            <link rel="apple-touch-startup-image" href="/splashscreen_1024x1536.png"
                  media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-2048-2732.png"
                  media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-1668-2388.png"
                  media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-1668-2224.png"
                  media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-1536-2048.png"
                  media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-1284-2778.png"
                  media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-1170-2532.png"
                  media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-1125-2436.png"
                  media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-1242-2688.png"
                  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-828-1792.png"
                  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-1242-2208.png"
                  media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-750-1334.png"
                  media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/splashscreens/apple-splash-640-1136.png"
                  media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
            <meta name="robots" content="index, follow"/>
            <meta httpEquiv="content-language" content="en"/>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <Script data-website-id="496e49c3-56bd-4878-9306-1a0823749685"
                    src="https://stats.antonio-troiano.de/script.js" strategy="lazyOnload"/>
        </head>
        <body className="flex flex-col">
        <FloatingSocialSidebar/>
        <Nav/>
        <main
            className="flex-grow pt-[env(safe-area-inset-top)] landscape:pl-[env(safe-area-inset-left)] landscape:pr-[env(safe-area-inset-right)]">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
