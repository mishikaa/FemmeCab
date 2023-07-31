import { useNavigate } from "react-router-dom"
import Curve from "./Curve";
import { RideCard } from "./RideCard";
import { rideList } from "../constants/rideList";
import { useEffect, useState } from "react";
import { RideState } from "../Context_API/provider";
import Payment from "../pages/Payment";
import Config from "../config.json";
import { errorPopup } from "./popup";

export const RideContainer = ({rideDuration, setRideDuration}) => {
    const {setDuration, setDistance, pickupCoordinates, dropoffCoordinates, setGeojson, setRoute, route} = RideState();
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
              onClick={()=>{
                // Navigate only if a ride is selected and payment is successfull
                if(payment_id && isActive!==-1) {
                    navigate('/rideInProgress')
                } else if(!payment_id){
                    errorPopup("Please make the payment first!")
                } else if(isActive===-1) {
                    errorPopup('Select your Ride first!')
                } else {
                    errorPopup('Some error occurred. Please try again later')
                }
            }}
            >
              Book Now
            </div>
        </div>
  )
}

// {"routes":
//   [
//    {
//     "weight_name":"auto",
//     "weight":1952.479,
//     "duration":1480.248,
//     "distance":9107.271,
//     "legs":[
//         {
//             "via_waypoints":[],
//             "admins":[{"iso_3166_1_alpha3":"IND","iso_3166_1":"IN"}],
//             "weight":1952.479,"duration":1480.248,
//             "steps":[
//                 {
//                     "intersections":
//                     [
//                         {"bearings":[201],
//                         "entry":[true],
//                         "mapbox_streets_v8":{"class":"service"},
//                         "is_urban":true,"admin_index":0,
//                         "out":0,
//                         "geometry_index":0,
//                         "location":[78.169473,26.231308]}
//                     ],
//                     "maneuver":{
//                         "type":"depart",
//                         "instruction":"Drive south.",
//                         "bearing_after":201,
//                         "bearing_before":0,
//                         "location":[78.169473,26.231308]
//                     },
//                     "name":"",
//                     "duration":10.883,
//                     "distance":60.729,
//                     "driving_side":"left",
//                     "weight":13.331,
//                     "mode":"driving",
//                     "geometry":{
//                         "coordinates":
//                         [
//                             [78.169473,26.231308],
//                             [78.16943,26.231198],
//                             [78.169341,26.231057],
//                             [78.169221,26.230905],
//                             [78.169132,26.230897]],
//                             "type":"LineString"
//                     }
//                 }
//             ]
//         }
//     ]
// }
// ]
// }