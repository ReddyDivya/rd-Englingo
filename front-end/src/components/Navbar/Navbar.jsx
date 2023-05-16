import React, {useState} from 'react';
import "./Navbar.scss";
import {images} from '../../constants';
import {HiMenuAlt4, HiX} from 'react-icons/hi';
import {motion} from 'framer-motion';
import {AiFillCaretDown} from 'react-icons/ai';

const Navbar = () => {
const [toggle, setToggle] = useState(false);

  return (

    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <p className="logo">
            <a href="/">EngLingo</a>
        </p>
      </div>

      <ul className="app__navbar-links">

        {/*menu*/}
        {['vocabulary', 'idioms', 'sentences', 'instead-of-very', 'synonyms', 'advanced-Phrases', 'grammar', 'OtherWays'].map((item) => (
          <li className="app__flex" key={`link-${item}`}>
            
            {/* div is to display dot on navbar-menu's top while hovering. */}
            <div />

            {/* menu items */}
            <a href={`#${item.replaceAll('-','')}`}>{item.replaceAll('-', ' ')}
                {/* <AiFillCaretDown/> */}
            </a>

            { /*submenu*/ }
            {/* <ul className="app__subnavbar-links">
                <div className="dropdown-content">
                  <li className="app__flex">
                    <a href='#synonyms'>synonyms</a>
                    <a href='#very'>very</a>
                  </li>
                </div>
            </ul> */}
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">

         {/*displaying menu icon */}
        <HiMenuAlt4 onClick={() => setToggle(true)} /> {/*setToggle = true - to open up menu */}

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >

            {/*displaying X icon*/}
            <HiX onClick={() => setToggle(false)} />  {/*setToggle = false - to close menu */}
            <ul>
              {['vocabulary', 'idioms', 'sentences', 'very', 'synonyms', 'advancedPhrases', 'grammar', 'OtherWays'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;