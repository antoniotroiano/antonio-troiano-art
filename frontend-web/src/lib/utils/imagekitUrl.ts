export function withImageKitTransform(path: string, transformation: string): string {
    if (!path) return "";
    if (path.includes("/tr:")) return path;

    if (path.includes("?")) return path;

    return `/tr:${transformation}/${path}`;
}
