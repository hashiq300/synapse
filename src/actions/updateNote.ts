"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { noteSchema, updateNoteSchema, updateTitleSchema } from "@/lib/validation"
import { notes } from "@/schema/note"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"


export const updateTitle = async (data: FormData) => {
    const dataObj = Object.fromEntries(data)
    console.log(dataObj)
    const session = await auth()
    if (!session?.user) {
        return {
            data: null,
            error: "Unauthorized"
        }
    }


    const userId = session.user.id

    if (!userId) {
        return {
            data: null,
            error: "Server Error"
        }
    }

    const parsedData = updateTitleSchema.safeParse(dataObj)

    if (!parsedData.success) {
        return {
            data: null,
            error: parsedData.error.format()
        }
    }

    const note = await db.update(notes).set({
        title: parsedData.data.title,
    }).where(
        and(eq(notes.id, parsedData.data.id),
            eq(notes.userId, userId)))
        .returning({ id: notes.id })
    if (note.length === 0) {
        return {
            data: null,
            error: "Note not found"
        }
    }

    revalidatePath("/")
    return {
        data: note[0].id,
        error: null
    }
}

export const updateNote = async (data: FormData) => {
    const dataObj = Object.fromEntries(data)
    console.log(dataObj)
    const session = await auth()
    if (!session?.user) {
        return {
            data: null,
            error: "Unauthorized"
        }
    }

    const parsedData = updateNoteSchema.safeParse(dataObj)

    if (!parsedData.success) {
        return {
            data: null,
            error: parsedData.error.format()
        }
    }

    const userId = session.user.id

    if (!userId) {
        return {
            data: null,
            error: "Server Error"
        }
    }

    const note = await db.update(notes).set({
        note: parsedData.data.note,
    }).where(
        and(eq(notes.id, parsedData.data.id),
            eq(notes.userId, userId)))
        .returning({ id: notes.id })

    if (note.length === 0) {
        return {
            data: null,
            error: "Note not found"
        }
    }

    revalidatePath("/")
    return {
        data: note[0].id,
        error: null
    }
}