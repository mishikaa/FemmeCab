import Config from "../config.json";
import React, { useEffect, useState } from 'react'
import displayRazorpay from '../utils/PaymentGateway';
import { RideState } from '../Context_API/provider';

const Payment = () => {
	const {paymentPrice} = RideState();

    const [payment_id, setPayment_id] = useState("")
	
	const loadscript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement('script');

			script.src = src;

			script.onload = () => {
				resolve(true)
			}

			script.onerror = () => {
				resolve(false)
			}
			document.body.appendChild(script)
		}
	)}
    useEffect(() => {
	  loadscript("https://checkout.razorpay.com/v1/checkout.js")
	}, [])
	

    return (
        <div 
            onClick={()=>{displayRazorpay(Config.RAZORPAY_KEY, paymentPrice, setPayment_id)}}
            className="text-left flex justify-between items-center w-[97%] bg-[#E0E2F0] p-5 m-3 cursor-pointer shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.2)]"
        >
            <span  className='font-bold'>{payment_id ? 'Payment Successful ✔️' : (paymentPrice == 0 ? "Payment" : `Amount: ₹${paymentPrice}`)}
				{payment_id && <p className='font-light'>Payment ID: {payment_id}</p>}
			</span>
			
            <img className="h-5 hover:h-6" src="/assets/arrows/forward.png" alt="forward" />
        </div>
    )
}

export default Payment
