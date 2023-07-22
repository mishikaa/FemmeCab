import Config from "../config.json";

const getPlace = async(currentLocationCoordinates, setCurrentLocation) => {
    if(currentLocationCoordinates) {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLocationCoordinates[0]},${currentLocationCoordinates[1]}.json?`+
    new URLSearchParams({
        access_token: Config.MAPBOX_ACCESS_TOKEN,
        limit: 1
    })
    )
    const data = await response.json();
    // console.log(data.features[0].place_name) 
    return setCurrentLocation(data.features[0].place_name);
    }}

export default getPlace
