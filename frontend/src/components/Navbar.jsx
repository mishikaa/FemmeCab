import React, { useState } from 'react'
import { Button, ButtonGroup, Link } from '@chakra-ui/react'
import { navLinks } from '../constants'

export const Navbar = () => {
  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)

  return (
    
    <nav className='w-full flex justify-between items-center px-3 py-2'>
        
        {/* Brand section */}
        <div className='flex items-center gap-2'>
          <img className='w-12 h-12 rounded-3xl' src="/assets/logo.jpg" alt="logo" />
          <span>FemmeCab</span>
        </div>

        <div className='hidden md:flex items-center gap-5 justify-between w-[65%]' aria-label='this div will be hidden for smaller devices and flex for md and above'>
          {/* Navigation-links section */}
          <div className='flex gap-6' aria-label='(gap-6 is of 1.5rem)'>
            <ul className='list-none hidden sm:flex
              flex-row gap-10'>
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`
                    ${active === link.title ? "text-white" : "text-secondary"}
                    hover:text-white text-[18px] font-medium cursor-pointer
                    `}
                    onClick={() => setActive(link.title)}
                  >
                    <Link style={{textDecoration: 'none'}}
                    className='hover:text-white'
                    href={link.id}>
                      {link.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
  
          {/* Authentication section */}
          <ButtonGroup spacing='4'>
            <Button
              variant='outline'
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
            <Button
              background= 'var(--light-gradient)'
              fontSize='14px'
              _hover={{
                background: 'white',
              }}
              borderRadius='32px'
            >
              Sign up
            </Button>
          </ButtonGroup>
        </div>

        {/* For small devices */}
        <div 
          className='md:hidden flex flex-1 z-10 justify-end items-center' 
          aria-label='this will be hidden for md above devices'
        >
          <img 
            aria-label='Initially, we need to display the menu icon' 
            src={toggle ? "/assets/close.svg" : "/assets/menu.svg"} 
            alt="menu" 
            className='w-[42px] h-[42px] p-2 object-contain cursor-pointer
            hover:bg-slate-600 hover:rounded-md'
            onClick={() => setToggle(!toggle)} // it will keep on toggling between menu and close icon whenver clicked 
          />
        </div>
        
        <div
          // The drawer is hidden till md and above and visibile below md size
          className = {
            `opacity-1 md:opacity-0
            ${toggle ? "flex-col" : "hidden"} 
            p-6 z-1 absolute top-0 right-0 duration-500
            min-w-[200px] bg-black bg-opacity-90 h-full
            transition delay-800 duration-1000 ease-in`
          }
        >
          <ul className='list-none flex my-10 
          flex-col justify-start items-start gap-6'>
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`
                ${active === link.title ? "text-white" : "text-secondary"}
                font-poppins font-medium cursor-pointer text-[16px]
                `}
                onClick={() => {
                  setToggle(!toggle) //when a link is clicked on, then close the div
                  setActive(link.title)
                }}
              >
                <Link style={{textDecoration: 'none'}}
                className='hover:text-white'
                  href={link.id}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Authentication section */}
          <ButtonGroup className='flex-col items-center gap-5'>
            <Button
              className='w-full'
              variant='outline'
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
            <Button
              className='w-full absolute right-1'
              background= 'var(--light-gradient)'
              fontSize='14px'
              _hover={{
                background: 'white',
              }}
              borderRadius='32px'
            >
              Sign up
            </Button>
          </ButtonGroup>
        </div>
    </nav>
  )
}
