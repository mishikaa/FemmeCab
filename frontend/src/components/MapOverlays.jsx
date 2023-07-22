import React from 'react'
import { RideState } from '../Context_API/provider'
import { useNavigate } from "react-router-dom";

const MapOverlays = ({prevPage}) => {
    const {distance, duration} = RideState();
    const navigate = useNavigate();

    return (
    <>
      {/* Back button */}
            <img 
              className="cursor-pointer rounded-full bg-white p-1 w-8 hover:w-9 absolute top-4 left-4 z-10 shadow-md" 
              src="/assets/arrows/blackBack.png" 
              alt="back"
              onClick={()=>navigate(`/${prevPage}`)}
            />
            <span className="flex items-center absolute top-14 right-4 z-10 px-2 rounded-lg py-1 bg-white shadow-md">
                <img className="w-6 mr-1" src="/assets/location.png" alt="" />
                Distance: <b>{distance} km</b>
            </span>
            <span className="flex items-center z-10 px-2 rounded-lg py-1 bg-white absolute top-24 right-4 shadow-md">
                <img className="w-5 mr-1" src="/assets/clock.png" alt="" />        
                Duration: <b>{duration} min</b>
            </span>
    </>
  )
}

export default MapOverlays
