import { useState } from "react";
import { errorPopup, successPopup } from "../components/popup";
import emailjs from "@emailjs/browser";
import { Button } from "@chakra-ui/react";

export const Contact = () => {
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange=(event)=>{
    const {name, value} = event.target;
    setContactData(prevData => {
        return {
            ...prevData,
            [name]:value
        }
    })
    // console.log(contactData)
    }

    const sendMessage = async(event) => {
        const serviceId = "service_juvt2il";
        const templateId = "template_7he316h";
        
        try {
            if(!contactData.email || ! contactData.message) {
                errorPopup("Please enter your email and message.")
            }
            setLoading(true);
            await emailjs.send(serviceId, templateId, {
              from_name: contactData.name,
              to_name: "Contact Support",
              from_email: contactData.email,
              to_email: "mishikaj2001@gmail.com",
              message: contactData.message
              }, 
              'NXB9Ii1cByTHJ4XA4'
            );
        
            setLoading(false);   
            successPopup("Thankyou. We'll get back to you as soon as possible.")  
            setContactData({
            name: "",
            email:  "",
            message: ""
            })    
        } catch (error) {
            setLoading(false)
            // console.log(error)
            errorPopup("Something went wrong!")
        }
    }
    return (
        <div className="h-[100%] md:h-[100vh] flex flex-col-reverse md:flex-row justify-center items-center gap-2">
            <div 
                className="flex-1"
            >
                <video 
                    className="h-[50vh] md:h-[100vh] object-fill"
                    loop="true" autoplay="autoplay" id="vid" muted
                >
                    <source src="/assets/contact-us.webm" type="video/webm" />
                </video>
            </div>
            
            <div className="flex-1 bg-black py-10 px-8 flex flex-col justify-center gap-2 mx-20 sm:mx-10 ">
                <h1 className="text-[3.5rem] -mt-10 mb-6 uppercase"><span>Contact </span><span>Us</span></h1>
                {/* contactData */}
                <div className="relative mb-6">
                    <input 
                        className="px-2 py-4 rounded bg-inherit border-b-2 border-['#adb5bd'] outline-none
                        peer w-full border-b placeholder:text-transparent"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={contactData.name}
                        type="text" 
                        placeholder="Name"
                    />
                    <label for="name" class="absolute left-0 ml-1 -translate-y-4 px-1 duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">
                        Name
                    </label>
                </div>
                <div className="relative mb-6">
                    <input 
                        className="px-2 py-4 rounded bg-inherit border-b-2 border-['#adb5bd'] outline-none
                        peer w-full border-b placeholder:text-transparent"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={contactData.email}
                        type="email"
                        placeholder="Name"
                    />
                    <label for="name" class="absolute left-0 ml-1 -translate-y-4 px-1 duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">
                        Email address
                    </label>
                </div>
                <div className="relative mb-6">
                    <textarea 
                        name="message" 
                        className="px-2 py-4 rounded bg-inherit border-b-2 border-['#adb5bd'] outline-none resize-none
                        peer w-full border-b placeholder:text-transparent"
                        id="message"
                        onChange={handleChange}
                        value={contactData.message}
                        placeholder="Enter your message..." 
                        cols="30" 
                        rows="5"
                    ></textarea>
                    <label for="name" class="absolute left-0 ml-1 -translate-y-4 px-1 duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">
                        Enter your message
                    </label>
                </div>
               
                <Button
                   m={2}
                   py={8}
                   colorScheme="white"
                   onClick={sendMessage}
                   isLoading={loading}
                   className="flex justify-center text-white items-center bg-black gap-4 border rounded-xl py-5 transition ease-in-out hover:animate-pulse hover:bg-white hover:scale-105 hover:text-black active:bg-white"
                >
                 Send
                <img 
                    className="w-7 hover:animate-spin"
                    src="/assets/send.png" 
                    alt="send-icon" 
                />
                </Button>
            </div>
        </div>
    )
}
