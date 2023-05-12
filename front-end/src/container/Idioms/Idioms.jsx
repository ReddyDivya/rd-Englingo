import React from 'react';
import "./Idioms.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';

const Idioms = () => {
  return (
    <>
      <h2 className='head-text'>Idioms</h2>
      <p className='p-text'>In this section you can do practice idioms.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/*displaying idioms items*/}
      <div className='app__idioms-items'>
          {/* idiom item card */}
          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>Perplex : Confusion</h4>
            <p>You'll also be pursuing intriguing but somewhat perplexing offers.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>Sketchy : Incomplete information</h4>
            <p>Details of what actually happened are still sketchy.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>Ace : excellent</h4>
            <p>She is an ace swimmer.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>connoisseur : an expert on a subject like food, art</h4>
            <p>My mother does not work, but she's an art connoisseur.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>Bizarre : very strange or unusual</h4>
            <p>His behaviour's been bizarre these last few days. He's beginning to worry me.
            </p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>Bin-off : to giveup trying to continue</h4>
            <p>I decided to bin off the idea to go to South Korea.</p>
          </motion.div>
      </div>
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(Idioms, 'app__idioms'), //component 
"idioms", //idName
"app__primarybg" //className for bg color
); 