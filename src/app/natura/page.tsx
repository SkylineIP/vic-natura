"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useContextDefault } from "@/context/Context";
import Image from "next/image";

const MenuPage: React.FC = () => {
  const router = useRouter();
  const context = useContextDefault();

  const menuButtons = [
    { label: "localizacao", icon: "/menu/location.svg", href: "/natura/localizacao", submenu: "mapa2d" },
    { label: "imagens", icon: "/menu/images.svg", href: "/natura/imagens" },
    { label: "plantas", icon: "/menu/plants.svg", href: "/natura/plantas", submenu: "Implantação" },
    { label: "ficha-tecnica", icon: "/menu/tech.svg", href: "/natura/ficha-tecnica" },
    { label: "vídeos", icon: "/menu/videos.svg", href: "/natura/videos" },
  ]

  enum labelButtons {
    "localizacao" = "Localização",
    "imagens" = "Imagens",
    "plantas" = "Plantas",
    "ficha-tecnica" = "Ficha Técnica",
    "vídeos" = "Vídeos",
  }

  const sideButtons = [
    { label: "lancamento", icon: "/menu/b-lancamento.png" },
    { label: "obras", icon: "/menu/b-obras-iniciadas.png" },
    { label: "pronto", icon: "/menu/b-pronto-morar.png" },
    { label: "breve", icon: "/menu/b-breve-lancamento.png" },
    { label: "vic", icon: "/menu/b-vic.png" }
  ]

  interface buttonHandlerProps {
    href: string,
    label: string,
    submenu?: string
  }

  const handleButtonClick = ({ href, label, submenu }: buttonHandlerProps) => {
    router.push(href)
    context?.setSubmenuAndSelected?.(label, submenu || "")
  }



  return (
    <>
      <div className="row-span-24 col-span-1 bg-[#3F4444] grid grid-cols-1 grid-rows-24">
        <button className="row-start-1 row-span-2 col-span-1 p-2">
          <Image
            src="/menu/menu.png"
            alt="logo"
            width={800}
            height={450}
            className="object-cover"
          />
        </button>
        {sideButtons.map((btn, i) => (
          <button
            key={btn.label}
            className="col-span-1 p-2 hover:bg-[#F28B2D] flex animate-fade-up duration-1000 items-center justify-center h-16" // Added flex and fixed height
            style={{
              gridRow: `${5 + i * 2} / span 1`,
              animationDelay: `${i * 0.4}s`
            }}
          >
            <Image
              src={btn.icon}
              alt={btn.label}
              width={40}
              height={40}
              className="object-contain"
            />
          </button>
        ))}
      </div>
      <div className="row-span-24 col-span-23 bg-menu grid grid-cols-23 grid-rows-24 bg-cover">
        <Image
          src="/menu/logo.jpg"
          alt="logo"
          width={800}
          height={450}
          className="object-cover col-span-5 row-span-5 col-start-2 row-start-3 animate-fade-down"
        />
        <div
          className="col-start-2 row-start-9 col-span-5 row-span-14 grid grid-cols-5"
          style={{
            gridTemplateRows: "repeat(14, 1fr)" // 5 buttons * 2 rows + 4 gaps = 14, but need 15 for last gap
          }}
        >
          {menuButtons.map((btn, i) => (
            <button
              key={btn.label}
              onClick={() => {
                handleButtonClick(btn)
              }}
              className="bg-[#F68B07] text-white flex items-center col-span-5 px-4 animate-fade-right duration-1000 py-4 font-bold text-lg w-full"
              style={{
                gridRow: `${i * 3 + 1} / span 2`, // Place each button, skip a row for gap
                animationDelay: `${i * 0.4}s`
              }}
            >
              <Image
                src={btn.icon}
                alt={btn.label}
                width={60}
                height={60}
                className="mr-2"
              />
              {labelButtons[btn.label as keyof typeof labelButtons]}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuPage;
