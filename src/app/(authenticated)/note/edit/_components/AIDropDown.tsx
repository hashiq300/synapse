import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import axios from "axios"
import GeminiIcon from "./GeminiIcon"

type AIDropDownProps = {
    selectedText: string
    note: string
    setNote: (note: string) => void
    setAllDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    allDisabled: boolean
}

type AllowedActions = "summarize" | "structured" | "explain"

const AIDropDown = ({
    selectedText,
    note,
    setNote,
    setAllDisabled,
    allDisabled
}: AIDropDownProps) => {

    const handleAiText = async (keyword: AllowedActions) => {
        if (selectedText.length > 5) {
            try {
                setAllDisabled(true)
                const res = await axios.post("/api/ai/structure", {
                    text: getPrompt(keyword, selectedText)
                })
                console.log(res.data)
                if (res.data) {
                    const modifiedNote = note.replace(selectedText, res.data.status ?? "");
                    setNote(modifiedNote)
                }
            } catch (error: any) {

            } finally {
                setAllDisabled(false)
            }
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600" disabled={allDisabled}>
                    <GeminiIcon />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem onClick={() => handleAiText("summarize")}>
                    Summarize
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAiText("structured")}>
                    Structured
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAiText("explain")}>
                    Explain
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function getPrompt(keyword: AllowedActions, text: string) {
    if (keyword === "summarize") {
        return `summarize this text \n---\n${text}\n---\n---`
    } else if (keyword === "explain") {
        return `explain this text \n---\n${text}\n---\n---`
    }
    return `convert this text into markdown \n---\n${text}\n---\n---`
}


export default AIDropDown
