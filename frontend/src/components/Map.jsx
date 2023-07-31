import Config from "../config.json";
import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';
import { RideState } from '../Context_API/provider';
import './Map.css';
import addCarIcons from "../MapUtils/addIcons";
import { useNavigate } from "react-router-dom";

mapboxgl.accessToken = Config.MAPBOX_ACCESS_TOKEN;

const Map = () => {
    const {route, pickupCoordinates, setPickupCoordinates, setPickup, setDistance, setDuration, dropoffCoordinates, pickup, dropoff, distance, duration, geojson} = RideState()
    const navigate = useNavigate();
    const [liveLocation, setLiveLocation] = useState(pickupCoordinates);
    var map;
    useEffect(() => {
    
    // Initialise the map from mapbox
    map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.182831, 26.218287],
      zoom: 9
    });
    
    // If both the coordinates are present, then auto zoom where the markers are 
    if(pickupCoordinates && dropoffCoordinates) {
      // Adding markers to map if coordinates are available
      addToMap(map, pickupCoordinates, "#0BDBFB", pickup, "Pickup: ");
      addToMap(map, dropoffCoordinates, "#16FE20", dropoff, "Dropoff: ");      
      
      map.fitBounds([
        pickupCoordinates,
        dropoffCoordinates
      ], {
        padding: 60
      })
      
      addPoints(map)
      
      map.on('load', async() => {
        // Adding route
        var rt = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: route,
                },
              },
            ],
        };

        map.addSource("route", {
          type: "geojson",
          lineMetrics: true,
          data: rt,
        });

        map.addLayer({
             id: "route",
             source: "route",
             type: "line",
             paint: {
               "line-width": 2.8,
               "line-color": "green",
               'line-gradient': [
                  'interpolate',
                  ['linear'],
                  ['line-progress'],
                  0,
                  '#12FFF7',
                  0.1,
                  '#65C7F7',
                  0.5,
                  '#00b09b',
                  0.7,
                  '#0f9b0f',
                  1,
                  '#66ff00'
                  ]
             },
        });
      
      if(window.location.pathname == '/rideInProgress') {
      
        // Realtime location tracking
      const geojson = await getLocation();
      // Add a data source containing one point feature.
      map.addSource('iss', {
        type: 'geojson',
        data: geojson
        });

      map.loadImage(
            '/assets/realTimeCar.png',
            (error, image) => {
            if (error) throw error;
             
            // Add the images to the map style.
            map.addImage('liveCar', image);          
        })

      // Add the rocket symbol layer to the map.
      map.addLayer({
      'id': 'iss',
      'type': 'symbol',
      'source': 'iss',
      'layout': {
            'icon-image': 'liveCar', // reference the image
            'icon-size': 0.13,
      }
      });
      
      // Update the source from the API every 2 seconds.
      // const updateSource = setInterval(async () => {
      // const geojson = await getLocation(updateSource);
      // map.getSource('iss').setData(geojson);
      // }, 2000);
    }
      async function getLocation(updateSource) {
          // Make a GET request to the API and return the location of the ISS.
          try {
              if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function(position) {
                  setLiveLocation([position.coords.longitude, position.coords.latitude])
                  // console.log("Latitude is :", position.coords.longitude);
                  // console.log("Longitude is :", position.coords.latitude);
                });
              }
              // Fly the map to the location.
              map.flyTo({
                  center: [liveLocation[0], liveLocation[1]],
                  speed: 0.5
              });
              
              // Return the location of the ISS as GeoJSON.
              return {
              'type': 'FeatureCollection',
              'features': [
                  {
                  'type': 'Feature',
                  'geometry': {
                  'type': 'Point',
                  'coordinates': [liveLocation[0], liveLocation[1]]
                  }
                  }
              ]
            };
          } catch (err) {
              // If the updateSource interval is defined, clear the interval to stop updating the source.
              if (updateSource) clearInterval(updateSource);
              throw new Error(err);
          }
      }
      })
  }}, [pickupCoordinates, dropoffCoordinates]); //run it again if there is any change in these
  

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
    <div className="flex-1" id='map'>
    </div>
  )
}

export default Map;