import NoteSection from "@/components/note-section";
import SearchBar from "@/components/search-bar";
import TakeNote from "@/components/take-note";
import User from "@/components/user";

export default function Home() {
  return (
    <div className="flex">

      <div className="flex-[2.5] p-14 h-screen overflow-y-auto">
        <SearchBar />
        <div className="flex justify-between mt-14">
          <TakeNote/>
          <TakeNote/>
          <TakeNote/>
        </div>

        <NoteSection />
      </div>


      <div className="flex-[1] py-14">
        <User />
      </div>
    </div>
  );
}
