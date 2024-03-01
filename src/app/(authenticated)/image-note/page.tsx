"use client"

import Dropzone from '@/components/dropzone'
import axios from 'axios';
import React,{ useState } from 'react'

const page = () => {
    const [files, setFiles] = useState<File[]>([]);

    console.log(files)

    const url = "https://firebasestorage.googleapis.com/v0/b/medvault-32ef5.appspot.com/o/mxXm0f5rp7dCPQ0Z1IJwK8rNbwY2%2Fprescription%2Fprescription.png?alt=media&token=25351c20-5242-4e72-924e-425a477ad474"

    const handleUploadFile = () => {
        axios.post("https://54b0-103-147-209-201.ngrok-free.app/get-prescription", {
              "prescription_image": url,
            }).then((res) => console.log(res.data)).catch(err => console.log(err));
    }

  return (
    <div>
        <Dropzone files={files} setFiles={setFiles}/>
        <button onClick={handleUploadFile}>Click me</button>
    </div>
  )
}

export default page