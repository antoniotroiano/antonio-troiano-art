"use client";

import {useRouter} from "next/navigation";
import {logout} from "@/lib/api/auth";
import Link from "next/link";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Link href="" onClick={handleLogout}
              className="mx-5 py-2 border border-slate-300 px-4 text-sm transition-all shadow-sm text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800">
            Logout
        </Link>
    );
}
