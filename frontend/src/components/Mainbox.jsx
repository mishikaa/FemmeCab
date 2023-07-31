import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RideState } from '../Context_API/provider';
import { errorPopup } from './popup';

const styles = {
clipPath: "polygon(23.5% 0, 100% 0, 100% 100%, 0 100%, 0 39.5%, 23.5% 39.5%)"
}

export const Mainbox = () => {
  const navigate = useNavigate();
  const {user} = RideState();
  return (
    <>
    <div 
      className='flex flex-wrap justify-around items-center my-5 sm:gap-6 md:gap-20 p-3'
    >
        <h1 className='uppercase font-bold text-5xl'>"for women, by women"</h1>
        <img 
          className='w-[26rem] h-auto rounded-[4rem] rounded-bl-[0] p-0.5
          shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]' 
          aria-label='the width of the image is 450px for small device and 2/6(33.33%) for 640px and above' 
          src="/assets/homeImg.jpg" alt="homepage-img" 
        />
    </div>

    <div className='flex justify-between items-center mb-3 gap-16'>
      <div className='flex relative justify-center '>
        <button 
          onClick={()=>{user ? navigate('/dashboard') : errorPopup("You need to login first!")}}
          className='md:w-[6.5rem] lg:[7.25rem] xl:w-[9.1rem] w-[5.65rem] z-10 h-[8rem] absolute left-0 font-bold text-lg p-4 rounded-xl bg-gradient-to-t from-[#2c3e50] to-[#bdc3c7] tracking-wider
          hover:bg-gradient-to-b from-[#2c3e50] to-[#bdc3c7] hover:scale-105 transition'
        >
          Book Now
        </button>
        <img 
          className='w-[25rem] md:w-[40rem] h-[21rem] rounded-xl object-center'
          style={styles}
          src="/assets/map.jpg" alt="map" 
        />
      </div>
      <span className='hidden md:inline ml-6 pr-36 text-left text-[3rem]'><span>Request</span><h3 className='font-bold'>A Ride Now!</h3></span>
    </div>
    </>

  )
}
