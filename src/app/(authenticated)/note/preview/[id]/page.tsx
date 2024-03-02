import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notes } from "@/schema/note";
import { and, eq } from "drizzle-orm";
import PreviewHeader from "./_components/PreviewHeader";
import PreviewBody from "./_components/PreviewBody";

const PreviewPage = async ({ params }: { params: { id: string } }) => {
    const session = await auth();
    const userId = session?.user?.id;
    const note = await db.select().from(notes).where(and(eq(notes.id, params.id), eq(notes.userId, userId!))).limit(1);

    return (
        <div className="ml-12 mt-12 w-[75vw] h-screen overflow-y-auto hide_scrollbar">
            <PreviewHeader id={note[0]?.id} title={note[0]?.title} />
            <PreviewBody note={note[0]?.note} />
        </div>
    )
}

export default PreviewPage
