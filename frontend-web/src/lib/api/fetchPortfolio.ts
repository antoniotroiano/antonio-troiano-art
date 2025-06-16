import {getBaseUrl} from "./baseUrl";
import {PortfolioImage} from "@/types/portfolio";

export async function fetchPortfolioImages(): Promise<PortfolioImage[]> {
    console.debug("Fetch portfolio images");
    const res = await fetch(`${getBaseUrl()}/api/portfolio`, {
        next: {revalidate: 86400}
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch portfolio images. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to fetch portfolio images. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}
