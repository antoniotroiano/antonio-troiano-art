// npm run sync:imagekit
import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
if (!PRIVATE_KEY) {
    console.error("Missing IMAGEKIT_PRIVATE_KEY (set it in .env.local or server secrets)");
    process.exit(1);
}

const FOLDERS = (process.env.IMAGEKIT_FOLDERS ?? "portfolio,shop,blog")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const LIMIT = Number(process.env.IMAGEKIT_LIMIT ?? 1000);
const CACHE_DIR = path.resolve("cache");

function basicAuth(privateKey) {
    return Buffer.from(`${privateKey}:`).toString("base64");
}

async function fetchPage({ skip, limit, folderPath }) {
    const url = new URL("https://api.imagekit.io/v1/files");
    url.searchParams.set("type", "file");
    url.searchParams.set("fileType", "image");
    url.searchParams.set("path", folderPath);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("skip", String(skip));

    const res = await fetch(url, {
        headers: { Authorization: `Basic ${basicAuth(PRIVATE_KEY)}` },
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`ImageKit API failed for path=${folderPath}: ${res.status} ${body}`);
    }

    return res.json();
}

function trimFile(f) {
    return {
        fileId: f.fileId,
        name: f.name,
        filePath: f.filePath,
        url: f.url,
        thumbnailUrl: f.thumbnailUrl,
        width: f.width,
        height: f.height,
        size: f.size,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
        tags: f.tags,
        customMetadata: f.customMetadata,
    };
}

async function fetchAllForFolder(folderName) {
    const folderPath = folderName.startsWith("/") ? folderName : `/${folderName}`;

    const items = [];
    let skip = 0;

    while (true) {
        const page = await fetchPage({ skip, limit: LIMIT, folderPath });
        items.push(...page);

        if (page.length < LIMIT) break;
        skip += LIMIT;
    }

    const trimmed = items.map(trimFile);

    return {
        folder: folderName.replace(/^\//, ""),
        path: folderPath,
        fetchedAt: new Date().toISOString(),
        count: trimmed.length,
        items: trimmed,
    };
}

async function writeFolderCache(folderData) {
    const safeName = folderData.folder.replace(/[^a-z0-9_-]/gi, "_").toLowerCase();
    const outPath = path.join(CACHE_DIR, `imagekit-${safeName}.json`);

    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(outPath, JSON.stringify(folderData, null, 2), "utf8");

    console.log(`✅ ${folderData.path}: ${folderData.count} images -> ${outPath}`);
}

async function main() {
    console.log(`Syncing folders: ${FOLDERS.map((f) => `/${f.replace(/^\//, "")}`).join(", ")}`);
    for (const folder of FOLDERS) {
        const data = await fetchAllForFolder(folder);
        await writeFolderCache(data);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
