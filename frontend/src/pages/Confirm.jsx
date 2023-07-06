import { RideContainer } from "../components/RideContainer"
import Map from "../components/Map"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Confirm = () => {
    const [pickupCoordinates, setPickupCoordinates] = useState();
    const [dropoffCoordinates, setDropoffCoordinates] = useState();
    
    // Getting the pickup and dropoff locations from the url
    const [searchParams] = useSearchParams();
    const pickup = searchParams.get("pickup")
    const dropoff = searchParams.get("dropoff")
    
    // Function to get the pickup coordinates from the address using mapbox geocoding services
    const getPickupCoordinates = async(pickup) => {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?`+
        new URLSearchParams({
            access_token: "pk.eyJ1IjoibWlzaGlrYSIsImEiOiJjbGNxazRrbHkwNm5vM3ZwaGM5NW9qOWV1In0.b3f4yO2rsQzq6i-HS8zqEA",
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
            access_token: "pk.eyJ1IjoibWlzaGlrYSIsImEiOiJjbGNxazRrbHkwNm5vM3ZwaGM5NW9qOWV1In0.b3f4yO2rsQzq6i-HS8zqEA",
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
            <Map pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} />
            <RideContainer />
        </div>
  )
}

