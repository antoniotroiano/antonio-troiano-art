"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {login} from "@/lib/api/auth";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await login(username, password);
            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed. Please check your login details.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input type="text" value={username} className="w-full p-2 border rounded" required
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" value={password} className="w-full p-2 border rounded" required
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <a href="/register">Register</a>
                    </div>
                    <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                            type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
