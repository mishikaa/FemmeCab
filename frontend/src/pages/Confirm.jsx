import { RideContainer } from "../components/RideContainer"
import Map from "../components/Map"
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RideState } from "../Context_API/provider";
import Config from "../config.json";

export const Confirm = () => {
    const navigate = useNavigate();
    const [rideDuration, setRideDuration] = useState(0);

    const {pickupCoordinates, setPickupCoordinates, dropoffCoordinates, setDropoffCoordinates, duration, distance} = RideState();
    // Getting the pickup and dropoff locations from the url
    const [searchParams] = useSearchParams();
    const pickup = searchParams.get("pickup")
    const dropoff = searchParams.get("dropoff")
    
    // Function to get the pickup coordinates from the address using mapbox geocoding services
    const getPickupCoordinates = async(pickup) => {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?`+
        new URLSearchParams({
            access_token: Config.MAPBOX_ACCESS_TOKEN,
            limit: 1
        })
        )
        const data = await response.json()
        // console.log(data.features[0].center) 
        
        setPickupCoordinates(data.features[0].center) //gives the coordination of pickup address
    }

    // Function to get the dropoff coordinates from the address using mapbox geocoding services
    const getDropoffCoordinates = async(dropoff) => {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?`+
        new URLSearchParams({
            access_token: Config.MAPBOX_ACCESS_TOKEN,
            limit: 1
        })
        )
        const data = await response.json()
        // console.log(data.features[0].center)
        
        setDropoffCoordinates(data.features[0].center) //gives the coordination of dropoff address
    }

    useEffect(() => {
      getPickupCoordinates(pickup)
      getDropoffCoordinates(dropoff)
    }, [pickup, dropoff])
    
    return (        
        <div className="h-[110vh] flex flex-col text-black">
            {/* Back button */}
            <img 
              className="cursor-pointer rounded-full bg-white p-1 w-8 hover:w-9 absolute top-4 left-4 z-10 shadow-md" 
              src="/assets/arrows/blackBack.png" 
              alt="back"
              onClick={()=>navigate('/addLocation')}
            />
            <span className="flex items-center absolute top-14 right-4 z-10 px-2 rounded-lg py-1 bg-white shadow-md">
                <img className="w-6 mr-1" src="/assets/location.png" alt="" />
                Distance: <b>{distance} km</b>
            </span>
            <span className="flex items-center z-10 px-2 rounded-lg py-1 bg-white absolute top-24 right-4 shadow-md">
                <img className="w-5 mr-1" src="/assets/clock.png" alt="" />        
                Duration: <b>{duration} min</b>
            </span>
            <Map pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} />
            <RideContainer pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} rideDuration={rideDuration} setRideDuration={setRideDuration}/>
        </div>
  )
}

