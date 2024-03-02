"use server"

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notes } from "@/schema/note";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteNote = async (id: string) => {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "Unauthorized",
            data: null
        }
    }


    const userId = session.user.id;


    const note = await db.delete(notes).where(and(eq(notes.id, id), eq(notes.userId, userId))).returning({ id: notes.id })

    if (note.length === 0) {
        return {
            error: "Note not found",
            data: null
        }
    }

    revalidatePath("/")

    return {
        error: null,
        data: note[0].id
    }

}