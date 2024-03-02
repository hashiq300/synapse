'use client'

import React from "react";
import useVoiceToTextRecognition from "@/hooks/useTextRecognition";

const page = () => {
  const { isRecording, note, notesStore, setIsRecording, storeNote } =
    useVoiceToTextRecognition();

  const handleStartStopClick = () => {
    setIsRecording(!isRecording);
  };

  const handleSaveNote = () => {
    storeNote();
  };

  console.log("notesStore", notesStore);

  return (
    <div>
      <button className="bg-white rounded-lg p-3" onClick={handleStartStopClick}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <button className="bg-gray-500 text-white rounded-lg p-3" onClick={handleSaveNote} disabled={!note}>
        Save Note
      </button>
      <div>
        <p>Current Note: {note}</p>
        <ul>
          {notesStore.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
