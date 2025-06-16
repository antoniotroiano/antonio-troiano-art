import {ContactRequest, ContactResponse} from "@/types/contact";
import {getBaseUrl} from "./baseUrl";

export async function sendContactRequest(data: ContactRequest): Promise<ContactResponse> {
    console.debug("Send new contact request. Subject= ", data.subject);
    const res = await fetch(`${getBaseUrl()}/api/mail/contact`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
        credentials: 'omit',
        mode: "cors",
        //Eventual mode and credentials add to the other fetch methods
    });

    if (!res.ok) {
        let errorMessage = "Unknown error. Status:  " + res.status + " Message: " + res.statusText + " Header: " + res.headers + " Url: " + res.url + " Body: " + res.body;
        console.error(errorMessage);
        try {
            const errorData = await res.json();
            errorMessage = errorData?.error ?? errorMessage;
        } catch (_) {

        }
        return {success: false, message: errorMessage};
    }

    try {
        console.log("Sending new contact request is successfully");
        return await res.json();
    } catch (_) {
        console.error("Message sent, but no response body");
        return {success: true, message: "Message sent, but no response body."};
    }
}
