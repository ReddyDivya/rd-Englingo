import React from 'react';
import {motion} from 'framer-motion';//for animation

const MotionWrap = (Component, classNames) => function HOC() {
  return (
    <motion.div whileInView={{y:[100, 50, 0], opacity:[0, 0, 1]}}
        transition={{duration: 0.5}}
        className={`${classNames} app__flex`}
    >
        {/* displaying the components like vocab, idioms */}
        <Component/>
    </motion.div>
  )
}

export default MotionWrap;