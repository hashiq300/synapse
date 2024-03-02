import { unstable_noStore as noStore } from "next/cache";
import { ChevronRight } from "lucide-react";
import NoteCard from "./note-card";
import { cardColors } from "@/data/colors";
import { auth } from "@/lib/auth";
import { notes } from "@/schema/note";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

const NoteSection = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const userNotes = await db.select().from(notes).where(eq(notes.userId, session.user.id));


  return (
    <div>
      <div className=" h-fit flex items-center justify-between py-14">
        <h3 className="font-normal text-xl text-[#1A1A1A]">
          All Notes
          <span className="font-normal text-base text-[#B0B0B0] ml-4">{userNotes.length} notes</span>
        </h3>
        {userNotes.length > 7 && (
          <div className="h-fit flex items-center">
          <p className=" font-normal text-lg text-[#B0B0B0]">See all</p>
          <ChevronRight size={15} color="#B0B0B0" />
        </div>
        )}
      </div>

      <div className="flex flex-wrap gap-5 justify-start">
        {userNotes.map((note, index) => {
          return (
            <NoteCard
              key={index}
              date={note.createdAt.toDateString()}
              title={note.title}
              id={note.id}
              color={index % 2 === 0 ? cardColors[0] : cardColors[1]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NoteSection;
