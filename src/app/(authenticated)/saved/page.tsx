import NoteCard from "@/components/note-card";
import { cardColors } from "@/data/colors";
import notes from "@/data/notes";
import React from "react";

const page = () => {
  return (
    <div className="p-14 h-screen overflow-y-scroll">
      <h3 className="text-4xl">
        Saved <span className="text-base text-gray-400">18 notes</span>
      </h3>

      <div className="flex flex-wrap gap-5 m-4 mt-10">
        {notes.map((note, index) => {
          return (
            <NoteCard
              key={index}
              date={note.date}
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

export default page;
