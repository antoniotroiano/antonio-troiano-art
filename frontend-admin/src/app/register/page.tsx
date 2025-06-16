"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {register} from "@/lib/api/auth";

export default function RegisterPage() {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(token, username, password);
            router.push("/login");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
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
                        <label className="block text-gray-700">Token</label>
                        <input type="text" value={token} className="w-full p-2 border rounded" required
                               onChange={(e) => setToken(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <a href="/login">Login</a>
                    </div>
                    <button type="submit" disabled={loading}
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
