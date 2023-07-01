import { useNavigate } from 'react-router-dom'
import './AddLocation.css';

const AddLocation = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center h-[100vh] mx-6 py-4">
      <div className="header flex w-[100%] items-center">
        {/* Back button */}
        <img 
          className="cursor-pointer w-6 hover:w-7" 
          src="/assets/back.png" 
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
            placeholder="Your Pickup Location" 
            id="pickup" 
          />
          <input 
            className="mb-8"
            type="text" 
            name="destination"
            placeholder="Your Destination" 
            id="destination" 
          />
        </div>
        
        {/* Add button */}
        <div className="cursor-pointer self-center ml-2 -mt-6 bg-[#f2f3ffe3] rounded-3xl shadow-[0_3px_8px_rgb(0,0,0,0.24)]">
          <img className="w-10 p-0.25 hover:w-11" src="assets/plus1.png" alt="add" />
        </div>
      </div>
      
      {/* Curve */}
      <svg className="location-shadow -mt-8" 
      width="100%" height="100" viewBox="0 0 500 100" preserveAspectRatio="none">
        <linearGradient id="grad1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#CED2E9" />
          <stop offset="100%" stop-color="#B0B9E5" />
        </linearGradient>
        
        <path d="M0,0 L0,70 Q250,10 500,70 L500,0 Z" fill="url(#grad1)" 
      />
      </svg>
      
      <div className="cursor-pointer hover:w-[92%] py-[22px] -mt-[2.5rem] flex items-center justify-center font-bold rounded-[50%] w-[90%] bg-gradient-to-r from-[#CED2E9] to-[#B0B9E5] text-black mt-2">
          Confirm Locations
      </div>
      
    </div>
  )
}

export default AddLocation;