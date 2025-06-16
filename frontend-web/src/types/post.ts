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
