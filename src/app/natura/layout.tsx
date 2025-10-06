"use client";

import Sidebar from "./components/Sidebar";

export default function Project({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-background min-h-[800px] min-w-[1200px] project-name grid grid-cols-24 grid-rows-24">
      <Sidebar/>
      {children}
    </div>
  );
}
