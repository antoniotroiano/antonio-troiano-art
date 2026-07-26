import { ContactRequest, ContactResponse } from "@/types/contact";
import { getBaseUrl } from "./baseUrl";

export async function sendContactRequest(data: ContactRequest): Promise<ContactResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        const res = await fetch(`${getBaseUrl()}/api/mail/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "omit",
            mode: "cors",
            signal: controller.signal,
        });

        if (!res.ok) {
            let errorMessage = `HTTP ${res.status} ${res.statusText}`;

            try {
                const errorData = await res.json();
                errorMessage = errorData?.error ?? errorMessage;
            } catch { }

            return { success: false, message: errorMessage };
        }

        try {
            return await res.json();
        } catch {
            return { success: true, message: "Message sent (no response body)" };
        }
    } catch (err: any) {
        if (err.name === "AbortError") {
            return { success: false, message: "Request timeout" };
        }
        return { success: false, message: err.message ?? "Network error" };
    } finally {
        clearTimeout(timeout);
    }
}