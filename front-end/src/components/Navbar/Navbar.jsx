import React from 'react';
import "./Navbar.scss";
import {images} from '../../constants';
import {HiMenuAlt, HiX} from 'react-icons/hi';
import {motion} from 'framer-motion';

const Navbar = () => {
  return (

    <nav className="app__navbar">
      {/*logo*/}
      <div className='app__navbar-logo'>
        <img src={images.logo} alt='logo'/>
      </div>

      {/* menu */}
      <ul className='app__navbar-links'>
        {
          ['Vocab', 'Idioms', 'Sentences', 'Grammar'].map((item) => (
            <li className='app__flex p-text' key={`link-${item}`}>
              <a href={`${item}`}>{item}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Navbar