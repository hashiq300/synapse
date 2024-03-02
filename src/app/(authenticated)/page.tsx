import Chat from "@/components/chat";
import NoteSection from "@/components/note-section";
import SearchBar from "@/components/search-bar";
import TakeNote from "@/components/take-note";
import User from "@/components/user";
import { Calendar, Image, Brush } from "lucide-react";

export default function Home() {
  return (
    <div className="flex">

      <div className="flex-[2.5] p-14 h-screen overflow-y-auto hide_scrollbar">
        <SearchBar />
        <div className="flex justify-between mt-14">
          <TakeNote href="/note/edit" title="Take a note" icon={<Calendar size={20} color='#1A1A1A' />} />
          <TakeNote href="/image-note" title="Upload a picture" icon={<Image size={20} color='#1A1A1A'/>}/>
          <TakeNote href="/add-note" title="Draw something" icon={<Brush size={20} color='#1A1A1A'/>}/>
        </div>

        <NoteSection />
      </div>


      <div className="w-full flex-[1] pt-14 pb-5 flex flex-col justify-between items-center">
        <User />
        <Chat/>
      </div>
    </div>
  );
}
