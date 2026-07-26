import { readFile } from "node:fs/promises";
import path from "node:path";

export type ImageKitCachedFile = {
    fileId: string;
    name: string;
    filePath?: string;
    url: string;
    thumbnailUrl?: string;
    width?: number;
    height?: number;
    size?: number;
    createdAt?: string;
    updatedAt?: string;
    tags?: string[];
    customMetadata?: Record<string, unknown>;
};

type CacheFile = {
    folder: string;
    path: string;
    fetchedAt: string;
    count: number;
    items: ImageKitCachedFile[];
};

function cachePath(folder: string) {
    const safe = folder.replace(/[^a-z0-9_-]/gi, "_").toLowerCase();
    return path.resolve(`cache/imagekit-${safe}.json`);
}

export async function readImageKitFolder(folder: "portfolio" | "shop" | "blog"): Promise<CacheFile> {
    try {
        const file = await readFile(cachePath(folder), "utf8");
        return JSON.parse(file) as CacheFile;
    } catch {
        return { folder, path: `/${folder}`, fetchedAt: "", count: 0, items: [] };
    }
}
