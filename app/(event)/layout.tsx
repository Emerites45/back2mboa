import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollPopupProvider } from "@/components/sections/ScrollPopup";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollPopupProvider>
      <div className="relative min-h-screen bg-black text-white">
        <Navbar />
        <main className="relative z-10">{children}</main>
      </div>
    </ScrollPopupProvider>
  );
}
