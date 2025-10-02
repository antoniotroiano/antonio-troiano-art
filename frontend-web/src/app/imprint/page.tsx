export const metadata = {
    title: 'Privacy Policy & Imprint – Antonio Troiano Art',
    description: 'Privacy policy and legal disclosure of Antonio Troiano Art website.',
    openGraph: {
        title: 'Privacy Policy & Imprint – Antonio Troiano Art',
        description: 'Legal disclosure, contact details, and privacy practices.',
        url: 'https://antonio-troiano.de/imprint',
        siteName: 'Antonio Troiano Art',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Privacy Policy & Imprint – Antonio Troiano Art',
        description: 'Legal disclosure and privacy information for Antonio Troiano Art.',
    },
};

export default function PrivacyPolicyImprint() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy & Imprint',
        url: 'https://antonio-troiano.de/imprint',
        description: 'Privacy policy and legal notice of Antonio Troiano Art.',
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <main className="pt-35 px-7 pb-30">
                <div className="mx-auto max-w-4xl space-y-10">
                    <h1 className="text-4xl font-bold text-primary">Privacy Policy & Imprint</h1>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Data controller</h2>
                        <p className="text-lg">
                            Antonio Troiano Art<br/>
                            E-Mail: info@antonio-troiano.de
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Data collection on this website</h2>
                        <h3 className="text-xl font-semibold mt-6 mb-3">Contact form</h3>
                        <p className="text-lg">When you send a message via the contact form, we collect your name, email
                            address, subject, and message content. Additionally, the sender’s IP address is temporarily
                            processed to protect the website against spam and abuse (rate limiting). This IP address is
                            not stored permanently or used for profiling.
                            <br/>
                            The data is transmitted securely and sent by email to our provider (Ionos). No further
                            processing or data sharing takes place.
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-3">Commenting on blog posts</h3>
                        <p className="text-lg">If you leave a comment on a blog post, we store the entered name and the
                            comment content in our database. To prevent spam, the IP address of the sender is
                            temporarily processed at the time of submission (rate limiting). The IP address is not
                            stored or associated with the comment itself.
                            <br/>
                            You may request deletion of your comment at any time by contacting us via the contact form.
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-3">Shop inquiries</h3>
                        <p className="text-lg">When requesting artworks via the shop page, the contact form data is used
                            as described above. No automated purchase or checkout process takes place on the website.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Analytics</h2>
                        <p className="text-lg mb-4">This website uses <a href="https://umami.is" target="_blank"
                                                                         rel="noopener noreferrer">Umami</a>, a
                            self-hosted, privacy-friendly web analytics tool.
                        </p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>No cookies are used.</li>
                            <li>No personal data (such as IP addresses or user identifiers) are stored.</li>
                            <li>All data remains on our own server located in the EU and is not shared with third
                                parties.
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Embedded content and external links</h2>
                        <p className="text-lg mb-4">This website includes links to external platforms, including:
                        </p>
                        <ul className="list-disc pl-6 text-lg mb-4">
                            <li>
                                <a href="https://www.instagram.com/" target="_blank"
                                   rel="noopener noreferrer">Instagram</a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">YouTube</a>
                            </li>
                        </ul>
                        <p className="text-lg">Clicking these links may lead to the processing of personal data by those
                            services under their own privacy policies. This website does not embed third-party trackers
                            from these platforms.
                            <br/>
                            We also fetch images from Instagram using an access token via our own backend API. These
                            images are displayed statically, without any tracking or user interaction being sent to
                            Instagram.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Hosting and data storage</h2>
                        <p className="text-lg">This website is hosted on a server provided by Ionos. All data is
                            processed and stored within the European Union.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Your rights</h2>
                        <p className="text-lg mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 text-lg">
                            <li>Request access to your stored personal data</li>
                            <li>Request correction or deletion of your data</li>
                            <li>Withdraw consent at any time for future processing</li>
                            <li>File a complaint with a supervisory authority</li>
                        </ul>
                        <p className="text-lg mt-4">To exercise your rights, contact us via <a href="/contact">the
                            contact form</a>.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Changes to this policy</h2>
                        <p className="text-lg">We reserve the right to update this privacy policy to comply with legal
                            requirements or to reflect changes in our services.
                        </p>
                    </section>
                    <footer className="text-sm text-gray-500 mt-10">
                        Last updated: June 2025
                    </footer>
                    <hr className="my-10 border-gray-300"/>
                    <h2 className="text-2xl font-bold text-primary mb-4">Imprint</h2>
                    <section>
                        <p className="text-lg mb-4">Information according to § 5 TMG (German Telemedia Act):</p>
                        <p className="text-lg mb-4">
                            Antonio Troiano Art<br/>
                            E-Mail: info@antonio-troiano.de<br/>
                        </p>
                        <p className="text-lg mb-4 mt-6">Responsible for the content according to § 55 Abs. 2 RStV:
                            Antonio Troiano</p>
                        <p className="text-lg mb-4 mt-6">Please note: To protect my privacy, no postal address is
                            published here. A mailing address can be provided upon legitimate request.
                        </p>
                        <p className="text-lg mb-4 mt-6">This website is a personal portfolio and art project by Antonio
                            Troiano.</p>
                        <p className="text-lg mb-4 mt-6">
                            Online Dispute Resolution:<br/>
                            The European Commission provides a platform for online dispute resolution (ODR):{' '}
                            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                                https://ec.europa.eu/consumers/odr
                            </a>
                        </p>
                    </section>
                </div>
            </main>
        </>
    );
}
