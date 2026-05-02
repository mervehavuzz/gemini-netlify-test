import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. İstek içerisindeki prompt'u al
    const { prompt } = await req.json();

    // 2. Netlify Environment Variables kısmına girdiğin API anahtarını çağır
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // 3. Model ismini en stabil versiyon olan 'gemini-1.5-flash-latest' olarak belirle
    // Not: Eğer hala 404 verirse sadece "gemini-pro" olarak burayı güncelleyebilirsin.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest" 
    });

    // 4. Gemini'den yanıt oluşturmasını iste
    const result = await model.generateContent(prompt);
    
    // 5. Yanıtı bekle ve metin formatına dönüştür
    const response = await result.response;
    const text = response.text();

    // 6. Başarılı sonucu JSON olarak döndür
    return NextResponse.json({ text });

  } catch (error) {
    console.error("Gemini API Hatası:", error);
    
    // Hata oluşursa detaylı mesajı ekranda göster
    return NextResponse.json(
      { error: `API Hatası: ${error.message}` }, 
      { status: 500 }
    );
  }
}
