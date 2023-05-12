import React from 'react'
import "./Vocab.scss";
import {motion} from 'framer-motion';

const Vocab = () => {
  return (
    <>
      <h2 className='head-text'>Vocabulary</h2>
      <p className='p-text'>In this section you can do practice vocabulary.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>
      {/*displaying vocabs items*/}
      <div className='app__vocab-items'>
          {/* vocab item card */}
          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__vocab-item'
          > 
            <h4>Perplex : Confusion</h4>
            <p>This quiz is perplexing.</p>
          </motion.div>
          <motion.div whileInView={{opacity:1}}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.5, type : 'tween'}}
            className='app__vocab-item'
          > 
            <h4>Perplex : Confusion</h4>
            <p>This quiz is perplexing.</p>
          </motion.div>
      </div>
    </>
  )
}

export default Vocab