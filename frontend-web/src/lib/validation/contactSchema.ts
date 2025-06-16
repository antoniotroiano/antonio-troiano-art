import {z} from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, "Name cannot be empty"),
    email: z.string().email("Invalid email"),
    subject: z.string().min(1, "Subject must not be empty"),
    message: z.string().min(1, "Message must not be empty"),
    agreed: z.literal(true, {
        errorMap: () => ({message: "You must accept the privacy terms to continue"}),
    }),
});
