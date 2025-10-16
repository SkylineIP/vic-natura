"use client";

import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useOrientation from "./components/verificaOrientacao";
import { usePathname } from "next/navigation";
import LoadingOverlay from "./components/Loading";
import { useContextDefault } from "@/context/Context";
import TelaCheia from "./components/TelaCheia";

//configurar tema
//cores e fontes

const theme = createTheme({
  palette: {
    background: {
      default: "#080830",
    },
    primary: {
      main: "#EBF7FD",
    },
    secondary: {
      main: "#EBF7FD",
    },
    text: {
      primary: "#080830",
      secondary: "#EBF7FD",
    },
  },
});
const OrientationWarning = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-second text-first">
    <h1 className="text-2xl font-bold mb-4">Modo Paisagem Necessário</h1>
    <p className="text-center">
      Por favor, rotacione seu dispositivo para o modo paisagem para uma melhor
      experiência.
    </p>
  </div>
);

const FullscreenPrompt = ({ onEnter }: { onEnter: () => void }) => (
  <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Melhor Experiência em Tela Cheia</h2>
      <p className="text-gray-600">
        Para uma visualização imersiva, recomendamos ativar o modo de tela cheia.
      </p>
      <button
        onClick={onEnter}
        className="mt-4 px-6 py-2 bg-[#F28B2D] text-white font-semibold rounded-lg hover:bg-[#D97924] transition-colors"
      >
        Entrar em Tela Cheia
      </button>
    </div>
  </div>
);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isLandscape = useOrientation();
  const context = useContextDefault();
  const abrirImagensTelaCheia = context?.abrirImagensTelaCheia;
  const [isFullscreen, setIsFullscreen] = useState(true);

  useEffect(() => {
    const checkFullscreen = () => {
      const currentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(currentlyFullscreen);
    };
    const timer = setTimeout(checkFullscreen, 500);

    // Listen for changes in fullscreen status.
    document.addEventListener("fullscreenchange", checkFullscreen);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("fullscreenchange", checkFullscreen);
    };
  }, []); // Empty dependency array ensures this runs only once on mount.

  const handleEnterFullscreen = () => {
    document.documentElement.requestFullscreen().catch(console.error);
  };
  useEffect(() => {
    setLoading(true); // Ativa o loading
    const timer = setTimeout(() => {
      setLoading(false); // Desativa após 2s
    }, 3000);

    return () => clearTimeout(timer); // Evita bugs ao desmontar
  }, [pathname]);
  return (
    <ThemeProvider theme={theme}>
      {loading && <LoadingOverlay />}
      {!isFullscreen && <FullscreenPrompt onEnter={handleEnterFullscreen} />}
      {isLandscape && isFullscreen ? children : !isLandscape ? <OrientationWarning /> : null}
      {/* {abrirImagensTelaCheia?.open && <TelaCheia />} */}
      {/* <ButtonSoundAudio /> */}
      {/* <Music /> */}
    </ThemeProvider>
  );
}
