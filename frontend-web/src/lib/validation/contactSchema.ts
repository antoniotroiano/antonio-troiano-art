import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, "Bitte Namen angeben"),
    email: z.string().email("Invalide email"),
    subject: z.string().min(1, "Bitte Betreff angeben"),
    size: z.string().optional(),
    colors: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(1, "Bitte Nachricht ausfüllen"),
    agreed: z.literal(true, {
        errorMap: () => ({ message: "Du musst die Datenschutzbestimmungen akzeptieren, um fortzufahren" }),
    }),
});
