import { RideContainer } from "../components/RideContainer"
import Map from "../components/Map"
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RideState } from "../Context_API/provider";
import Config from "../config.json";
import MapOverlays from "../components/MapOverlays";

export const Confirm = () => {
    const [rideDuration, setRideDuration] = useState(0);

    const {setPickupCoordinates, setDropoffCoordinates, duration, distance} = RideState();
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
        if(data.features[0])
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
        if(data.features[0])
            setDropoffCoordinates(data.features[0].center) //gives the coordination of dropoff address
    }

    useEffect(() => {
      getPickupCoordinates(pickup)
      getDropoffCoordinates(dropoff)
    //   window.location.reload();

    }, [pickup, dropoff])
    
    return (        
        <div className="h-[110vh] flex flex-col text-black">
            <MapOverlays prevPage='addLocation'/>
            <Map />
            <RideContainer rideDuration={rideDuration} setRideDuration={setRideDuration}/>
        </div>
  )
}

