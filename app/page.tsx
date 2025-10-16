// app/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home"); // ou "/dashboard" - redireciona para o dashboard
  } else {
    redirect("/login"); // redireciona para o login
  }
}
