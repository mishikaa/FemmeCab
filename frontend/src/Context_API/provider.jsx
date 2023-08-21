import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorPopup } from "../components/popup";

const RideContext = createContext();

const Provider = ({children}) => {
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
    const [fetchAgain, setFetchAgain] = useState(false)

    const [pickupCoordinates, setPickupCoordinates] = useState([0,0]);
    const [dropoffCoordinates, setDropoffCoordinates] = useState([0,0]);
    const [pickup, setPickup] = useState()
    const [dropoff, setDropoff] = useState()
    const [duration, setDuration] = useState()
    const [distance, setDistance] = useState()
    let [route, setRoute] = useState()
    const [geojson, setGeojson] = useState()
    const [paymentPrice, setPaymentPrice] = useState(0)

    const navigate = useNavigate();

    // Fetching the local storage
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)

    }, []) //whenever navigate changes it's gonna run again
    
    return (
        <RideContext.Provider value={{user, setUser, profile, setProfile, fetchAgain, setFetchAgain, pickup, setPickup, pickupCoordinates, setPickupCoordinates, dropoff, setDropoff, dropoffCoordinates, setDropoffCoordinates, duration, setDuration, distance, setDistance, geojson, setGeojson, route, setRoute, paymentPrice, setPaymentPrice}}>
            {children}
        </RideContext.Provider>
    )
}

export const RideState = () => {
    return useContext(RideContext);
}

export default Provider;