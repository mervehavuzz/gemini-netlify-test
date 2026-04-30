// app/layout.js
export const metadata = {
  title: 'Gemini Test Bot',
  description: 'Siber Hukuk Botu Test Aşaması',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}
