import React from "react";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* <Navbar /> */}
      <main className="relative z-10">{children}</main>
    </div>
  );
}
