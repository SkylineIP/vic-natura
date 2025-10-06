'use client'
import { useContextDefault } from '@/context/Context'
import React, { useEffect, useState } from 'react'
import { submenuPlantas } from './submenuPlantas';
import Image from 'next/image';

// Apto. Térreo
// Apto. Tipo

const page = () => {
    const context = useContextDefault();
    const submenu = context?.submenu;
    const setSubmenuAndSelected = context?.setSubmenuAndSelected;
    const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

    useEffect(() => {
        if (!submenu) {
            setSubmenuAndSelected?.("plantas", "Implantação");
        }
        // Reset selected plant when main category changes
        setSelectedPlant(null);
    }, [submenu, setSubmenuAndSelected])

    const selectedCategory = submenuPlantas.find(item => item.title === submenu);
    return (
        <>
            {submenu === "Implantação" && (
                <Image
                    src="/plantas/implantacao.jpg"
                    alt="logo"
                    width={2880}
                    height={2160}
                    className='col-span-18 row-span-24 animate-fade-left'
                />
            )}
            {selectedCategory && selectedCategory.buttons && (
                <>
                selectedCategory.buttons.map((button) => (
                    <button
                        key={button.id}
                        onClick={() => setSelectedPlant(button.text)}
                        style={{
                            gridRow: `${button.rowSpan} / span 1`,
                        }}
                        className={`text-lg transition-colors text-center col-span-3 row-span-1 col-start-8 ${selectedPlant === button.text ? 'bg-[#3F4444] text-white' : 'bg-[#F8B04C] text-white hover:bg-[#3F4444]'}`}>
                        {button.text}
                    </button>
                    ))
                </>
            )}
        </>
    )
}

export default page