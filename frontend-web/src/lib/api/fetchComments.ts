import {getBaseUrl} from "./baseUrl";

export async function fetchCommentsForPost(postId: number) {
    console.debug("Fetch comments for post. PostId= ", postId);
    const res = await fetch(`${getBaseUrl()}/api/comments/post/${postId}`, {
        next: {revalidate: 10},
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch comments for post ${postId}. Error ${res.status}: ${errorText}`);
        return [];
    }

    return res.json();
}
