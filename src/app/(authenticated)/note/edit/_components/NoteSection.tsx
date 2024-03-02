"use client"
import { insertNote } from "@/actions/insertNote";
import { updateNote } from "@/actions/updateNote";
import MDEditor from "@uiw/react-md-editor";
import { PiIcon } from "lucide-react";
import { SetStateAction, useEffect, useRef, useState } from "react";

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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [note])


  return <>
    <>
      <form onSubmit={handleNoteSubmit}>
        <textarea
          ref={textAreaRef}
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
          disabled={allDisabled}
          placeholder="Take a note..."
          className='w-full h-[70vh] hide_scrollbar p-4 rounded-lg bg-transparent text-[#1A1A1A] font-normal text-2xl focus:outline-none resize-none'
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
