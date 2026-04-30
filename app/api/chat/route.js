import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    
    // API Anahtarını al
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 2026 standartlarına göre en stabil model ismi:
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // generateContent yerine bazen sürüm farkından dolayı hata olabiliyor, 
    // en güvenli çağırma yöntemi budur:
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ text });
  } catch (error) {
    // Hatanın detayını görmek için mesajı döndürüyoruz
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
