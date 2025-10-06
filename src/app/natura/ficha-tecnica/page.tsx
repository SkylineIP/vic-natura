import Image from 'next/image'
import React from 'react'

const page = () => {
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

export default page