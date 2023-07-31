import { Button, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { MdEmail } from "react-icons/md"
import { FaGoogle } from "react-icons/fa"

import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import { errorPopup, successPopup } from "../popup"
import axios from "axios"

import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../FirebaseAuthentication/firebase";

const Signup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  
  // For Loading state
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  // For form data
  const [formData, setformData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  axios.defaults.withCredentials = true;

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

    if(!formData.email || !formData.password || !formData.confirmPassword) {
      errorPopup('Enter all the required fields.')
    
      setLoading(false);
      return;
    }
    
    // if the entered password is not same as the confirm pasword field
    if(formData.password !== formData.confirmPassword) {
      errorPopup('Passwords do not match. Please try again!');

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
        "https://femme-cab-api.vercel.app/api/user",
        {email: formData.email, password: formData.password},
        config); 
      
      successPopup('Registration successful!')
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/');
      
      }
      catch(error) {
        errorPopup(`Error Occured! ${error.response.data.message}`);
    
        setLoading(false);
      }
    };
    
    // Handling Google Sign in
    const handleGoogleSignIn= () =>{
      setGoogleLoading(true);

      signInWithPopup(auth, provider).then((data) => {
      setformData(data.user.email)
      
      const sentData = {
        email: data.user.email,
        profilePhoto: data.user.photoURL,
        token: data._tokenResponse.idToken,
        _id: data.user.uid
      }
      
      successPopup('Login Successful!');
      localStorage.setItem("userInfo", JSON.stringify(sentData))
      setGoogleLoading(false);
      navigate('/');

    }).catch((error)=>{
      errorPopup('Error signing up with Google');
      setGoogleLoading(false);
    })
    }

  return (
    <>
        <Button
            onClick={onOpen}
            background= 'var(--light-gradient)'
            fontSize='14px'
            _hover={{
              background: 'white',
            }}
            borderRadius='32px'
        >
          Sign up
        </Button>

      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center uppercase font-extrabold">Signup</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input 
                type='email'
                name="email"
                isRequired
                onChange={handleChange}
                value={formData.email}
                placeholder='Enter your Email Id' 
               />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              
                <InputGroup size='md'>
                    <Input
                      type={show ? 'text' : 'password'}
                      name="password"
                      isRequired
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
            
            <FormControl mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                    type='password'
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    pr='4.5rem'
                    placeholder='Confirm your password'
                />
            </FormControl>
          </ModalBody>
          
          <Button 
            leftIcon={<MdEmail />}
            m={3}
            py={6}
            onClick={submitHandler}
            isLoading={loading}
            colorScheme='green'
            isDisabled={loading}
          >
            Signup with Email
          </Button>

          <span className="text-center">or,</span>
          <Button 
            leftIcon={<FaGoogle />}
            colorScheme='red'
            onClick={handleGoogleSignIn}
            isLoading={googleLoading}
            isDisabled={googleLoading}
            m={3}
            py={6}>
            Sign up with Google
          </Button>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Signup;