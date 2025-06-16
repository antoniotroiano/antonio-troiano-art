import {imprintSections} from "@/data/imprintText";
import {privacyPolicySection} from "@/data/privacyPolicy";

export const metadata = {
    title: "Imprint – Antonio Troiano Art",
    description: "Legal disclosure and imprint of Antonio Troiano Art website.",
    openGraph: {
        title: "Imprint – Antonio Troiano Art",
        description: "Legal disclosure and contact information.",
        url: "https://antonio-troiano.de/imprint",
        siteName: "Antonio Troiano Art",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Imprint – Antonio Troiano Art",
        description: "Legal disclosure and contact information.",
    },
};

export default function Imprint() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Imprint",
        url: "https://antonio-troiano.de/imprint",
        description: "Legal disclosure and contact information for Antonio Troiano Art.",
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <div className="flex flex-col pt-45 px-13 justify-center">
                <div className="mx-auto grid grid-cols-1 max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                    <div className="text-3xl font-bold text-primary mb-6">Privacy Policy</div>
                    <div className="text-lg mb-6">
                        1. Responsible Entity<br/>
                        Antonio Troiano Art<br/>
                        E-Mail: info@antoniotroiano.de
                    </div>
                    <div className="text-lg mb-6">
                        2. Collection and Storage of Personal Data as well as Type and Purpose of Their Use
                    </div>
                    <div>
                        {privacyPolicySection.map(({title, body}, idx) => (
                            <div key={idx}>
                                <div className="text-lg mb-6">
                                    <div>{title}</div>
                                    <div>{body}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-3xl font-bold text-primary mb-6">Imprint</div>
                    <div className="text-lg mb-6">
                        Information according to § 5 TMG:<br/>
                        Antonio Troiano Art<br/>
                        E-Mail: info@antoniotroiano.de
                    </div>
                    <div className="text-lg mb-6">
                        Represented by:<br/>
                        Antonio Troiano
                    </div>
                    <div>
                        {imprintSections.map(({title, body}, idx) => (
                            <div key={idx}>
                                <div className="text-lg mb-6">
                                    <div>{title}</div>
                                    <div>{body}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-lg mb-20">
                        Online Dispute Resolution<br/>
                        The European Commission provides a platform for online dispute resolution (ODR): <a
                        href="https://ec.europa.eu/consumers/odr" target="_blank">https://ec.europa.eu/consumers/odr</a>
                    </div>
                </div>
            </div>
        </>
    );
}
