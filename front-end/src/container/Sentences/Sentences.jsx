import React, {useState, useEffect} from 'react';
import "./Sentences.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';

const Sentences = () => {
  const [sentences, setSentences] = useState([]);

  //fetching sentences data from sanity
  useEffect(() => {
    const query = `*[_type == "sentences"]`;

    client.fetch(query).then((data) => {
      setSentences(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Sentences</h2>
      <p className='p-text'>In this section you can do practice Sentences.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/*displaying sentences*/}
      <div className='app__sentences-items'>
          {/* sentence card */}

          {
            sentences.map((sentence, index) => (
              <motion.div whileInView={{opacity:1}}
                whileHover={{ scale: 1.1 }}
                transition= {{ duration: 0.5, type : 'tween'}}
                className='app__sentence-item'
                key= {sentence + index}
              > 
                <p>{sentence.sentence}</p>
              </motion.div>
            ))
          }
      </div>
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(Sentences, 'app__sentences'),
'sentences',
'app__whitebg');