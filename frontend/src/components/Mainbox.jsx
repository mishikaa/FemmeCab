import React from 'react'

export const Mainbox = () => {
  return (
    <>
    <div 
      className='flex flex-wrap justify-around items-center my-8 gap-6 padding-3
      
    '>
        <h1 className='uppercase font-bold text-5xl'>"for women, by women"</h1>
        <img 
          className='w-[30rem] h-auto rounded-[4rem] rounded-bl-[0] p-0.5
          shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]' 
          aria-label='the width of the image is 450px for small device and 2/6(33.33%) for 640px and above' src="/assets/homeImg.jpg" alt="homepage-img" />
    </div>
    </>

  )
}
