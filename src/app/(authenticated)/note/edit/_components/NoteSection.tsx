"use client"
import { insertNote } from "@/actions/insertNote";
import { updateNote } from "@/actions/updateNote";
import MDEditor from "@uiw/react-md-editor";
import { PiIcon } from "lucide-react";
import { SetStateAction, useState } from "react";

type NoteSectionProps = {
  note: string;
  setNote: (note: string) => void;
  allDisabled: boolean;
  setAllDisabled: (disabled: SetStateAction<boolean>) => void;
  setSelected: (val: SetStateAction<string>) => void;
};

const NoteSection = ({
  note,
  setNote,
  allDisabled,
  setSelected,
  setAllDisabled,
}: NoteSectionProps) => {



  const handleNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitted')
  }



  return <>
    <>
      <form onSubmit={handleNoteSubmit}>
        <textarea
          value={note}
          onInput={(e) => {
            e.currentTarget.style.height = ""; /* Reset the height*/
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
            setNote(e.currentTarget.value)
          }}
          onPasteCapture={(e) => {
            e.currentTarget.style.height = ""; /* Reset the height*/
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
          disabled={allDisabled}
          placeholder="Take a note..."
          className='w-full h-auto p-4 rounded-lg bg-transparent text-[#1A1A1A] font-normal text-2xl focus:outline-none resize-none'
          onSelectCapture={(e) => {
            const text = window.getSelection()?.toString() ?? ""
            console.log(text)
            setSelected(text)
          }}
        />
      </form>
    </>

  </>;
};

export default NoteSection;
