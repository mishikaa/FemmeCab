import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { RideState } from '../Context_API/provider'
import { useNavigate } from 'react-router-dom';

const Profile = ({doNavigate}) => {
    const navigate = useNavigate() 
    const {user} = RideState();  
    return (
       user && 
       (
        <Avatar 
          className={`p-0.5 m-2 border-2 shadow-[0_3px_10px_#4f5d75] ${doNavigate} && cursor-pointer`}
          name={user.email}
          src={user.profilePhoto !== 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' && user.profilePhoto}
          bg='#264653' 
          onClick={()=>{doNavigate && navigate('/profile')}}
        />
      )
  )
}

export default Profile
