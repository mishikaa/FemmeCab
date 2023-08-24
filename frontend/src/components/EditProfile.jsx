import React from 'react'
import { Button, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { errorPopup, successPopup } from "./popup";

import { RideState } from "../Context_API/provider";

const  EditProfile = ({tag}) => {
  axios.defaults.withCredentials = true;
  const {user, profile, setProfile, fetchAgain, setFetchAgain} = RideState();
  const { isOpen, onOpen, onClose } = useDisclosure()

  // For modal 
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // For Loading state
  const [loading, setLoading] = useState(false);

  // For form data
  const [formData, setformData] = useState({
    name: "",
    email: user.email,
    phoneNumber: "",
    savedAddress: "",
    emergencyContact: "",
    dob: "",
    joiningDate: user.joiningDate
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

    if(!formData) {
      errorPopup('No changes made.')
    
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
      "https://femme-cab-1pdfbnfu3-mishikaa.vercel.app/api/user/editProfile",
      // "http://localhost:5000/api/user/editProfile",
      {email: user.email, name: formData.name, phoneNumber: formData.phoneNumber, savedAddress: formData.savedAddress, emergencyContact: formData.emergencyContact, dob: formData.dob},
      config
    ); 
    // console.log(data)

    setProfile(data);

    successPopup('Saved Changes!')
    setFetchAgain(!fetchAgain)
    setLoading(false);

    }
    catch(error) {
      errorPopup("Failed to save changes! Please try again later.");
  
      setLoading(false);
    }
  };
  
  return (
    <>
        <button className="flex gap-2 border-2 p-2 rounded-xl" onClick={onOpen}>
            Edit Profile
            <img 
                src="/assets/profile/edit.png" 
                className="w-5 cursor-pointer" 
                alt="" 
            />
        </button>
      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center uppercase font-extrabold">Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input 
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder={user.name}
                mb={4} 
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input 
                type="email"
                value={user.email}
                disabled
                mb={4} 
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input 
                type='tel'
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
                placeholder={profile.phoneNumber} 
                mb={4} 
              />
            </FormControl>

            <FormControl>
              <FormLabel>Saved Address</FormLabel>
              <Input 
                value={formData.savedAddress}
                type='text'
                name="savedAddress"
                onChange={handleChange}
                placeholder={profile.savedAddress} 
                mb={4} 
              />
            </FormControl>

            <FormControl>
              <FormLabel>Emergency Contact</FormLabel>
              <Input 
                value={formData.emergencyContact}
                type='tel'
                name="emergencyContact"
                onChange={handleChange}
                placeholder={profile.savedAddress}
                mb={4}  
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date Of Birth</FormLabel>
              <Input 
                value={formData.dob}
                type='date'
                name="dob"
                onChange={handleChange}
                placeholder={profile.dob} 
                max="2005-01-01"
                mb={4} 
              />
            </FormControl>

            <FormControl>
              <FormLabel>Member Since</FormLabel>
              <Input 
                type="text"
                value={profile.joiningDate}
                disabled 
              />
            </FormControl>
          </ModalBody>

            <Button 
              onClick={submitHandler}
              colorScheme="green"
              isLoading={loading}
              disabled={loading}
              m={2}
              py={6}
              >
              Save Changes
            </Button>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProfile;
