import { useNavigate } from "react-router-dom"
import Curve from "./Curve";
import { RideCard } from "./RideCard";
import { rideList } from "../constants/rideList";
import { useEffect, useState } from "react";
import { RideState } from "../Context_API/provider";
import Payment from "../pages/Payment";
import Config from "../config.json";
import { errorPopup, successPopup } from "./popup";
import axios from "axios";

export const RideContainer = ({rideDuration, setRideDuration}) => {
    const {user, setDuration, setDistance, pickup, dropoff, pickupCoordinates, dropoffCoordinates, setGeojson, setRoute, route, distance, duration} = RideState();
    const navigate = useNavigate();
    
    const [payment_id, setPayment_id] = useState("")
    const [isActive, setActive] = useState(-1)

    useEffect(() => {
       fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?geometries=geojson&access_token=${Config.MAPBOX_ACCESS_TOKEN}`
        ).then(res => res.json())
       .then(data => {
           if(data.routes){
                // for duration, ditance and price
                if(data.routes[0]) {
                    setDuration(Math.round(data.routes[0].duration / 60))
                    setDistance(Math.round(data.routes[0].distance / 1000))
                    setRideDuration((data.routes[0].duration/60)*data.routes[0].distance/1000)
                    // For direction
                    setRoute(data.routes[0].geometry.coordinates);
                }
           }
       })
       
    }, [pickupCoordinates, dropoffCoordinates])
    
    /* Saving the ride details in the backend if payment has been made successfully */

    const saveRideDetails = ()=> {
        // Navigate only if a ride is selected and payment is successfull
        if(payment_id && isActive!==-1) {
            try {
           console.log("in save details")
        //    const {data} = axios.post('http://localhost:5000/api/user/saveRideDetails', 
           const {data} = axios.post('https://femme-cab-api.vercel.app/api/user/saveRideDetails', 
           {
                userId: user._id,
                pickupAddress: pickup,
                dropoffAddress: dropoff,
                distance: distance,
                duration: duration,
                paymentId: payment_id
                }) 
            if(data) {
                successPopup('Ride details saved successfully!')
            }
            } catch (error) {     
                errorPopup(`Something went wrong in saving RideDetails`);
            }
            navigate('/rideInProgress')
        } else if(!payment_id){
            errorPopup("Please make the payment first!")
            return;
        } else if(isActive===-1) {
            errorPopup('Select your Ride first!')
            return;
        } else {
            errorPopup('Some error occurred. Please try again later')
            return;
        }
    }
    
    return (
        <div className="flex flex-1 flex-col justify-center items-center p-1">
            
            <div className="location-box rounded-t-[2rem] flex flex-col justify-center items-start w-[100%]">
                <h1 className="m-auto font-bold mb-3 text-2xl">Choose a ride</h1>
                
                {/* Select a ride section */}
                <div className="flex justify-evenly w-full">
                    {
                        rideList.map((ride, index) => (
                            <RideCard 
                                key={index}
                                id={index} 
                                carName={ride.name} 
                                price={(rideDuration*ride.multiplier).toFixed(0)}
                                imgSrc={ride.imgUrl} 
                                isActive={isActive}
                                setActive={setActive}
                            />

                        ))
                    }
                </div>
                
                {/* Payment section */}
                <Payment payment_id={payment_id} setPayment_id={setPayment_id}/>
            </div>
            
            <Curve />

            {/* Book now button */}
            <div 
              className="cursor-pointer -mt-12 hover:w-[61%] hover:text-lg py-[20px] flex items-center justify-center font-bold rounded-[50%] w-[60%] bg-gradient-to-r from-[#CED2E9] to-[#B0B9E5] text-black"
              onClick={saveRideDetails}
            >
              Book Now
            </div>
        </div>
  )
}