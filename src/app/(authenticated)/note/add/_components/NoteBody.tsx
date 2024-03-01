"use client"

import NoteSection from "./NoteSection"

type NoteBodyProps = {
    content?: string | null
}


const NoteBody = ({ content }: NoteBodyProps) => {

    return (
        <>
            <NoteSection />
        </>
    )
}

export default NoteBody
