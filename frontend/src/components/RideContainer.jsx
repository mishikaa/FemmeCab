import { useNavigate } from "react-router-dom"
import Curve from "./Curve";
import { RideCard } from "./RideCard";
import { rideList } from "../constants/rideList";
import { useEffect, useState } from "react";
import { RideState } from "../Context_API/provider";

export const RideContainer = () => {
    const {pickupCoordinates, dropoffCoordinates} = RideState();
    const navigate = useNavigate();
    const [rideDuration, setRideDuration] = useState(0);
    
    useEffect(() => {
       fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoibWlzaGlrYSIsImEiOiJjbGNxazRrbHkwNm5vM3ZwaGM5NW9qOWV1In0.b3f4yO2rsQzq6i-HS8zqEA`
        ).then(res => res.json())
       .then(data => {
           console.log(data.routes[0])
           setRideDuration((data.routes[0].duration/60)*data.routes[0].distance/1000)
       })
    //    console.log(data)

    }, [pickupCoordinates, dropoffCoordinates])
    
    return (
        <div className="flex flex-1 flex-col justify-center items-center p-1">
            
            <div className="location-box flex flex-col justify-center items-start w-[100%]">
                <h1 className="m-auto font-bold mb-3 text-2xl">Choose a ride</h1>
                
                {/* Select a ride section */}
                <div className="flex justify-evenly w-full">
                    {
                        rideList.map((ride, index) => (
                            <RideCard 
                                key={index} 
                                carName={ride.name} 
                                price={(rideDuration*ride.multiplier).toFixed(0)}
                                imgSrc={ride.imgUrl} 
                            />

                        ))
                    }
                </div>
                
                {/* Payment section */}
                <div 
                    onClick={()=>navigate('/payment')}
                    className="text-left flex justify-between items-center w-[97%] bg-[#E0E2F0] font-bold p-5 m-3 cursor-pointer shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.2)]"
                >
                    Payment
                    <img className="h-5 hover:h-6" src="/assets/arrows/forward.png" alt="forward" />
                </div>
            </div>
            
            <Curve />
            
            {/* Book now button */}
            <div 
              className="cursor-pointer -mt-12 hover:w-[61%] hover:text-lg py-[20px] flex items-center justify-center font-bold rounded-[50%] w-[60%] bg-gradient-to-r from-[#CED2E9] to-[#B0B9E5] text-black"
              onClick={()=>navigate('/book')}
            >
              Book Now
            </div>
        </div>
  )
}
