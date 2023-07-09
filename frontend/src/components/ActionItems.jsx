import { useNavigate } from "react-router-dom"
import { ActionButton } from "./ActionButton"
import { Button } from "@chakra-ui/react";

export const ActionItems = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className="actionButtons flex justify-evenly w-full mt-2">
            <ActionButton title="Ride" imgSrc="/assets/ride.png"></ActionButton>
            <ActionButton title="Reserve" imgSrc="/assets/reserve.png"></ActionButton>
        </div>
        <div onClick={()=>navigate('/addLocation')}
            className="rounded-md text-left bg-[#E0E2F0] flex justify-between items-center font-bold p-2 m-3 cursor-pointer shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.2)]"
        >
            Where to?
            <Button className="flex items-center">
                <img src="/assets/clock.png" className="w-4" alt="clock" />
                <span className="mx-1">Now</span>
                <img src="/assets/arrows/down.png" className="object-contain w-4" alt="down" />
            </Button>
        </div>
        </>
  )
}
