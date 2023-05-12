import React from 'react';
import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
          <a href="#">
            <AiFillInstagram/>
          </a>
        </div>
        <div>
          <a href="#">
            <AiOutlineTwitter/>
          </a>
        </div>
    </div>
  )
}

export default SocialMedia