import { MetadataRoute } from "next";
import { readImageKitFolder } from "@/lib/imagekitCache";
import { getAllBlogPosts } from "@/lib/datocms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://antonio-troiano.de";

    const shopData = await readImageKitFolder("shop");
    const blogPosts = await getAllBlogPosts();

    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/shop`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/kuenstler`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/imprint`,
            lastModified: new Date(),
         },
        {
            url: `${baseUrl}/imprint/privacypolicy`,
            lastModified: new Date(),
        },
    ];

    const shopPages = shopData.items.map((item) => ({
      url: `${baseUrl}/shop/${item.fileId}`,
      lastModified: item.updatedAt
        ? new Date(item.updatedAt)
        : new Date(),
    }));

    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedat
            ? new Date(post.publishedat)
            : new Date(),
    }));

    return [...staticPages, ...shopPages, ...blogPages];
}
