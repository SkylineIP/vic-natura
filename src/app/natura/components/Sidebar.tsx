'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useContextDefault } from '@/context/Context'
import { imagesObj } from '../imagens/images'
import { Slider } from '@mui/material'
import { submenuPlantas } from '../plantas/submenuPlantas'

const Sidebar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const context = useContextDefault()
    const submenu = context?.submenu
    const setSubmenuAndSelected = context?.setSubmenuAndSelected
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollValue, setScrollValue] = useState(100); // start at top
    const [isAnimating, setIsAnimating] = useState(true);
    const sidebarRoutes = [
        "/natura/localizacao",
        "/natura/imagens",
        "/natura/plantas",
        "/natura/ficha-tecnica",
        "/natura/videos",
    ]

    useEffect(() => {
        // Set a timer to remove animation classes after they have completed.
        // The duration should be longer than the longest animation delay + duration.
        const timer = setTimeout(() => setIsAnimating(false), 2000); // 1300ms delay + 1000ms duration
        return () => clearTimeout(timer);
    }, []);

    enum routes {
        "localizacao" = "Localização",
        "imagens" = "Imagens",
        "plantas" = "Plantas",
        "ficha-tecnica" = "Ficha Técnica",
        "videos" = "Vídeos",
    }

    const currentRoute = routes[pathname.split("/").pop() as keyof typeof routes]

    if (!currentRoute) {
        return null
    }   

    if (!sidebarRoutes.includes(pathname)) {
        return null
    }

    interface buttonProps {
        label: string
        icon: string
        onClick?: () => void
        classname: string
        rowspan: number
        isAnimating: boolean
        index: number
    }

    const is4k = typeof window !== 'undefined' ? window.innerWidth >= 3840 : false;
    
    const buttonsData = [
        { label: "localizacao", icon: "/menu/location.svg", href: "/natura/localizacao", rowStart: 5, submenu: "mapa2d" },
        { label: "imagens", icon: "/menu/images.svg", href: "/natura/imagens", rowStart: 7, submenu: "" },
        { label: "plantas", icon: "/menu/plants.svg", href: "/natura/plantas", rowStart: 9, submenu: "Implantação" },
        { label: "ficha-tecnica", icon: "/menu/tech.svg", href: "/natura/ficha-tecnica", rowStart: 11, submenu: "" },
        { label: "videos", icon: "/menu/videos.svg", href: "/natura/videos", rowStart: 13, submenu: "" },
    ];
    const SideButton = ({ label, icon, onClick, rowspan, isAnimating, index }: buttonProps) => (
        <button
            onClick={onClick}
            style={{
                gridRow: `${rowspan} / span 1`,
                animationDelay: isAnimating ? `${150 * index}ms` : "0ms"
            }}
            className={`col-span-1 p-2 hover:bg-[#F28B2D] flex duration-1000 items-center justify-center transition-colors ${pathname.includes(label) ? 'bg-[#F28B2D]' : 'bg-transparent hover:bg-[#F28B2D]'}`}
        >
            <Image
                src={icon}
                alt={label}
                width={is4k ? 80 : 40}
                height={is4k ? 80 : 40}
                className="object-contain"
            />
        </button>
    )

    const handleSideButtonClick = (href: string, label: string, submenu?: string) => {
        setSubmenuAndSelected?.(label, submenu || "");
        router.push(href);
    };

    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        if (!scrollRef.current) return;
        const value = Array.isArray(newValue) ? newValue[0] : newValue;

        const { scrollHeight, clientHeight } = scrollRef.current;
        const maxScroll = scrollHeight - clientHeight;

        // invert for scrollTop
        scrollRef.current.scrollTop = ((100 - value) / 100) * maxScroll;
        setScrollValue(value);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const maxScroll = scrollHeight - clientHeight;
        const percentage = (scrollTop / maxScroll) * 100;
        setScrollValue(100 - percentage);
    }

    return (
        <>
            <div className="col-span-1 row-span-24 bg-[#3F4444] grid grid-cols-1 grid-rows-24">
                <Image
                    src="/menu/menu.png"
                    alt="logo"
                    width={800}
                    height={450}
                    className="object-cover p-2 cursor-pointer hover:scale-105 transition-all duration-500"
                    onClick={() => {
                        router.push("/natura")
                    }}
                />
                {buttonsData.map((button, index) => (
                    <SideButton
                        key={button.label}
                        label={button.label}
                        icon={button.icon}
                        classname={isAnimating ? `animate-fade-up duration-1000` : ""}
                        isAnimating={isAnimating}
                        index={index}
                        rowspan={button.rowStart}
                        onClick={() => handleSideButtonClick(button.href, button.label, button.submenu)}
                    />
                ))}

                <Image
                    src="/menu/b-voltar.png"
                    alt="logo"
                    width={is4k ? 80 : 40}
                    height={is4k ? 80 : 40}
                    className="row-start-24  cursor-pointer"
                    onClick={() => {
                        router.push("/natura")
                    }}
                />
            </div>
            <div
                className="row-span-24 col-span-5 grid grid-rows-24  grid-cols-5 bg-[#F28B2D]"
            >
                <Image
                    src="/menu/logoside.png"
                    alt="logo"
                    width={480}
                    height={360}
                    className="object-cover col-span-3 row-span-4 row-start-2 col-start-2 animate-fade-down duration-1000"
                />

                <span className="col-span-5 text-center row-span-1 text-white uppercase text-4xl fourk:text-7xl row-start-7 animate-fade-left">
                    {routes[pathname.split("/").pop() as keyof typeof routes]}
                </span>
                {currentRoute === "Localização" && (
                    <>
                        <button
                            onClick={() => {
                                setSubmenuAndSelected?.("localizacao", "mapa2d");
                            }}
                            className={`row-span-1 col-span-3 ${submenu === "mapa2d" ? "bg-[#3F4444]" : "bg-[#F8B04C]"} flex animate-fade-right animate-delay-150 items-center justify-center row-start-9 col-start-2 hover:scale-105 transition-all duration-500`}>
                            <span className={`text-white text-2xl fourk:text-5xl`}>Mapa 2D</span>
                        </button>
                        <button
                            onClick={() => {
                                setSubmenuAndSelected?.("localizacao", "mapa-satelite");
                            }}
                            className={`row-span-1 col-span-3 ${submenu === "mapa-satelite" ? "bg-[#3F4444]" : "bg-[#F8B04C]"} flex items-center animate-fade-right animate-delay-500 justify-center row-start-11 col-start-2 hover:scale-105 transition-all duration-500`}>
                            <span className="text-white text-2xl fourk:text-5xl">Mapa Satélite</span>
                        </button>
                    </>
                )}
                {currentRoute === "Imagens" && (
                    <div className="col-span-4 row-span-14 col-start-2 row-start-9 grid grid-cols-4 grid-rows-14 animate-fade-right">
                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="col-span-3 row-span-14 flex flex-col overflow-y-scroll no-scrollbar gap-2">
                            {imagesObj.map((image, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSubmenuAndSelected?.("imagens", index.toString());
                                        }}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={400}
                                            height={400}
                                        />
                                    </button>
                                )
                            })}

                        </div>
                        <div className="row-span-14 col-span-1 flex items-center justify-center">
                            <Slider
                                value={scrollValue}
                                min={0}
                                max={100}
                                orientation="vertical"
                                step={1}
                                valueLabelDisplay="off"
                                sx={{
                                    color: "#3F4444",
                                    borderRadius: 0,
                                    "& .MuiSlider-thumb": {
                                        height: 30,
                                        width: 30,
                                        color: "#FFFFFF",
                                        transition: "all",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    },
                                    "& .MuiSlider-track": {
                                        border: "none",
                                        width: 6
                                    },
                                    "& .MuiSlider-rail": {
                                        opacity: 1,
                                        width: 6,
                                        backgroundColor: "#3F4444",
                                    },
                                }}
                                className="animate-fade-right animate-delay-400"
                                onChange={handleSliderChange}
                            />
                        </div>
                    </div>
                )}
                {currentRoute === "Plantas" && (
                    <div className="col-span-4 row-span-14 col-start-2 row-start-9 grid grid-cols-4 grid-rows-14 ">
                        {submenuPlantas.map((item, index) => (
                            <button
                                key={index}
                                style={{
                                    gridRow: `${item.rowstart} / span 1`,
                                    animationDelay: isAnimating ? `${150 * index}ms` : "0ms"
                                }}
                                onClick={() => setSubmenuAndSelected?.("plantas", item.title)}
                                className={`w-full text-center col-span-3 row-span-1 fourk:text-5xl text-white text-xl animate-fade-right transition-colors duration-300 ${submenu === item.title ? 'bg-[#3F4444]' : 'bg-[#F8B04C] hover:bg-[#3F4444]'}`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                )}
                {currentRoute === "Ficha Técnica" && (
                    <div className="col-span-4 row-span-14 col-start-2 row-start-9 grid grid-cols-4 animate-fade-right">
                        <span className="col-span-3 text-md fourk:text-3xl text-white text-justify">
                            Prepare-se para viver em um empreendimento pensado para seu bem-estar, com a qualidade e o cuidado que só a VIC tem.
                        </span>
                    </div>
                )}
                <Image
                    src="/menu/logo-vic.png"
                    alt="logo"
                    width={400}
                    height={350}
                    className="col-span-3 row-span-2 row-start-23 col-start-2"
                />
            </div>
        </>
    )
}

export default Sidebar