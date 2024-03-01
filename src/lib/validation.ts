import { z } from "zod"


export const structureSchema = z.object({
    text: z.string().trim().min(5).max(10000, {
        message: "Text must be between 5 and 10000 characters"
    })
})