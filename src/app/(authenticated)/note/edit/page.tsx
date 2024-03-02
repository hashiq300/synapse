import NoteBody from "./_components/NoteBody"
import NoteSection from "./_components/NoteSection"
import TitleInput from "./_components/TitleInput"

const NoteAddPage = () => {

    return (
        <div className="max-w-[80%] pl-16 pt-12 h-screen overflow-y-auto hide_scrollbarbar">
            <NoteBody type="new" />
        </div>
    )
}

export default NoteAddPage
