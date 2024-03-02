"use client"
import { useState } from "react"
import NoteSection from "./NoteSection"
import TitleInput from "./TitleInput"
import { notes } from "@/schema/note"

type NoteBodyProps = {
    userNote?: typeof notes.$inferSelect;
    type: "new" | "edit";
}
const NoteBody = ({ userNote, type }: NoteBodyProps) => {
    const [note, setNote] = useState(userNote?.note ?? "");
    const [allDisabled, setAllDisabled] = useState(false)
    const [selectedText, setSelectedText] = useState("");

    return (
        <>
            <TitleInput
                defaultTitle={userNote?.title}
                setNote={(note) => setNote(note)}
                note={note}
                id={userNote?.id}
                selectedText={selectedText}
                setAllDisabled={setAllDisabled}
                allDisabled={allDisabled}
                type={type}
            />
            <NoteSection
                setAllDisabled={setAllDisabled}
                setNote={(note) => setNote(note)}
                note={note}
                setSelected={setSelectedText}
                allDisabled={allDisabled}
            />
        </>
    )
}

export default NoteBody
