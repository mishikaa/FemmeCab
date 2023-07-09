import { Button } from '@chakra-ui/react'
import React from 'react'
import { RideState } from '../../Context_API/provider';
import { useNavigate } from 'react-router-dom';
import { successPopup } from '../popup';

const Logout = () => {
    const navigate = useNavigate();
    const {user} = RideState();
    
    const handleClick=()=>{
        if(user) {
            localStorage.removeItem('userInfo')
            navigate('/')
            successPopup('Logged out!')
            }
        }
    return (
      <Button
              variant='outline'
              onClick={handleClick}
              color='var(--text-white)'
              borderRadius='32px'
              fontSize='14px'
              _hover={{
                color: 'var(--text-primary)',
                background: 'white',
              }}
          >
            Logout
      </Button>
  )
}

export default Logout