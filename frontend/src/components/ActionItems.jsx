import { useNavigate } from "react-router-dom"
import { ActionButton } from "./ActionButton"

export const ActionItems = () => {
    const navigate = useNavigate();
    return (
    <div className='flex-1 rounded-t-3xl mt-1 bg-gradient-to-b from-[#8e9eab] to-[#eef2f3]'>
        <h3 className="text-left text-xl p-3 ml-1 font-bold">FemmeCab</h3>
        <div className="actionButtons flex justify-evenly w-full mt-2">
            <ActionButton title="Ride" imgSrc="/assets/ride.png"></ActionButton>
            <ActionButton title="2 wheeler" imgSrc="/assets/2wheeler.png"></ActionButton>
            <ActionButton title="Reserve" imgSrc="/assets/reserve.png"></ActionButton>
        </div>
        <div onClick={()=>navigate('/addLocation')}
            className="text-left bg-[#E0E2F0] font-bold p-6 m-3 cursor-pointer shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.2)]"
        >
            Where to?
        </div>
    </div>
  )
}
