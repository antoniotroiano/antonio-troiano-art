import ContactWrapper from "@/components/contact/ContactWrapper";

export const metadata = {
    title: "Contact – Antonio Troiano Art",
    description: "Get in touch with Antonio Troiano for inquiries, commissions or collaborations.",
    keywords: [
        "Antonio Troiano",
        "Contact",
        "Art Inquiries",
        "Art Commissions",
        "Collaboration",
        "Modern Art",
        "Abstract Artist",
        "Contact Antonio Troiano"
    ],
    alternates: {
        canonical: "https://www.antonio-troiano.de/contact",
    },
    openGraph: {
        title: "Contact – Antonio Troiano Art",
        description: "Reach out to Antonio Troiano for custom artwork, collaborations or general inquiries.",
        url: "https://www.antonio-troiano.de/contact",
        siteName: "Antonio Troiano Art",
        images: [
            {
                url: "https://www.antonio-troiano.de/images/titel.webp",
                width: 1200,
                height: 630,
                alt: "Antonio Troiano Contact",
            },
        ],
        locale: "de_DE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact – Antonio Troiano Art",
        description: "Reach out to Antonio Troiano for commissions, collaborations or questions.",
        images: ["https://www.antonio-troiano.de/images/titel.webp"],
    },
};

export default function ContactPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact – Antonio Troiano Art",
        url: "https://antonio-troiano.de/contact",
        description: "Get in touch with Antonio Troiano for inquiries, commissions or collaborations.",
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <ContactWrapper/>
        </>
    );
}
