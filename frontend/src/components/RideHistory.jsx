import React from 'react'
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

const RideHistory = ({rideDetails}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <span
          onClick={onOpen}
          className="font-bold cursor-pointer"
        >
            Show Ride History
        </span>
        <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center bg-['#cbf3f0'] uppercase font-extrabold">Ride History</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-['#cbf3f0'] flex-col items-center justify-center" pb={6}>
            {rideDetails ? (
                <ul className='list-decimal'>
                    {rideDetails.map((ride) => (
                    <li key={ride._id}>
                        <div className='flex flex-col'>
                        <span><b>Pickup: </b>{ride.pickupAddress}</span>
                        <span><b>Dropoff: </b>{ride.dropoffAddress}</span>
                        <span><b>Distance: </b>{ride.distance} km</span>
                        <span><b>Duration: </b>{ride.duration} min</span>
                        <span><b>Transaction ID: </b>{ride.paymentId}</span>
                        <span><b>Booked at: </b>{ride.time}</span>
                        </div>
                    </li>))}
                </ul>
            ) 
            : "No history"}
        </ModalBody>
        </ModalContent>
        </Modal>
        </>
  )
}

export default RideHistory