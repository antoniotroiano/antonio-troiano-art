import {BlogPost, BlogPostDetail} from "@/types/post";
import {getBaseUrl} from "./baseUrl";

export async function fetchPosts(): Promise<BlogPost[]> {
    console.debug("Fetch posts");
    const res = await fetch(`${getBaseUrl()}/api/posts`, {
        next: {revalidate: 86400}
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch blog posts. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function fetchSinglePost(id: unknown): Promise<BlogPostDetail> {
    console.debug("Fetch single post. PostId= ", id);
    const res = await fetch(`${getBaseUrl()}/api/posts/${id}`, {
        next: {revalidate: 86400},
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch single blog post. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}
