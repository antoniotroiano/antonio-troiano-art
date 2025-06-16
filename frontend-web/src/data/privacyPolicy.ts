export type PrivacyPolicySection = {
    title: string;
    body: string;
};

export const privacyPolicySection: PrivacyPolicySection[] = [
    {
        title: "a) Contact Form:",
        body: `When you submit inquiries via the contact form, your details from the inquiry form, including the 
        contact details you provide there, are stored for the purpose of processing the inquiry. We do not share this 
        data without your consent.`
    },
    {
        title: "b) Embedding of Social Media Content (Instagram, YouTube):",
        body: `This website embeds content from Instagram and YouTube. When accessing a page with embedded content,
        personal data (e.g., IP addresses) may be transferred to the operators of the social networks.`
    },
    {
        title: "c) Use of Google Analytics:",
        body: `This website uses Google Analytics to analyze the usage of our website. Google Analytics uses cookies 
        that are stored on your computer and allow an analysis of your website usage.`
    },
    {
        title: "3. Rights of the Data Subject",
        body: `You have the right to information, rectification, deletion, and restriction of the processing of your 
        personal data, as well as the right to object to the processing.`
    },
    {
        title: "4. Updates and Changes to This Privacy Policy",
        body: `This privacy policy is currently valid as of March 2025. We reserve the right to update the privacy
        policy to always comply with current legal requirements.`
    },
];
