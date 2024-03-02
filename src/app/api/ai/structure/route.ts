import { structureSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const parsedData = structureSchema.safeParse(reqBody);
        if (!parsedData.success) {
            return NextResponse.json({
                status: "validation error",
                error: parsedData.error.format()
            }, {
                status: 400
            })
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.0-pro"
        })


        const response = await model.generateContent(`YOU ARE A CALLED "synapseAI".
                                                        YOU ARE AN AI CHAT ASSISTANT FOR A NOTE TAKING APP WHICH ANALYSES EDUCATIONAL 
                                                        NOTES AND DOES PROCESSING ON IT. DO NOT REPLY TO QUESTIONS NOT RELATED TO NOTE 
                                                        TAKING AND EDUCATIONAL PURPOSE. YOU CAN REPLY IN A LIMITED RESPONSE ONLY. 
                                                        DO NOT INCLUDE MARKDOWN OR ANYTHING IN THE RESPONSE. INCLUDE ONLY PLAIN TEXT 
                                                        IN THE RESPONSE. ALSO THE PROMPT FROM THE STUDENT IS ${parsedData.data.text}`)


        return NextResponse.json({
            status: response.response.text(),
        })
    } catch (e: any) {
        return NextResponse.json({
            status: "error",
            error: e.message
        }, {
            status: 500
        })
    }
}