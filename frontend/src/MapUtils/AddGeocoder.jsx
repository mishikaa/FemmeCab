import React, { useEffect } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './AddGeocoder.css'
import Config from "../config.json";

const AddGeocoder = ({id, pickup, dropoff, setPickup, setDropoff}) => {
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
    placeholder: `Enter ${id} address`,
    accessToken: Config.MAPBOX_ACCESS_TOKEN,
    value: id === 'pickup' ? pickup : dropoff,
    countries: 'IN',
    types: 'country,poi,address,region,place,postcode,locality,neighborhood'
    });
    
    // This gets fired each time a query is searched for
    geocoder.on('results', (e) => {
      if(id=='pickup') {
        setPickup(e.query)
      } else {
        setDropoff(e.query)
      }
    })

    // This gets fired when a suitable result is found
    geocoder.on('result', (e) => {
      
      if(id=='pickup') {
        setPickup(e.result.place_name)
      } else {
        setDropoff(e.result.place_name)
      }
    });
    
    geocoder.addTo(`#${id}`)
  }, [])
    
  
    return (
    <div id={id} className='w-[100%]'></div>
  )
}

export default AddGeocoder
