import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlzaGlrYSIsImEiOiJjbGNxazRrbHkwNm5vM3ZwaGM5NW9qOWV1In0.b3f4yO2rsQzq6i-HS8zqEA';

const Map = ({pickupCoordinates, dropoffCoordinates}) => {
    
    useEffect(() => {
    
    // Initialise the map from mapbox
    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.182831, 26.218287],
      zoom: 9
    });
    
    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
    );

    // Adding markers to map if coordinates are available
    if(pickupCoordinates) {
        addToMap(map, pickupCoordinates, "#0BDBFB");
      }
    if(dropoffCoordinates) {
        addToMap(map, dropoffCoordinates, "#16FE20");
      }
    
    // If both the coordinates are present, then auto zoom where the markers are 
    if(pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([
        pickupCoordinates,
        dropoffCoordinates
      ], {
        padding: 60
      })
    }
    }, [pickupCoordinates, dropoffCoordinates]); //run it again if there is any change in these
    
    // Function to add markers in the map
    const addToMap = (map, coordinates, color, address) => {
      // create the popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      `Popup: ${address}`
      );

      const marker = new mapboxgl.Marker({color})
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map)
    }
    
    return (
    <div className="flex-1" id='map'></div>
  )
}

export default Map;