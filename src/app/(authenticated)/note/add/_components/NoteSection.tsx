"use client";

import MDEditor from "@uiw/react-md-editor";
import { PiIcon } from "lucide-react";
import { useState } from "react";

type NoteSectionProps = {
  content?: string | null;
};

const NoteSection = ({ content }: NoteSectionProps) => {
  const [value, setValue] = useState(content ?? "")

  const handleNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitted')
  }
  return <>
    <>
      <form onSubmit={handleNoteSubmit}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full pt-2 px-0 text-2xl text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
              disabled={false}
              defaultValue={""}
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">

              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <PiIcon />
                <span className="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </form>

    </>

  </>;
};

export default NoteSection;
