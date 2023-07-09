import { Button, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { errorPopup, successPopup } from "../popup";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // For modal 
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // For Loading state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // For form data
  const [formData, setformData] = useState({
    email: "",
    password: ""
  });
  
  const handleChange=(event)=>{
    const {name, value} = event.target;
    setformData(prevData => {
        return {
            ...prevData,
            [name]:value
        }
    })
  }

  const submitHandler = async() => {
    setLoading(true);

    if(!formData.email || !formData.password) {
      errorPopup('Enter all the required fields.')
    
      setLoading(false);
      return;
    }
 
  try {
    const config = {
      headers: {
        'Content-type': "application/json"    
      }
    };

    const {data} = await axios.post(
      "/api/user/login",
      {email: formData.email, password: formData.password},
      config
    ); 
    
    successPopup('Login successful!')
    
    localStorage.setItem('userInfo', JSON.stringify(data));
    setLoading(false);
    navigate('/');

    }
    catch(error) {
      errorPopup(`Error Occured! ${error.response.data.message}`);
  
      setLoading(false);
    }
  };
  
  return (
    <>
        <Button
            variant='outline'
            onClick={onOpen}
            color='var(--text-white)'
            borderRadius='32px'
            fontSize='14px'
            _hover={{
              color: 'var(--text-primary)',
              background: 'white',
            }}
        >
            Login
        </Button>
      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center uppercase font-extrabold">Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input 
                value={formData.email}
                type='email'
                name='email'
                onChange={handleChange}
                placeholder='Enter your Email Id' 
              />
            </FormControl>


            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              
                <InputGroup size='md'>
                    <Input
                      name="password"
                      type={show ? 'text' : 'password'}
                      onChange={handleChange}
                      value={formData.password}
                      pr='4.5rem'
                      placeholder='Enter password'
                    />
                    <InputRightElement>
                      <Image className="cursor-pointer"
                        boxSize='20px'
                        alt="hide icon" 
                        src={show ? '/assets/password/hide.png' : '/assets/password/view.png'} 
                        onClick={handleClick}>
                      </Image>
                    </InputRightElement>
                </InputGroup>

            </FormControl>
          </ModalBody>

            <Button 
              onClick={submitHandler}
              isLoading={loading}
              colorScheme='green'
              disabled={loading}
              m={3}
              py={6}
              >
              Login
            </Button>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login;