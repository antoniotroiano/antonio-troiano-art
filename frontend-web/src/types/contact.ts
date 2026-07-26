export interface ContactRequest {
    name: string;
    email: string;
    subject: string;
    requestType: string;
    message: string;
    honeypot?: string;
    formDisplayedAt: string;
}

export interface ContactResponse {
    success: boolean;
    message: string;
}
