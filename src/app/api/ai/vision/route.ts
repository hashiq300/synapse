
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const MODEL_NAME = "gemini-1.0-pro-vision-latest";
const API_KEY = "AIzaSyDFhnm1R2_HY9o6YCNkrroNoUSuq-0mT5o";

export const POST = async (request: NextRequest) => {
    const { imageUrl } = await request.json();

    console.log(imageUrl)

    if (!imageUrl) {
        return NextResponse.json({
            status: "error",
            error: "Please provide a valid imageUrl in the request body."
        }, { status: 400 }); // Bad Request
    }

    const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer'
    });


    const base64Image = Buffer.from(response.data, 'binary').toString('base64');


    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];



    const parts = [
        { text: "YOU CAN REPLY IN A DETAILED RESPONSE ONLY. SEND ME A SHORT EXPLANATION OF THE LECTURE NOTE OF THE IMAGE I SEND YOU. \n\n" },
        { inlineData: { mimeType: "image/png", data: base64Image } },
    ];

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });

        const response = result.response;
        console.log(response.text());

        return NextResponse.json({
            status: "success",
            data: response.text()
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            status: "error",
            error: error.message
        }, {
            status: 500
        })

    }
}
