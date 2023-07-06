import React from 'react'

const Curve = () => {
  return (
    <svg className="location-shadow -mt-8" 
    width="100%" height="100" viewBox="0 0 500 100" preserveAspectRatio="none">
      <linearGradient id="grad1" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#CED2E9" />
        <stop offset="100%" stopColor="#B0B9E5" />
      </linearGradient>
      
      <path d="M0,0 L0,70 Q250,10 500,70 L500,0 Z" fill="url(#grad1)" 
    />
    </svg>
  )
}

export default Curve;