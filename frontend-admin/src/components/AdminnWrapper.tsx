"use client";

import {useEffect, useState} from "react";
import {useRouter, usePathname} from "next/navigation";
import {getBaseUrl} from "@/lib/api/baseUrl";

export default function AdminWrapper({children}: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<{ username: string } | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const publicPages = new Set(["/login", "/register"]);
    const isPublicPage = publicPages.has(pathname);

    useEffect(() => {
        if (isPublicPage) {
            setIsLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch(`${getBaseUrl()}/api/auth/me`, {
                    credentials: "include",
                });

                if (res.ok) {
                    const user = await res.json();
                    setUser(user);
                } else {
                    router.push("/login");
                }
            } catch (err) {
                console.error("Fehler beim Auth-Check", err);
                router.push("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [router, pathname, isPublicPage]);

    if (isLoading) return <div className="p-8">Lade...</div>;
    if (!user && !isPublicPage) return null;

    return <>{children}</>;
}
