import Config from "../config.json";
import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';
import getPlace from "../MapUtils/getPlace";
import addCarIcons from "../MapUtils/addIcons";
import './Map.css';

mapboxgl.accessToken = Config.MAPBOX_ACCESS_TOKEN;

const DashboardMap = () => {
    const [currentLocation, setCurrentLocation] = useState();
    const [currentLocationCoordinates, setCurrentLocationCoordinates] = useState();
    
    useEffect(() => {
        // Initialise the map from mapbox
        const map = new mapboxgl.Map({
          container: "map_1",
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [78.182831, 26.218287],
          zoom: 9
        });
    
        // Initialising geolocateControl for current location detection
        const geolocate = 
          new mapboxgl.GeolocateControl({
          positionOptions: {
          enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
        })
        
        // Add geolocate control to the map.
        map.addControl(geolocate);
        
        geolocate.on('geolocate', function(e) {
            var lon = e.coords.longitude;
            var lat = e.coords.latitude
            var position = [lon, lat];
            setCurrentLocationCoordinates(position)
            // Fetching the location address from the coordinates
        })
        
        
        if(currentLocationCoordinates) {
            getPlace(currentLocationCoordinates, setCurrentLocation);
            addToMap(map, currentLocationCoordinates, "#f4a261", currentLocation, "Current location: ");
            console.log(currentLocation)
    }
    
    addPoints(map)    
    }, [currentLocationCoordinates])
  
    // Function to add markers in the map
    const addToMap = (map, coordinates, color, address, tag) => {
      // create the popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      `${tag} ${address}`
      );
      

      const marker = new mapboxgl.Marker({color})
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map)
    } 

    const addPoints = (map) => {
        // Adding car icons
        map.loadImage(
            '/assets/car.png',
            // 'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
            (error, image) => {
            if (error) throw error;
             
            // Add the images to the map style.
            map.addImage('cat', image);
            
            // Add a data source containing one point feature.
              map.addSource('point', {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': addCarIcons
                }
              })
            // Add a layer to use the image to represent the data.
            map.addLayer({
            'id': 'Points',
            'type': 'symbol',
            'source': 'point', // reference the data source
            'layout': {
            'icon-image': 'cat', // reference the image
            'icon-size': 0.05,
            "icon-rotate": -90
            }
            });
        });
    }
    return (
    <div className="flex-1" id='map_1'>
    </div>
  )
}

export default DashboardMap;