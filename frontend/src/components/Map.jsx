import Config from "../config.json";
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { RideState } from '../Context_API/provider';

mapboxgl.accessToken = Config.MAPBOX_ACCESS_TOKEN;

const Map = ({pickupCoordinates, dropoffCoordinates}) => {
    const {pickup, dropoff, geojson} = RideState()
    
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
        addToMap(map, pickupCoordinates, "#0BDBFB", pickup);
      }
    if(dropoffCoordinates) {
        addToMap(map, dropoffCoordinates, "#16FE20", dropoff);
      }
    
    // If both the coordinates are present, then auto zoom where the markers are 
    if(pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([
        pickupCoordinates,
        dropoffCoordinates
      ], {
        padding: 60
      })
      // Adding route
      map.on('load', () => {

      // if the route already exists on the map, we'll reset it using setData
      if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#011627',
            'line-width': 5,
            'line-opacity': 0.65
          }
        });  
      }})
    }
  }, [pickupCoordinates, dropoffCoordinates]); //run it again if there is any change in these
    
    // Function to add markers in the map
    const addToMap = (map, coordinates, color, address) => {
      // create the popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      `${address}`
      );

      const marker = new mapboxgl.Marker({color})
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map)
    }
    
    return (
    <div className="flex-1" id='map'>
    </div>
  )
}

export default Map;