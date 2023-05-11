import React from 'react';
import "./Navbar.scss";
import {HiMenuAlt, HiX} from 'react-icons/hi';
import {motion} from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="app__navbar">
      <ul>
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