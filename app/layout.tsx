// app/layout.tsx
// @ts-ignore: CSS side-effect import may not have type declarations in some setups
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "../providers/auth/AuthProvide";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MICROCREDIT -Sistema de Gestão de Crédito",
  description: "Sistema integrado para gestão de postes eléctricos",
  icons: {
    icon: "favicon.png",
    shortcut: "favicon.png",
    apple: "favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
