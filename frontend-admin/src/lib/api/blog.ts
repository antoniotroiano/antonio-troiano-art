import {BlogPost, BlogPostDetail, UpdatePostDto} from "@/types/post";
import {getBaseUrl} from "@/lib/api/baseUrl";

export async function createPost(createData: any) {
    console.info("Create post");
    const res = await fetch(`${getBaseUrl()}/api/admin/posts`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(createData),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed creation of post. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed creation of post. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function fetchPosts(): Promise<BlogPost[]> {
    console.debug("Fetch post");
    const res = await fetch(`${getBaseUrl()}/api/posts`, {
        next: {revalidate: 3600}
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch blog posts. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to fetch blog posts. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function fetchSinglePost(id: unknown): Promise<BlogPostDetail> {
    console.debug("Fetch single post with Id= " + id);
    if (id == null || id === 'null' || id === 'undefined') {
        throw new Error(`Invalid post id: ${id}`);
    }
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new Error(`Post id is not a number: ${id}`);
    }

    const res = await fetch(`${getBaseUrl()}/api/posts/${numericId}`, {
        next: {revalidate: 3600},
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch single blog post. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to fetch single blog post. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function updatePost(id: string, updatedData: UpdatePostDto) {
    console.info("Update post with Id= " + id);
    const res = await fetch(`${getBaseUrl()}/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to update post. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to update post. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export const deletePost = async (id: number) => {
    console.info("Delete post with Id= " + id);
    const response = await fetch(`${getBaseUrl()}/api/admin/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to delete post. Error ${response.status}: ${errorText}`);
        throw new Error(`Failed to delete post: Error ${response.status}: ${errorText}`);
    }
};
