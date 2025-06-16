export type ImprintSection = {
    title: string;
    body: string;
};

export const imprintSections: ImprintSection[] = [
    {
        title: "Disclaimer",
        body: `The contents of our pages were created with the utmost care. However, we cannot guarantee the accuracy, 
        completeness, or timeliness of the contents.`
    },
    {
        title: "Copyright",
        body: `The contents and works created by the site operators on these pages are subject to German copyright law. 
        Contributions from third parties are marked as such. The reproduction, editing, distribution, and any kind of 
        exploitation outside the limits of copyright require the written consent of the respective author or creator.`
    },
    {
        title: "Liability for Links",
        body: `Our offer contains links to external websites of third parties, on whose contents we have no influence. 
        Therefore, we cannot assume any liability for these external contents.`
    },
];
