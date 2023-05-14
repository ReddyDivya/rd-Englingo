import React, {useState, useEffect} from 'react';
import "./Sentences.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';

const Sentences = () => {

  const [loading, setLoading] = useState(false);
  const [isShowSentenceForm, setShowSentenceForm] = useState(false);
  const [formData, setFormData] = useState({
    sentence : ''
  });

  const {sentence} = formData;//assign 'sentence' value

  const [sentences, setSentences] = useState([]);

  const handleChangeInput = (e) => {
    const {name, value} = e.target; //assigning form fields data like sentence
    setFormData({...formData, [name] : value}); //setting previous data, and add new sentence
  }//handleChangeInput

  const handleSubmit = () => {
    setLoading(true);//show loading while submitting

    //adding new sentence
    const sentence = {
      _type : 'sentences',
      sentence : formData.sentence
    }

    //creating a new sentence data into sanity
    client.create(sentence).then(() => {
      setLoading(false);//hie loading after submitting
      setShowSentenceForm(false);//hide sentence form after submission of new sentence
    }).catch((err) => console.log(err));
  }//handleSubmit

  //fetching sentences data from sanity
  useEffect(() => {
    const query = `*[_type == "sentences"]`;

    client.fetch(query).then((data) => {
      setSentences(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Sentences
      {
        //show sentence form after clicking on the add icon +
        <AiFillPlusCircle onClick={() => setShowSentenceForm(true)}/>
      }
      </h2>
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