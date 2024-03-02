import { z } from "zod"


export const structureSchema = z.object({
    text: z.string().trim().min(5).max(10000, {
        message: "Text must be between 5 and 10000 characters"
    })
})

export const noteSchema = z.object({
    title: z.string().trim().min(3).max(100, {
        message: "Title must be between 5 and 100 characters"
    }),
    note: z.string().trim().max(10000, {
        message: "Note must be below 10000 characters"
    }),

})

export const updateTitleSchema = z.object({
    title: z.string().trim().min(3).max(100, {
        message: "Title must be between 5 and 100 characters"
    }),
    id: z.string().uuid()
})


export const updateNoteSchema = z.object({
    note: z.string().trim().max(10000, {
        message: "Note must be below 10000 characters"
    }),
    id: z.string().uuid()
})