'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pen, Palette, Trash2, Bookmark } from "lucide-react";
import { cardColors } from "@/data/colors";
import Link from "next/link";
import { deleteNote } from "@/actions/deleteNote";

type NoteCardProps = {
  date: string;
  title: string;
  id: string;
  color: string;
};

const NoteCard = ({ date, title, id, color }: NoteCardProps) => {
  const [backgroundColor, setBackgroundColor] = useState(color);
  const [isHovered, setIsHovered] = useState(false);

  const handleColorChange = () => {
    const randomIndex = Math.floor(Math.random() * cardColors.length);
    setBackgroundColor(cardColors[randomIndex]);
  };

  const handleDelete = async () => {
    await deleteNote(id);
  }


  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  return (
    <Link href={`/note/preview/${id}`} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: backgroundColor }} 
      className={`w-[290px] h-[200px] p-6 rounded-2xl flex flex-col justify-between cursor-pointer`}>
      
      <div className="flex flex-col gap-3">
        <p className="text-[#1A1A1A] font-normal text-xs">{date}</p>
        <h2 className="text-[#1A1A1A] font-normal text-lg">{title}</h2>
      </div>

      <motion.div 
        className="h-fit flex justify-between items-center"
        variants={variants}
        initial="hidden"
        animate={isHovered ? "visible" : "hidden"}>
        <div className="flex gap-6">
          <button onClick={handleColorChange}>
            <Palette size={20} strokeWidth={1} />
          </button>
          <button onClick={handleDelete}>
            <Trash2 size={20} strokeWidth={1} />
          </button>
          <button>
            <Bookmark size={20} strokeWidth={1} />
          </button>
        </div>
        <Link suppressHydrationWarning href={`/note/edit/${id}`} className="p-2 rounded-full bg-white">
          <Pen size={20} color="#000" />
        </Link>
      </motion.div>
    </Link>
  );
};

export default NoteCard;
