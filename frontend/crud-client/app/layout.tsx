import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRUD Clientes",
  description: "Frontend Next.js para gestión de clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}