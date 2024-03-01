import NoteBody from "./_components/NoteBody"
import TitleInput from "./_components/TitleInput"

const NoteAddPage = () => {
    return (
        <div className="max-w-[80%] pl-16 pt-12">
            <TitleInput defaultTitle="Hello" />
            <NoteBody />
        </div>
    )
}

export default NoteAddPage
