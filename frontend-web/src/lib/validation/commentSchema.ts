import {z} from "zod";

export const commentSchema = z.object({
    name: z.string().min(1, "Name is required."),
    comment: z.string().min(1, "Comment cannot be empty."),
    agreed: z.literal(true, {
        errorMap: () => ({message: "You must accept the privacy terms to continue"}),
    }),
});
