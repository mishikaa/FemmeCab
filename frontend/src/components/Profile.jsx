import { Avatar, Button } from '@chakra-ui/react'
import React from 'react'
import { RideState } from '../Context_API/provider'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate() 
    const {user} = RideState();  
    return (
        <Avatar 
          className='p-0.5 m-2 cursor-pointer'
          name={user.email}
          src={user.profilePhoto !== 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' && user.profilePhoto}
          bg='#264653' 
          onClick={()=>{navigate('/profile')}}
        />
  )
}

export default Profile