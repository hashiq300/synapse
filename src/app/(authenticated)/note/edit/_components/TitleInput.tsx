"use client"

import { ArrowLeft, Cross, Edit, MessageCircle, Network, Save, X } from "lucide-react"
import { SetStateAction, useCallback, useEffect, useState } from "react"
import GeminiIcon from "./GeminiIcon";
import axios from "axios";
import AIDropDown from "./AIDropDown";
import { insertNote } from "@/actions/insertNote";
import { updateNote, updateTitle } from "@/actions/updateNote";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TitleInputProps = {
    note: string;
    defaultTitle?: string;
    setNote: (note: string) => void;
    selectedText: string,
    setAllDisabled: (disabled: SetStateAction<boolean>) => void;
    allDisabled: boolean;
    type: "new" | "edit";
    id?: string
}
const TitleInput = ({
    defaultTitle,
    setNote,
    note,
    selectedText,
    setAllDisabled,
    allDisabled,
    type,
    id
}: TitleInputProps) => {

    const [title, setTitle] = useState(defaultTitle ?? "Untitled Note")
    const [isEditable, setIsEditable] = useState(false);
    const router = useRouter()

    const btnStyle = "inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"


    const handleTitleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setAllDisabled(true)
        const formData = new FormData()
        formData.append("title", title)
        formData.append("note", note)

        if (type === "new") {
            console.log("inserting note")
            const res = await insertNote(formData)
            if (res.error) {

            } else {
                router.replace(`/note/edit/${res.data}`)
            }
        } else if (id) {
            console.log("updating note")
            formData.append("id", id)
            const res = await updateTitle(formData)
            if (res.error) {

            } else {
                router.replace(`/note/edit/${res.data}`)
            }
        }



        setAllDisabled(false)
        setIsEditable(false)
    }


    const handleSave = async () => {
        setAllDisabled(true)

        const formData = new FormData()
        formData.append("note", note)
        formData.append("title", title)



        console.log("note is:", note)
        if (type === "new") {
            const res = await insertNote(formData)
            if (res.error) {
                console.log("error inserting note")

            } else {
                router.replace(`/note/edit/${res.data}`)
            }
        } else if (id) {
            formData.append("id", id)
            const res = await updateNote(formData)
            if (res.error) {
                console.log("error updating note")
            } else {
                router.replace(`/note/edit/${res.data}`)
            }
        }


        setAllDisabled(false)
    }




    useEffect(() => {
        const saveKeyPress = async (e: KeyboardEvent) => {
            if (allDisabled) return
            if (e.code === "KeyS" && e.ctrlKey) {
                e.preventDefault()
                setAllDisabled(true)

                const formData = new FormData()
                formData.append("note", note)
                formData.append("title", title)



                console.log("note is:", note)
                if (type === "new") {
                    const res = await insertNote(formData)
                    if (res.error) {
                        console.log("error inserting note")

                    } else {
                        router.replace(`/note/edit/${res.data}`)
                    }
                } else if (id) {
                    formData.append("id", id)
                    const res = await updateNote(formData)
                    if (res.error) {
                        console.log("error updating note")
                    } else {
                        router.replace(`/note/edit/${res.data}`)
                    }
                }
                console.log("saved")
                setAllDisabled(false)
            }

        }
        window.addEventListener("keydown", saveKeyPress);

        return () => window.removeEventListener("keydown", saveKeyPress);

    }, [note, title])

    useEffect(() => {
        if (!isEditable && title === "") {
            setTitle("Untitled Note")
        }
    }, [isEditable])

    return (
        <div className="flex gap-4 items-center py-4">
            <Link href="/">
                <ArrowLeft size={40} />
            </Link >

            <div className="flex-1" onDoubleClick={() => setIsEditable(true)}
                onBlur={() => setIsEditable(false)}>
                {isEditable && (
                    <form onSubmit={handleTitleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full text-5xl font-semibold text-[#1A1A1A] bg-transparent focus:outline-none'
                            disabled={allDisabled}
                        />

                    </form>
                )}
                {!isEditable && (
                    <h2 className='text-5xl font-semibold text-[#1A1A1A]'>{title}</h2>

                )}
            </div>
            <div className="flex gap-10">
                <button className={btnStyle} onClick={handleSave}>
                    <Save size={30} />
                </button>
                <AIDropDown
                    allDisabled={allDisabled}
                    selectedText={selectedText}
                    note={note}
                    setNote={setNote}
                    setAllDisabled={setAllDisabled}
                />
                <button className={btnStyle}>
                    <Network size={30} />
                </button>
                <button className={btnStyle}>
                    <MessageCircle size={30} />
                </button>
            </div>
        </div>

    )
}

export default TitleInput
