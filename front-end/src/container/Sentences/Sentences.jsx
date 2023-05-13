import React from 'react';
import "./Sentences.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';

const Sentences = () => {
  return (
    <>
      <h2 className='head-text'>Sentences</h2>
      <p className='p-text'>In this section you can do practice Sentences.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/*displaying sentences*/}
      <div className='app__sentences-items'>
          {/* sentence card */}
          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__sentence-item'
          > 
            <p>Its getting late, I should better hit the sack , until time, have a good life folks.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__sentence-item'
          >
            <p>She's so disorganized - I wish she'd get her act together.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__sentence-item'
          > 
            <p>Don't beat around the bush - get to the point!</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__sentence-item'
          > 
            <p>Do you think she'd go out with me if I asked her? "Your guess is as good as mine.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__sentence-item'
          > 
            <p>His behaviour's been bizarre these last few days. He's beginning to worry me.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__sentence-item'
          >
            <p>Patients who lack medical insurance are left out in the cold.</p>
          </motion.div>
      </div>
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(Sentences, 'app__sentences'),
'sentences',
'app__whitebg');