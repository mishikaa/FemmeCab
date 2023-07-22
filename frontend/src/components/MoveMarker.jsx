import React, { useEffect } from 'react'
import { RideState } from '../Context_API/provider'

const MoveMarker = () => {
    const {route, pickupCoordinates, dropoffCoordinates} = RideState();
    var point = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": pickupCoordinates
        }
    }]
    }
    return (
    <div>
      <button id="replay">Replay</button>
    </div>
  )
}

export default MoveMarker;
