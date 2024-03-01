"use client"

import { Cross, Edit, X } from "lucide-react"
import { useState } from "react"

type TitleInputProps = {
    defaultTitle?: string | null,
}
const TitleInput = ({
    defaultTitle
}: TitleInputProps) => {

    const [title, setTitle] = useState(defaultTitle ?? "")
    const [isEditable, setIsEditable] = useState(false)

    const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsEditable(false)
    }
    return (
        <div className="mb-6" onDoubleClick={() => setIsEditable(true)} onBlur={() => setIsEditable(false)}>
            {!isEditable && (
                <div className="flex items-center justify-between bg-white p-4 rounded-md py-6">
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <button onClick={() => setIsEditable(true)} className="text-black/50">
                        <Edit />
                    </button>
                </div>
            )}
            {isEditable && (
                <form onSubmit={handleTitleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        id="large-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Enter the Title of Note'
                        className="block w-full p-6 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-4xl"
                    />
                    <button onClick={() => setIsEditable(false)} type="button" className="bg-red-400 px-7 text-white rounded-md">
                        <X />
                    </button>
                </form>
            )}
        </div>

    )
}

export default TitleInput
