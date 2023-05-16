import React, {useState, useEffect} from 'react'
import "./PictureDictionary.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import {RiDeleteBack2Fill} from 'react-icons/ri';

const PictureDictionary = () => {

  const [isShowPictureDictionaryForm, setShowPictureDictionaryForm] = useState(false);
  const [formData, setFormData] = useState({
    word : '',
    meaning : '',
    sentence: '',
  });

  const [loading, setLoading] = useState(false);  
  const {imgUrl} = formData;

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
      imgUrl: formData.imgUrl,
    };

    //creating a new vocab data into sanity
    client.create(vocab).then(() =>{
      setLoading(false);//loading
      setShowPictureDictionaryForm(false);//hide vocab form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  //delete vocab
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "vocabs"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!')
      console.log('Deleted');
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
  }//handleDelete


  //fetching vocabs data from sanity
  useEffect(() => {
    const query = `*[_type == "vocabs"]`;

    client.fetch(query).then((data) => {
      setVocabs(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Picture Dictionary 
        {
          //show Picture Dictionary form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowPictureDictionaryForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice picture dictionary.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/* Add new vocab starts here */}
      {
        isShowPictureDictionaryForm ? (
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

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add PictureDictionary' : 'Sending...'}</button>
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
                <h4>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, vocab._id)}/>
                  &nbsp;&nbsp;
                  {vocab.word} : {vocab.meaning}
                </h4>
                <p>                  
                  {vocab.sentence}
                </p>
                
              </motion.div>
             ))
          }

          <div>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </div>
      </div>
      {/* displaying vocabs items ends here */}
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(PictureDictionary, 'app__vocab'), //component 
"vocab", //idName
"app__whitebg" //className for bg color
); 
