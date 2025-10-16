"use client";

import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import AnimatedText from "./animations/animatedText";

const Home: React.FC = () => {

  useEffect(() => {
    redirect("/natura")
   }, [])

  return (
    <div
      className="w-fulll h-screen bg-institucional overflow-hidden min-h-[800px] min-w-[1200px] flex justify-center items-center"
    >
      <AnimatedText text="Crie sua primeira experiência" />
    </div>
  );
};

export default Home;
