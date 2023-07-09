import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorPopup } from "../components/popup";

const RideContext = createContext();

const Provider = ({children}) => {
    const [user, setUser] = useState();
    const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
    const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);
    
    const navigate = useNavigate();

    // Fetching the local storage
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)

        if(!user) {
            navigate('/')
        }
    }, [navigate]) //whenever navigate changes it's gonna run again
    
    return (
        <RideContext.Provider value={{user, setUser, pickupCoordinates, setPickupCoordinates, dropoffCoordinates, setDropoffCoordinates}}>
            {children}
        </RideContext.Provider>
    )
}

export const RideState = () => {
    return useContext(RideContext);
}

export default Provider;