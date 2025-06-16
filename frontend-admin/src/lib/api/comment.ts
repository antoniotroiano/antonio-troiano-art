import {getBaseUrl} from "./baseUrl";

export async function fetchCommentsForPost(id: unknown) {
    console.debug("Fetch comments for post with Id= " + id);
    const res = await fetch(`${getBaseUrl()}/api/comments/post/${id}`, {
        next: {revalidate: 10},
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch comments for post ${id}. Error ${res.status}: ${errorText}`);
        return [];
    }

    return res.json();
}

export const deleteComment = async (id: number) => {
    console.info("Delete comment Id= " + id);
    const response = await fetch(`${getBaseUrl()}/api/admin/comments/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to delete comment wit id ${id}. Error ${response.status} - ${errorText}`);
        throw new Error(`Failed to delete comment wit id ${id}. Error ${response.status} - ${errorText}`);
    }
};
