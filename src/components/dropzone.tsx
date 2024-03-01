"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

type CustomImageDropzoneProps = {
  files: File[];
  setFiles: () => void;
};

const CustomImageDropzone = ({ files, setFiles }: CustomImageDropzoneProps) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Update the state with the newly added files, converting them to URL objects for rendering
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only image files
    multiple: true, // Allow multiple files to be uploaded
  });

  // Cleanup preview URLs to prevent memory leaks
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div
      {...getRootProps()}
      className="flex flex-col gap-2 justify-center items-center border-black border-2 rounded-lg p-5 border-dashed m-4"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here ...</p>
      ) : (
        <p>Drag 'n' drop some images here, or click to select images</p>
      )}
      <aside className="flex gap-4 flex-wrap">
        {files.map((file) => (
          <div key={file.path}>
            <img
              className="w-[200px] object-cover"
              src={file.preview}
              alt="preview"
            />
            <span>{file.name}</span>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default CustomImageDropzone;
