import { useEffect } from 'react';
import { RideState } from '../Context_API/provider'
import Config from "../config.json";

const AddRoute = ({setRideDuration}) => {
    const {pickupCoordinates, dropoffCoordinates, setDuration, setDistance, setRoute} = RideState();

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
         
          // console.log(route)
  
    }, [])
}

export default AddRoute
