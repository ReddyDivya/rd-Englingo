import React, {useState, useEffect} from 'react'
import "./Vocab.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import {client} from '../../client';

const Vocab = () => {

  const [vocabs, setVocabs] = useState([]);

  //fetching vocabs data from sanity
  useEffect(() => {
    const query = `*[  == 'vocabs']`;
    client.fetch(query).then((data) => setVocabs(data)).catch(console.error);
  }, []);

  return (
    <>
      <h2 className='head-text'>Vocabulary</h2>
      <p className='p-text'>In this section you can do practice vocabulary.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>
      {/*displaying vocabs items*/}
      <div className='app__vocab-items'>
          {/* vocab item card */}
          {
            vocabs.map((vocab, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__vocab-item'
              key={vocab.title + index}
              > 
                <h4>{vocab.word} : {vocab.meaning}</h4>
                <p>{vocab.sentence}</p>
              </motion.div>
             ))
          }
      </div>
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(Vocab, 'app__vocab'), //component 
"vocab", //idName
"app__whitebg" //className for bg color
); 
