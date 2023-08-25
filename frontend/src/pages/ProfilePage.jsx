import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RideState } from '../Context_API/provider';
import Logout from '../components/Authentication modals/Logout';
import EditProfile from '../components/EditProfile';
import { Avatar } from '@chakra-ui/react';
import axios from 'axios';
import { errorPopup, successPopup } from '../components/popup';
import RideHistory from "../components/RideHistory";


const ProfilePage = () => {
    const {user, profile, setProfile, fetchAgain} = RideState();
    const [loading, setLoading] = useState();
    const [showRideDetails, setShowRideDetails] = useState();
    
    const displayRideDetails = () => {   
        setShowRideDetails(!showRideDetails)
    }

    // Fetching the additional profile details from the backend
    const fetchProfile = async() => {
        try {
            const config = {
              headers: {
                'Content-type': "application/json"    
              }
            };
                 
            const res = await fetch(
              `https://femme-cab-1pdfbnfu3-mishikaa.vercel.app/api/user/fetchProfile/${user.email}`,
               {
        method: 'GET',
                   mode: 'cors'
    }
            ); 

            const data = await res.json();
            setProfile(data)

            localStorage.setItem('profile', JSON.stringify(profile));

            // console.log(profile)
            successPopup('Profile Data fetched!')
            setLoading(false);
        
            }
            catch(error) {
              errorPopup("Failed to fetch data! Please try again later.");
          
              setLoading(false);
            }
    }

    useEffect(() => {
      fetchProfile();
    }, [fetchAgain])
    
    const navigate = useNavigate();
    return (
    <div className='h-full flex flex-col'>
        <div className='flex flex-row justify-around w-full rounded-b-[40px] p-5 z-10 bg-gradient-to-b from-[#223843] via-[#1f7a8c] to-gray-900'>
            <img 
            className="cursor-pointer rounded-full bg-white p-1 w-8 hover:w-9 absolute top-4 left-4 z-10 shadow-md" 
            src="/assets/arrows/blackBack.png" 
            alt="back"
            onClick={()=>navigate("/dashboard")}
            />

            <div className='flex flex-col items-center justify-end text-3xl font-black tracking-wider'>
                <span className='text-[#dee2e6]'>{user.name}</span>
            </div>
            <div className='relative top-10'>
            <Avatar
                className='border-2 shadow-[0_3px_10px_#4f5d75]'
                name ={user.email}
                size="2xl"
                src ={user.profilePhoto !== 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' && user.profilePhoto}
                bg='#264653' 
            />
            </div>
        </div>
        
        <div className='profile-contents flex flex-col items-start gap-6 p-5'>
            <EditProfile />
            <div className='flex justify-center items-center gap-4 '>
                <img src="/assets/profile/email.png" className="w-12" alt="email-icon" />
                <div className='flex flex-col justify-center items-start'>
                    <span><b>Email</b></span>
                    <span className='text-[#dee2e6]'>{user.email}</span>
                </div>
            </div>
            <div className='flex justify-center items-center gap-4'>
                <img src="/assets/profile/phone.png" className="w-12" alt="phone-icon" />
                <div className='flex flex-col justify-center items-start'>
                    <span><b>Phone Number</b></span>
                    <span className='text-[#dee2e6]'>{profile.phoneNumber}</span>
                </div>
            </div>
            <div className='flex justify-center items-center gap-4'>
                <img src="/assets/profile/savedAddress.png" className="w-12" alt="savedAddress-icon" />
                <div className='flex flex-col justify-center items-start'>
                    <span><b>Saved addresses</b></span>
                    <span className='text-[#dee2e6]'>{profile.savedAddress}</span>
                </div>
            </div>
            
            <div className='flex justify-center items-center gap-4'>
                <img src="/assets/profile/emergencyContact.png" className="w-12" alt="email-icon" />
                <div className='flex flex-col justify-center items-start'>
                    <span><b>Emergency Contact</b></span>
                    <span className='text-[#dee2e6]'>{profile.emergencyContact}</span>
                </div>
            </div>
            <div className='flex justify-center items-center gap-4'>
                <img src="/assets/profile/dob.png" className="w-12" alt="email-icon" />
                <div className='flex flex-col justify-center items-start'>
                    <span><b>Date Of Birth</b></span>
                    <span className='text-[#dee2e6]'>{profile.dob && `${profile.dob.split('T')[0].split('-')[2]}/${profile.dob.split('T')[0].split('-')[1]}/${profile.dob.split('T')[0].split('-')[0]}`}</span>
                </div>
            </div>
            <div className='flex justify-center items-center gap-4'>
                <img src="/assets/profile/member.png" className="w-12" alt="email-icon" />
                <div className='flex flex-col justify-center items-start'>
                    <span><b>Member Since</b></span>
                    <span className='text-[#dee2e6]'>{profile.joiningDate}</span>
                </div>
            </div>

            <div className='flex justify-center items-center gap-4'>
                <img src="/assets/profile/history.png" className="w-12" alt="email-icon" />
                <div className='flex flex-col justify-center items-start'>
                    <RideHistory rideDetails={profile.rideDetails} />
                </div>
            </div>
            
            <div className='m-auto'>
                <Logout />
            </div>
        </div>
    </div>
  )
}

export default ProfilePage
