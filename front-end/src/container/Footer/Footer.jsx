import React from 'react';
import "./Footer.scss";
import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p className='p-text'>2023 englingo All rights reserved.</p>
      <p className='icons'>
          <AiFillInstagram/>
          <AiOutlineTwitter/>
      </p>
    </div>
  )
}

export default Footer