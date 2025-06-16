import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const path = searchParams.get("path");

    if (!path) {
        return NextResponse.json({error: "Missing path"}, {status: 400});
    }

    revalidatePath(path);
    return NextResponse.json({revalidated: true, path});
}
