import { Button } from '@chakra-ui/react'
import React from 'react'
import { RideState } from '../../Context_API/provider';
import { successPopup } from '../popup';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {user} = RideState();
    const navigate = useNavigate();
    
    const handleClick=()=>{
        if(user) {
            localStorage.removeItem('userInfo')
            navigate('/');
            window.location.reload()
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