"use client"
import React, { useState, useEffect } from 'react';
import { imagesObj } from './images'
import { useContextDefault } from '@/context/Context'
import Image from 'next/image'

const page = () => {
    const context = useContextDefault()
    const submenu = context?.submenu;
    const currentIndex = submenu ? parseInt(submenu, 10) : 0;

    const [displayIndex, setDisplayIndex] = useState(currentIndex);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        if (displayIndex !== currentIndex) {
            setIsFading(true);
            const timer = setTimeout(() => {
                setDisplayIndex(currentIndex);
                setIsFading(false);
            }, 1200); // This duration should match the transition duration

            return () => clearTimeout(timer);
        }
    }, [currentIndex, displayIndex]);

    const image = imagesObj[displayIndex] || imagesObj[0];

    return (
        <div className='col-span-18 relative row-span-24 flex items-center justify-center bg-white'>
            <div className={`transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <Image src={image.expSrc} alt={image.alt} width={2880} height={2160} className='object-contain' />
                <span className='absolute top-[45px] left-0 uppercase px-[87px] py-4 bg-[#3F4444] text-white text-2xl'>
                    {image.alt}
                </span>
            </div>
        </div>
    )
}

export default page