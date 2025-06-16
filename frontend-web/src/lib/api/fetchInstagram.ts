import {InstagramPost} from "@/types/instagram";
import {getBaseUrl} from "./baseUrl";

export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
    try {
        console.debug("Fetch instagram posts");
        const res = await fetch(`${getBaseUrl()}/api/instagram`, {
            next: {revalidate: 86400}
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Failed to fetch images from Instagram. Error ${res.status}: ${errorText}`);
            throw new Error(`Failed to fetch images from Instagram. Error ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        let allPosts: InstagramPost[] = [];

        for (let post of data) {
            if (post.media_type === "IMAGE") {
                allPosts.push(post);
            } else if (post.media_type === "CAROUSEL_ALBUM") {
                allPosts.push({
                    id: post.id,
                    media_type: post.media_type,
                    media_url: post.media_url,
                    permalink: post.permalink,
                    caption: post.caption,
                });
            }
        }
        return allPosts.slice(0, 3);
    } catch (err) {
        console.error("Error fetching images from Instagram: ", err);
        return [];
    }
}
