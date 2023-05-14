import React, {useState, useEffect} from 'react';
import "./Idioms.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';

const Idioms = () => {
  
  const [isShowIdiomForm, setShowIdiomForm] = useState(false);
  const [formData, setFormData] = useState({
    idiom : '',
    meaning : '',
    sentence: ''
  });

  const [loading, setLoading] = useState(false);
  const {idiom, meaning, sentence} = formData;

  const [idioms, setIdioms] = useState([]);

  //adding new idiom
  const handleChangeInput = (e) => {
      const {name, value} = e.target; //assigning form fields data like idiom, meaning, sentence
      setFormData({...formData, [name] : value}); //setting previous data, and add new word data
  }//handleChangeInput

  //submit new vocab to sanity
  const handleSubmit = () => {
    setLoading(true);//loading

    //adding new idiom data
    const idiom = {
      _type : 'idioms', //idioms document
      idiom : formData.idiom,
      meaning : formData.meaning,
      sentence : formData.sentence,
    }

    //creating a new idiom data into sanity
    client.create(idiom).then(() =>{
      setLoading(false);//loading
      setShowIdiomForm(false);//hide idiom form after submission of new word
    }).catch((err) => console.log(err));
  }//handleSubmit

  //fetching idioms data from sanity
  useEffect(() => {
    const query = `*[_type == "idioms"]`;

    client.fetch(query).then((data) => {
      setIdioms(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Idioms
      {
          //show idiom form after clicking on the add icon +
          <AiFillPlusCircle onClick={() => setShowIdiomForm(true)}/>
      }
      </h2>

      <p className='p-text'>In this section you can do practice idioms.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>
      
      {/* Add new idiom starts here */}
      {
        isShowIdiomForm ? (
          <div className='app__idiom-form app__flex'>
            <div className='app__flex'>
              <h3>Add Idiom</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a idiom" name="idiom" value={idiom} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a meaning" name="meaning" value={meaning} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a sentence" name="sentence" value={sentence} onChange={handleChangeInput} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Idiom' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }

      {/* Add new idiom ends here */}

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