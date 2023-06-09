import { Link, useNavigate } from 'react-router-dom'
import './AddLocation.css';
import { useState } from 'react';
import Curve from '../components/Curve';

const AddLocation = () => {
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")

  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center h-[100vh] mx-6 py-4">
      <div className="header flex w-[100%] items-center">
        {/* Back button */}
        <img 
          className="cursor-pointer rounded-full bg-black object-contain w-8 p-1 shadow-md hover:w-9 absolute top-4 left-4 z-10" 
          src="/assets/arrows/back.png" 
          alt="back"
          onClick={()=>navigate('/map')}
        />
        <h1 className="m-auto font-bold text-[1.5rem]">Enter Your Destination</h1>
      </div>
      
      {/* From - to icons */}
      <div className="location-box flex justify-center items-start gap-1.5 w-[100%] mt-5">
        <div className="fromToIcons flex flex-col items-center py-3 px-2">
          <img className="w-3.5" src="assets/circle1.png" alt="fromIcon" />
          <img className="w-8 h-14" src="assets/line.png" alt="line" />
          <img className="w-3.5" src="assets/circle2.png" alt="toIcon" />
        </div>
        
        {/* Location inputs */}
        <div className="location-inputs flex flex-col justify-center items-center gap-3 w-[90%]">
          <input 
            type="text" 
            name="pickup"
            onChange={(event)=>setPickup(event.target.value)}
            value={pickup}
            placeholder="Your Pickup Location" 
            id="pickup" 
          />
          <input 
            className="mb-8"
            type="text" 
            name="destination"
            onChange={(event)=>setDropoff(event.target.value)}
            value={dropoff}
            placeholder="Your Dropoff location" 
            id="destination" 
          />
        </div>
        
        {/* Add button */}
        <div className="cursor-pointer self-center ml-2 -mt-6 bg-[#f2f3ffe3] rounded-3xl shadow-[0_3px_8px_rgb(0,0,0,0.24)]">
          <img className="w-10 p-0.25 hover:w-11" src="assets/plus1.png" alt="add" />
        </div>
      </div>
      
      {/* Curve */}
      <Curve />
      
      <div 
        className="cursor-pointer -mt-10 hover:w-[61%] hover:text-lg py-[22px] font-bold rounded-[50%] w-[60%] bg-gradient-to-r from-[#CED2E9] to-[#B0B9E5] text-black"
      >
        <Link to={{
          pathname: "/confirm", 
          search: "?" + 
            new URLSearchParams({
              pickup: pickup,
              dropoff: dropoff
          })
        }}>
          Confirm Locations
        </Link>
      </div>
      
    </div>
  )
}

export default AddLocation;