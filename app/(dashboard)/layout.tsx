"use client";

import { HeaderNav } from "@/app/(dashboard)/HeaderNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <main className="w-full">
        {/* Constrained container for better desktop viewing */}
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-none lg:max-w-[1440px]">{children}</div>
        </div>
      </main>
    </div>
  );
}
