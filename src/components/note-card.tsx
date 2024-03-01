'use client'

import React, { useState } from "react";
import { Pen, Palette, Trash2, Bookmark } from "lucide-react";
import { cardColors } from "@/data/colors";

type NoteCardProps = {
  date: string;
  title: string;
  id: string;
  color: string;
};

const NoteCard = ({ date, title, id, color }: NoteCardProps) => {
  const [backgroundColor, setBackgroundColor] = useState(color);

  const handleColorChange = () => {
    const randomIndex = Math.floor(Math.random() * cardColors.length);
    setBackgroundColor(cardColors[randomIndex]);
  };

  return (
    <div style={{ backgroundColor: backgroundColor }} className={`w-[290px] h-[200px] p-6 rounded-2xl flex flex-col justify-between`}>
      <div className="flex flex-col gap-3">
        <p className="text-[#1A1A1A] font-normal text-xs">{date}</p>
        <h2 className="text-[#1A1A1A] font-normal text-lg">
          {title}
        </h2>
      </div>

      <div className="h-fit flex justify-between items-center">
        <div className="flex gap-6">
          <button onClick={handleColorChange}>
            <Palette size={20} strokeWidth={1} />
          </button>
          <button>
            <Trash2 size={20} strokeWidth={1} />
          </button>
          <button>
            <Bookmark size={20} strokeWidth={1} />
          </button>
        </div>
        <button className="p-2 rounded-full bg-white">
          <Pen size={20} color="#000" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
