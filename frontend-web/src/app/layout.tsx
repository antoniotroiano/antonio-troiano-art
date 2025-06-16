import {raleway, quicksand} from "./fonts";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import FloatingSocialSidebar from "@/components/FloatingSocialSidebar";

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

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Antonio Troiano Art",
        url: "https://antonio-troiano.de",
        description: "Discover handcrafted artworks by Antonio Troiano.",
    };

    return (
        <html lang="en" className={`${raleway.variable} ${quicksand.variable}`}>
        <head>
            <meta name="robots" content="index, follow"/>
            <meta httpEquiv="content-language" content="en"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="theme-color" content="#f3e5f5"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
            <link rel="apple-touch-icon" href="/LogoAT2.0.png"/>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
        </head>
        <body className="flex flex-col">
        <FloatingSocialSidebar/>
        <Nav/>
        <main className="flex-grow">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
