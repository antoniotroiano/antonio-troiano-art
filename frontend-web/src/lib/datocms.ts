type DatoCMSResponse<T> = {
    data?: T;
    errors?: Array<{ message: string }>;
};

const DATOCMS_ENDPOINT = "https://graphql.datocms.com/";

export type BlogPostListItem = {
    id: string;
    title: string;
    subtitle: string | null;
    slug: string;
    author?: string | null;
    publishedat: string;
    excerpt?: string | null;
    heroimagefileid?: string | null;
};

export type BlogPostDetail = BlogPostListItem & {
    body: {
        value: unknown;
    } | null;
};

export async function fetchDatoCMS<T>(
    query: string,
    variables?: Record<string, unknown>
): Promise<T> {
    const token = process.env.DATOCMS_READONLY_TOKEN;

    if (!token) {
        throw new Error(
            "DATOCMS_READONLY_TOKEN is missing. Set it in your environment (.env.local / Docker env)."
        );
    }

    const res = await fetch(DATOCMS_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        next: { revalidate: 60 },
        body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`DatoCMS request failed (${res.status}): ${text}`);
    }

    const json = (await res.json()) as DatoCMSResponse<T>;

    if (json.errors?.length) {
        throw new Error(`DatoCMS GraphQL error: ${json.errors[0].message}`);
    }
    if (!json.data) {
        throw new Error("DatoCMS response has no data.");
    }

    return json.data;
}

const ALL_BLOG_POSTS_QUERY = `
  query {
    allBlogPosts(orderBy: publishedat_DESC) {
      id
      title
      subtitle
      slug
      author
      publishedat
      excerpt
      heroimagefileid
    }
  }
`;

export async function getAllBlogPosts(): Promise<BlogPostListItem[]> {
    const data = await fetchDatoCMS<{ allBlogPosts: BlogPostListItem[] }>(
        ALL_BLOG_POSTS_QUERY
    );
    return data.allBlogPosts ?? [];
}

const BLOG_POST_BY_SLUG_QUERY = `
  query($slug: String) {
    blogPost(filter: { slug: { eq: $slug } }) {
      id
      title
      subtitle
      slug
      author
      publishedat
      excerpt
      heroimagefileid
      body { value }
    }
  }
`;

export async function getBlogPostBySlug(
    slug: string
): Promise<BlogPostDetail | null> {
    const data = await fetchDatoCMS<{ blogPost: BlogPostDetail | null }>(
        BLOG_POST_BY_SLUG_QUERY,
        { slug }
    );
    return data.blogPost ?? null;
}

export function pickRandomItems<T>(items: T[], count: number): T[] {
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(count, arr.length));
}

export async function getRandomBlogPosts(count = 3) {
    const posts = await getAllBlogPosts();
    return pickRandomItems(posts, count);
}