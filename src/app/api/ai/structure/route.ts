import { structureSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai";

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


        const response = await model.generateContent(parsedData.data.text)



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