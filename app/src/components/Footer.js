import React from 'react'
import heart from './assets/heart.png';
const Footer = () => {
  return (
    <div className='footer'>
      <h2>Made with <img src={heart} alt="love" className="love" /> By Stefano </h2>
    </div>
  )
}

export default Footer
