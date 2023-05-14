import React, {useState, useEffect} from 'react'
import "./Vocab.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';

const Vocab = () => {

  const [isShowVocabForm, setShowVocabForm] = useState(false);
  const [formData, setFormData] = useState({
    word : '',
    meaning : '',
    sentence: '',
  });

  const [loading, setLoading] = useState(false);  
  const {word, meaning, sentence} = formData;

  const [vocabs, setVocabs] = useState([]);
  
  //adding new word
  const handleChangeInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setFormData({...formData, [name] : value});//setting previous data, and add new word data
  }//handleChangeInput

  //submit new vocab to sanity
  const handleSubmit = () => {
    setLoading(true);//loading

    //adding new vocab data
    const vocab = {
      _type: 'vocabs',//vocabs document
      word: formData.word,
      meaning: formData.meaning,
      sentence: formData.sentence,
    };

    //creating a new vocab data into sanity
    client.create(vocab).then(() =>{
      setLoading(false);//loading
      setShowVocabForm(false);//hide vocab form after submission of new word
    }).catch((err) => console.log(err));
  }//handleSubmit

  //fetching vocabs data from sanity
  useEffect(() => {
    const query = `*[_type == "vocabs"]`;

    client.fetch(query).then((data) => {
      setVocabs(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Vocabulary 
        {
          //show vocab form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowVocabForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice vocabulary.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/* Add new vocab starts here */}
      {
        isShowVocabForm ? (
          <div className='app__vocab-form app__flex'>
            <div className='app__flex'>
              <h3>Add Vocabulary</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a word" name="word" value={word} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a meaning" name="meaning" value={meaning} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a sentence" name="sentence" value={sentence} onChange={handleChangeInput} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Vocab' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/* Add new vocab ends here */}
      
      {/* displaying vocabs items starts here */}
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
      {/* displaying vocabs items ends here */}
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(Vocab, 'app__vocab'), //component 
"vocab", //idName
"app__whitebg" //className for bg color
); 
