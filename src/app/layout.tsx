// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "MediScanX",
  description: "Your first step to intelligent medical imaging",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
