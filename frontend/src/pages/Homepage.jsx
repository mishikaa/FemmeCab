import React from 'react'
import { Navbar } from '../components/Navbar'
import { Mainbox } from '../components/Mainbox'

export const Homepage = () => {
  return (
    <div className='flex flex-wrap flex-col w-full'>
      <Navbar />
      <Mainbox />
    </div>
  )
}
