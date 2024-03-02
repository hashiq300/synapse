import { auth } from "@/lib/auth"
import { db } from "@/lib/db";
import { notes } from "@/schema/note";
import { and, eq, not } from "drizzle-orm";
import { redirect } from "next/navigation";
import NoteBody from "../_components/NoteBody";

const NoteWithIdPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const userId = session?.user?.id;

  const note = await db.select().from(notes).where(and(eq(notes.id, params.id), eq(notes.userId, userId!)))

  if (note.length === 0) {
    return redirect("/")
  }

  return (

    <div className="max-w-[80%] pl-16 pt-12 h-screen overflow-y-auto hide_scrollbarbar">
      <NoteBody userNote={note[0]} type="edit" />
    </div>
  )
}

export default NoteWithIdPage
