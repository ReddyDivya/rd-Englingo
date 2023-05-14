import React, {useState, useEffect} from 'react';
import "./Idioms.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';

const Idioms = () => {
  
  const [isShowVocabForm, setShowVocabForm] = useState(false);
  const [formData, setFormData] = useState({
    idiom : '',
    meaning : '',
    sentence: ''
  });

  const [loading, setLoading] = useState(false);
  const {idiom, meaning, sentence} = formData;
  
  const [idioms, setIdioms] = useState([]);

  //fetching idioms data from sanity
  useEffect(() => {
    const query = `*[_type == "idioms"]`;

    client.fetch(query).then((data) => {
      setIdioms(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Idioms</h2>
      <p className='p-text'>In this section you can do practice idioms.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/*displaying idioms items*/}
      <div className='app__idioms-items'>
          {/* idiom item card */}

          {
            idioms.map((idiom, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__idiom-item'
              key={'idiom' + index}
            > 
              <h4>{idiom.idiom} : {idiom.meaning}</h4>
              <p>{idiom.sentence}</p>
            </motion.div>
            ))
          }
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