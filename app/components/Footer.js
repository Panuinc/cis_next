import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-row items-center justify-center w-full h-full p-2 gap-2 bg-[#FFFFFF] border-2 border-[#000000] border-dashed text-[#000000] text-md font-[300]'>
       {new Date().getFullYear()} © CIS - CHANNAKORN
    </div>
  )
}
