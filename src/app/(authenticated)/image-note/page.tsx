"use client";

import Dropzone from "@/components/dropzone";
import axios from "axios";
import React, { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { Loader2 } from "lucide-react";

type ImageType = {
  key: string;
  name: string;
  size: number;
  url: string;
};

const page = () => {
  const [isGeneratingNote, setIsGeneratingNote] = useState<boolean>(false);
  const [generatedNote, setGeneratedNote] = useState<string>("");
  const [error, setError] = useState<string>("")
  const [image, setImage] = useState<ImageType>({
    key: "",
    name: "",
    size: 0,
    url: "",
  });

  const handleSubmitImage = () => {
    setIsGeneratingNote(true);
    axios
      .post("/api/ai/vision", {
        imageUrl: image.url,
      })
      .then((res) => setGeneratedNote(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsGeneratingNote(false));
  };

  console.log("Generated Note: ", generatedNote);

  return (
    <div className="p-5 h-screen overflow-y-scroll">
      {!image.url && (
        <UploadDropzone
          appearance={{
            button: {
              backgroundColor: "#FF9B73",
              accentColor: "#FF9B73",
            },
            label: {
              color: "#FF9B73",
            },
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            setImage({
              key: res[0].key,
              name: res[0].name,
              size: res[0].size,
              url: res[0].url,
            });
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
            setError(error.message)
          }}
        />
      )}
      {image.url && (
        <div className="flex flex-col items-start gap-3 mt-12">
          <h1>{image.name}</h1>
          <Image
            src={image.url}
            alt={image.name}
            width={300}
            height={300}
            className="object-cover"
          />
          <button
            onClick={handleSubmitImage}
            className="bg-[#FF9B73] text-white p-3 px-5 rounded-xl min-w-[200px] flex justify-center"
          >
            {isGeneratingNote ? (
                <div className="h-fit flex items-center gap-4">
                    <p>Generating note...</p>
                    <div className="animate-spin">
                        <Loader2 size={30} />
                    </div>
                </div>

            ) : (
              "Generate Note"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
