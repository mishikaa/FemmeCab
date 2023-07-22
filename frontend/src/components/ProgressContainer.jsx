import React from 'react'
import Profile from './Profile'

const rideDetails = {
    name: "Renault Kwid",
    color: "black",
    vehicleNumber: "MP07CF6508",
    driver: "Mahi",
    image: "https://www.transparentpng.com/thumb/car-png/car-free-transparent-png-8.png"
}
const ProgressContainer = () => {
  return (
        <div className="location-box rounded-t-[2rem] -mt-8 z-10 rounded-b-none flex-0.8 flex flex-col justify-center gap-2 w-[100%]">
            {/* Ride Information section */}
            <div className='flex justify-between w-full'>
                <div className='flex flex-col items-start justify-center'>
                    <h1 className="font-bold mb-3 text-2xl">Ride in progress</h1>
                    <span>{rideDetails.name}, {rideDetails.color}</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <img src={rideDetails.image} className='w-28' alt="image" />
                    <span>{rideDetails.vehicleNumber}</span>
                </div>
            </div>
            
            {/* Tabs section */}
            <div className='flex flex-col bg-white rounded-2xl pt-5 gap-3 justify-center'>
                <div className='flex justify-around'>
                    <div className='flex flex-col justify-around'>
                        <Profile />
                        <span>{rideDetails.driver}</span>
                    </div>
                    <a 
                        href='tel:8004912825'
                        className='flex flex-col items-center justify-between'>
                        <img src="/assets/call.png" className='w-10 pt-2 hover:animate-bounce' alt="call-icon" />
                        <span>Call</span>
                    </a>
                    <button 
                        className='flex flex-col items-center justify-between'>
                        <img src="/assets/camera.png" className='w-11 pt-2 hover:animate-pulse' alt="call-icon" />
                        <span>Emergency</span>
                        
                    </button>
                </div>
                <hr className="w-48 h-1 mx-auto my-1 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
            </div>
        </div>
        
        
  )
}

export default ProgressContainer
