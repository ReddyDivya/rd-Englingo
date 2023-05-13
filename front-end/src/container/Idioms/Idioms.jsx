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
            <h4>Hit the sack : Go to sleep</h4>
            <p>Its getting late, I should better hit the sack , until time, have a good life folks.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>Get your act together : Get organized and do things effectively</h4>
            <p>She's so disorganized - I wish she'd get her act together.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>Beat around the bush : To avoid talking about what’s important</h4>
            <p>Don't beat around the bush - get to the point!</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>Your guess is as good as mine : I don't know</h4>
            <p>Do you think she'd go out with me if I asked her? "Your guess is as good as mine.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          > 
            <h4>Back against the wall : Stuck in a difficult circumstance with no escape</h4>
            <p>His behaviour's been bizarre these last few days. He's beginning to worry me.</p>
          </motion.div>

          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__idiom-item'
          >
            <h4>Left out in the cold : ignore someone</h4>
            <p>Patients who lack medical insurance are left out in the cold.</p>
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