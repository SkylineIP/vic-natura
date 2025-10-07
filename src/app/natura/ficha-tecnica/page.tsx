'use client'
import { useContextDefault } from '@/context/Context'
import Image from 'next/image'
import React, { useEffect } from 'react'

const FichaPage = () => {
  const context = useContextDefault()
  const setSubmenuAndSelected = context?.setSubmenuAndSelected
  useEffect(() => {
    setSubmenuAndSelected?.("ficha-tecnica", "")
  }, [])
  return (
    <>
      <Image
        src='/ficha/all.png'
        alt='Ficha técnica'
        width={2877}
        height={2160}
        className='animate-fade-left row-span-24 col-span-18'
      />

    </>
  )
}

export default FichaPage