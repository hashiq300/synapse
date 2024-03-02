import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import Markdown from "react-markdown"

type PreviewHeaderProps = {
    title: string
    id: string
}

const PreviewHeader = ({ title, id }: PreviewHeaderProps) => {
    return (
        <div className="flex items-center">
            <Link href="/">
                <ArrowLeft size={40} />
            </Link>
            <h1 className="text-5xl font-bold ml-5 text-black/80 flex-1">{title}</h1>
            <div>
                <Link href={`/note/edit/${id}`} className="bg-[#F5F5F5] rounded-full p-2">
                    <Edit size={20} />
                </Link>
            </div>
        </div>
    )
}

export default PreviewHeader
