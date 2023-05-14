import React, {useState, useEffect} from 'react';
import "./Sentences.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';
import {RiDeleteBack2Fill} from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';

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
      window.location.reload();
      setLoading(false);//hide loading after submitting
      setShowSentenceForm(false);//hide sentence form after submission of new sentence
    }).catch((err) => console.log(err));
  }//handleSubmit

  //update the sentence
  const handleUpdate = (index, _id, sentence) => {

    // const sentence = {
    //   _type : 'sentences',
    //   _id : _id,
    //   sentence : _sentence,
    // }

    // const sentenceToRemove = [`sentences[${index}]`, `sentences[_id==${_id}]`];
    // console.log('sentence >> ', sentenceToRemove);

    // client.patch(_id).unset(sentenceToRemove).commit()

  }//handleUpdate

  //delete the sentence
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "sentences"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!')
      console.log('Deleted');
      window.location.reload();
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
  }//handleDelete

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
      
      {/* Add new sentence starts here */}
      {
        isShowSentenceForm ? (
          <div className='app__sentence-form app__flex'>
            <div className='app__flex'>
              <h3>Add Sentence</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a sentence" name="sentence" value={sentence} onChange={handleChangeInput} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Sentence' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/* Add new sentence ends here */}

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
                <p>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, sentence._id)}/>
                  &nbsp;&nbsp;
                  {sentence.sentence}
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
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(Sentences, 'app__sentences'),
'sentences',
'app__whitebg');