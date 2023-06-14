import React from 'react'
import Login from './Authentication modals/Login'

const styles = {
clipPath: "polygon(23.5% 0, 100% 0, 100% 100%, 0 100%, 0 39.5%, 23.5% 39.5%)"
}

export const Mainbox = () => {
  return (
    <>
    <div 
      className='flex flex-wrap justify-around items-center my-5 gap-6 p-3'
    >
        <h1 className='uppercase font-bold text-5xl'>"for women, by women"</h1>
        <img 
          className='w-[26rem] h-auto rounded-[4rem] rounded-bl-[0] p-0.5
          shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]' 
          aria-label='the width of the image is 450px for small device and 2/6(33.33%) for 640px and above' 
          src="/assets/homeImg.jpg" alt="homepage-img" 
        />
    </div>

    <div className='flex flex-wrap justify-evenly items-center mb-3'>
      <div className='flex justify-center'>
        <button 
          className='w-[8.75rem] h-[8rem] font-bold text-lg p-4 rounded-xl bg-gradient-to-t from-[#2c3e50] to-[#bdc3c7] tracking-wider
          hover:bg-gradient-to-b from-[#2c3e50] to-[#bdc3c7] hover:scale-105'
        >
          Book Now
        </button>
        <img 
          className='w-[40rem] h-[21rem] relative right-36 rounded-xl object-cover'
          style={styles}
          src="/assets/map.jpg" alt="map" 
        />
        </div>
      <span className='sm:hidden md:inline text-left text-[3rem]'>Request <h3 className='font-bold'>A Ride Now!</h3></span>
    </div>
    </>

  )
}
