import React from "react";
import Markdown from "react-markdown";

const page = () => {




  return (
    <div className="bg-[url('/images/dots.svg')] w-full h-screen overflow-y-auto p-14">
      <Markdown className="prose prose-slate ">{""}</Markdown>
    </div>
  );
};

export default page;
