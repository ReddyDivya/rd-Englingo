import React from 'react';
import "./Footer.scss";
import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p className="footer__copyright">@2023 engLingo. All rights reserved</p>
      <p className='icons'>
          <AiFillInstagram/>
          <AiOutlineTwitter/>
      </p>
    </div>
  )
}

export default Footer