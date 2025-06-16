export interface BlogPost {
    id: number;
    title: string;
    cover: string;
    category: string;
    description: string;
    date: string;
}

export interface BlogPostDetail extends BlogPost {
    content: string;
    author: string;
}

export interface UpdatePostDto {
    title: string;
    author: string;
    date: string;
    category: string;
    description: string;
    content: string;
    cover: string;
}
