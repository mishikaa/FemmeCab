import { Button, ButtonGroup, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react"
import { MdEmail } from "react-icons/md"
import { FaGoogle } from "react-icons/fa"
  // "proxy": ["http://127.0.0.1:5000", "https://gender-api.com"],

import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import { errorPopup, successPopup } from "../popup"
import axios from "axios"

import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../FirebaseAuthentication/firebase";
import Config from "../../config.json";

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
    name: "",
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
    
    // Identity verification
    // const {data} = await fetch(`https://gender-api.com/get?name=${formData.name}&key=${Config.GENDER_API_KEY}`, {
    //   method: 'GET',
    //   mode: 'cors'
    // })
    // console.log(data.body);
    
    // if(data.gender != "female") {
    //     errorPopup("Sorry, you are not allowed to use this application. Contact us if you think it's a mistake.");
    //     setLoading(false);
    //     setformData({
    //       name: "",
    //       email: "",
    //       password: "",
    //       confirmPassword: ""
    //     });
    //     navigate('/contact')
    //     return;
    // }


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
        // "http://localhost:5000/api/user",
        {name: formData.name, email: formData.email, password: formData.password},
        config); 
      
        
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      window.location.reload()
      successPopup('Registration successful!')
      
      }
      catch(error) {
        errorPopup(`Failed to signup! Please try again.`);
        setLoading(false);
      }
    };
    
    // Handling Google Sign in
    const handleGoogleSignIn= async() =>{
      setGoogleLoading(true);
      try {
        const {googleData} = await signInWithPopup(auth, provider)
        setformData(googleData.user.email)
        
        // console.log(data);
        
        const sentData = {
          email: data.user.email,
          token: data._tokenResponse.idToken,
          _id: data.user.uid
        }
        
        const config = {
          headers: {
            'Content-type': "application/json"    
          }
        };
  
        const {data} = axios.post(
          // "https://femme-cab-api.vercel.app/api/user",
          "http://localhost:5000/api/user",
          {email: formData.email},
          config); 
        
        successPopup('Login Successful!');
        localStorage.setItem("userInfo", JSON.stringify(sentData))
        setGoogleLoading(false);
        window.location.reload()
      }
    catch(error) {
        errorPopup(`Error signing up with Google`);
        setGoogleLoading(false);
      }
    }

  return (
    <>
        <button
          onClick={onOpen}
          className="py-2 px-4 rounded-[32px] bg-gradient-to-r from-[#E2E2E2] to-[#C9D6FF] text-[14px] font-bold text-[var(--text-primary)] hover:from-white hover:to-white hover:scale-105 ease-in duration-200"
        >
            Sign up
        </button>

      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center bg-['#cbf3f0'] uppercase font-extrabold">Signup</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-['#cbf3f0'] flex-col items-center justify-center" pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input 
                type='name'
                name="name"
                isRequired
                onChange={handleChange}
                value={formData.name}
                placeholder='Enter your Name' 
               />
            </FormControl>
            <FormControl mt={4}>
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

          <div className="text-center">or, Signup with</div>

          <Button 
            leftIcon={<FaGoogle />}
            colorScheme='red'
            onClick={handleGoogleSignIn}
            isLoading={googleLoading}
            isDisabled={googleLoading}
            m={3}
            py={6}>
            Google
          </Button>

        </ModalContent>
      </Modal>
    </>
  )
}

export default Signup;