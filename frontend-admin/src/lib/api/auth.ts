import {getBaseUrl} from "@/lib/api/baseUrl";

export async function login(username: string, password: string) {
    console.log("Login user with name= " + username);
    const response = await fetch(`${getBaseUrl()}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
        credentials: "include",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed login. Error ${response.status}: ${errorText}`);
        throw new Error(`Failed login. Error ${response.status}: ${errorText}`);
    }

    try {
        await response.json();
        const currentUser = await getCurrentUser();

        if (currentUser) {
            sessionStorage.setItem("user", JSON.stringify(currentUser));
            return currentUser;
        } else {
            throw new Error("Login successful but session not established");
        }
    } catch (error) {
        return error;
    }
}

export async function register(token: string, username: string, password: string) {
    console.log("Register user with name= " + username);
    const response = await fetch(`${getBaseUrl()}/api/auth/register/token?token=${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
        credentials: "include",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Registration failed login. Error ${response.status}: ${errorText}`);
        throw new Error(`Registration failed login. Error ${response.status}: ${errorText}`);
    }
    return await response.json();
}

export async function logout() {
    console.log("Logout the user");
    const response = await fetch(`${getBaseUrl()}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Logout failed");
    }
    sessionStorage.removeItem("user");
}

export async function getCurrentUser() {
    console.log("Get current user");
    try {
        const res = await fetch(`${getBaseUrl()}/api/auth/me`, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        });

        if (!res.ok) {
            return null;
        }
        const user = await res.json();
        return user;
    } catch {
        return null;
    }
}
