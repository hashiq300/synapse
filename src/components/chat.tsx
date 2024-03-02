"use client";

import React, { useState } from "react";
import { Maximize2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

const Chat = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      message: "Hello, I am synapseAI®. How can I help you ?",
    },
  ]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (input.trim() === "") return;
    addMessage("user", input);

    axios
      .post("/api/ai/structure", {
        text: input,
      })
      .then((res) => {
        console.log(res);
        addMessage("bot", res.data?.status);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    setInput("");
  }

  const addMessage = (from: string, message: string) => {
    setMessages((prev) => [...prev, { from, message }]);
  };

  return (
    <div className="w-[90%] h-[calc(100vh-20vh)] bg-[#FFE9C7] rounded-[15px] shadow-link px-4 py-8 relative">
      <div className="h-fit flex justify-between items-center">
        <h3 className="text-lg font-normal text-[#1A1A1A]">synapseAI</h3>
        <Maximize2 size={16} />
      </div>
      <hr className="mt-5 mb-7" style={{ border: "1px solid #1A1A1A" }} />

      <div className="h-[360px] overflow-y-scroll chat_scroll">
        {messages.map((message, i) => (
          <Message key={i} from={message.from} message={message.message} />
        ))}

        <form className="w-[96%] h-11 bg-white rounded-full flex items-center justify-between px-1 shadow-link absolute bottom-4 left-2 right-2">
          <input
            type="text"
            placeholder="ask me something"
            className="h-11 rounded-full text-[#1A1A1A] pl-3 focus:outline-none placeholder:text-[#1A1A1A] font-light text-xs"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            disabled={loading}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-full p-2 bg-primary"
            disabled={loading}
          >
            <Send size={20} strokeWidth={1} />
          </button>
        </form>
      </div>
    </div>
  );
};

function Message({ from, message }: { from: string; message: string }) {
  return (
    <div
      className={cn(
        "flex flex-col w-[90%] gap-1.5  shadow-link p-5 text-[0.69156rem] mt-2 bg-white",
        from === "bot" && "mr-auto rounded-tr-2xl rounded-bl-2xl rounded-br-2xl",
        from === "user" && "translate-x-[30px] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
      )}
    >
      <div>
        {/* <Avatar
            className={cn(
              "w-8 h-8 rounded-full",
              from === "bot" && "mr-auto",
              from === "user" && "ml-auto "
            )}
          >
            <AvatarImage src={from === "bot" ? "/svg/ai.svg" : userImage} />
          </Avatar> */}
      </div>
      <div
        className={cn(
          "rounded-[1.875rem] flex-grow text-sm text-black",
          from === "bot" && "text-left",
          from === "user" && "text-right "
        )}
      >
        {message}
      </div>
    </div>
  );
}

export default Chat;
