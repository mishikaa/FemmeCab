import { Button, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { errorPopup, successPopup } from "../popup";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const  Login = () => {
  axios.defaults.withCredentials = true;

  const { isOpen, onOpen, onClose } = useDisclosure()

  // For modal 
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // For Loading state
  const [loading, setLoading] = useState(false);

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
      "https://femme-cab-api.vercel.app/api/user/login",
      {email: formData.email, password: formData.password},
      config
    ); 
    
    
    localStorage.setItem('userInfo', JSON.stringify(data));
    setLoading(false);
    successPopup('Login successful!')
    
    window.location.reload()

    }
    catch(error) {
      errorPopup(`Invalid email or password`);
  
      setLoading(false);
    }
  };
  
  return (
    <>
        <button
          onClick={onOpen}
          className="border p-2 px-4 rounded-[32px] text-[14px] font-bold hover:bg-white hover:text-[var(--text-primary)]  hover:scale-105 ease-in duration-200"
        >
            Login
        </button>
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