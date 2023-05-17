import React, {useState, useEffect} from 'react'
import "./Synonyms.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import {RiDeleteBack2Fill} from 'react-icons/ri';

const Synonyms = () => {

  const [isShowSynonymsForm, setShowSynonymsForm] = useState(false);
  const [formData, setFormData] = useState({
    word : '',
    synonyms : '',
    sentence: '',
  });

  const [loading, setLoading] = useState(false);  
  const {word, synonyms, sentence} = formData;

  const [vSynonyms, setSynonyms] = useState([]);
  
  //adding new word
  const handleChangeInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setFormData({...formData, [name] : value});//setting previous data, and add new word data
  }//handleChangeInput

  //submit new synonym to sanity
  const handleSubmit = () => {
    setLoading(true);//loading

    //adding new synonym data
    const synonym = {
      _type: 'synonyms',//synonyms document
      word: formData.word,
      synonyms: formData.synonyms,
      sentence: formData.sentence,
    };

    //creating a new synonym data into sanity
    client.create(synonym).then(() =>{
      setLoading(false);//loading
      setShowSynonymsForm(false);//hide synonym form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  //delete synonym
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "synonyms"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!')
      console.log('Deleted');
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
  }//handleDelete


  //fetching synonyms data from sanity
  useEffect(() => {
    const query = `*[_type == "synonyms"]`;

    client.fetch(query).then((data) => {
      setSynonyms(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Synonyms 
        {
          //show synonym form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowSynonymsForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice synonyms.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/* Add new synonym starts here */}
      {
        isShowSynonymsForm ? (
          <div className='app__synonym-form app__flex'>
            <div className='app__flex'>
              <h3>Add Synonyms</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a word" name="word" value={word} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter synonyms" name="synonyms" value={synonyms} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a sentence" name="sentence" value={sentence} onChange={handleChangeInput} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Synonyms' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/* Add new synonym ends here */}
      
      {/* displaying synonyms items starts here */}
      <div className='app__synonym-items'>
          {/* synonym item card */}
          {
            vSynonyms.map((synonym, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__synonym-item'
              key={synonym.title + index}
              > 
                <h4>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, synonym._id)}/>
                  &nbsp;&nbsp;
                  {synonym.word} : {synonym.synonyms}
                </h4>
                <p>                  
                  {synonym.sentence}
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
      {/* displaying synonyms items ends here */}
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(Synonyms, 'app__synonyms'), //component 
"synonyms", //idName
"app__primarybg" //className for bg color
); 
