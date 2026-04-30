"use client";
import { useState } from "react";

export default function Home() {
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);

  const testGemini = async () => {
    setLoading(true);
    setRes("Gemini'ye soruluyor...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ prompt: "Merhaba, eğer bu mesajı okuyorsan sistem çalışıyor demektir. Bir şaka yap!" }),
      });
      const data = await response.json();
      setRes(data.text || "Hata: " + data.error);
    } catch (err) {
      setRes("Bağlantı hatası!");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>⚖️ Gemini API Test Paneli</h1>
      <button 
        onClick={testGemini} 
        style={{ padding: "15px 30px", fontSize: "16px", cursor: "pointer", background: "purple", color: "white", border: "none", borderRadius: "8px" }}
        disabled={loading}
      >
        {loading ? "Bağlanıyor..." : "Gemini'yi Test Et"}
      </button>
      <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc", background: "#f9f9f9", borderRadius: "8px" }}>
        <strong>Gemini'nin Cevabı:</strong><br/><br/>
        {res}
      </div>
    </div>
  );
}
