"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { noteSchema } from "@/lib/validation"
import { users } from "@/schema/auth"
import { notes } from "@/schema/note"
import crypto from "crypto"
import { revalidatePath } from "next/cache"

export const insertNote = async (data: FormData) => {
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

    const parsedData = noteSchema.safeParse(dataObj)

    if (!parsedData.success) {
        return {
            data: null,
            error: parsedData.error.format()
        }
    }

    const note = await db.insert(notes).values({
        id: crypto.randomUUID(),
        title: parsedData.data.title,
        note: parsedData.data.note,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
    }).returning({ id: notes.id })

    revalidatePath("/")

    return {
        data: note[0].id,
        error: null
    }
}