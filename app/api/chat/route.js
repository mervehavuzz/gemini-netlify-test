import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Hatanın kökeni model ismindeki 'latest' veya 'flash' ekleri olabilir.
    // 2026 standartlarında en garanti ve sürümden bağımsız isim budur:
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro" 
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return NextResponse.json({ text: response.text() });

  } catch (error) {
    // Eğer hala 404 alıyorsak, sorun API anahtarının yetkisindedir.
    return NextResponse.json(
      { error: `Google API Yanıtı: ${error.message}` }, 
      { status: 500 }
    );
  }
}
