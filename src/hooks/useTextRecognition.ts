

import { useEffect, useState } from "react"


function useVoiceToTextRecognition() {
    const [isRecording, setIsRecording] = useState(false)
    const [note, setNote] = useState<string>("")
    const [notesStore, setnotesStore] = useState<string[]>([]);
    const [microphone, setMicrophone] = useState<any>(null)

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition
        const microphone = new SpeechRecognition();

        microphone.continuous = true;
        microphone.interimResults = true;
        microphone.lang = "en-IN";
        setMicrophone(microphone)
    }, [])

    useEffect(() => {
        startRecordController();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecording]);

    const startRecordController = () => {
        if (!microphone) return;

        if (isRecording) {
            microphone.start();
            microphone.onend = () => {
                console.log("continue..");
                microphone.start();
            };
        } else {
            microphone.stop();
            microphone.onend = () => {
                console.log("Stopped microphone on Click");
            };
        }
        microphone.onstart = () => {
            console.log("microphones on");
        };

        microphone.onresult = (event: any) => {
            const recordingResult = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join("");
            console.log("text: ", event);
            setNote(recordingResult);
            microphone.onerror = (event: any) => {
                console.log(event.error);
            };
        };

        microphone.onsoundstart = (e: any) => {
            console.log(e)
        }
    };

    const storeNote = () => {
        setnotesStore(prev => ([...prev, note]));
        setNote("");
    };

    return {
        setIsRecording,
        isRecording,
        startRecordController,
        storeNote,
        notesStore,
        note
    }

}


export default useVoiceToTextRecognition