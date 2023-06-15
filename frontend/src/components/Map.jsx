import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlzaGlrYSIsImEiOiJjbGNxazRrbHkwNm5vM3ZwaGM5NW9qOWV1In0.b3f4yO2rsQzq6i-HS8zqEA';

const Map = () => {
    
    useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.182831, 26.218287],
      zoom: 10
      });
    });

    return (
    <div className='flex-1 ' id='map'></div>
  )
}

export default Map;