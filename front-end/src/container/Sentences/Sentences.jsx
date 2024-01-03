import React, {useState, useEffect} from 'react';
import "./Sentences.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle, AiFillEdit} from 'react-icons/ai';
import {RiDeleteBack2Fill} from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import { generatePDFWrapper } from '../../utils/useGeneratePDF.js';

const Sentences = () => {
  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShowAddSentenceForm, setShowAddSentenceForm] = useState(false);//to show add sentence form
  const [isShowEditSentenceForm, setShowEditSentenceForm] = useState(false);//to show edit sentence form
  let vIndex = 0;

  //add
  const [formData, setFormData] = useState({
    sentence : ''
  });
  const {sentence} = formData;//assign 'sentence' value

  //edit
  const [editFormData, setEditFormData] = useState({
    editSentence: '',
  });
  const {editSentence} = editFormData;
  
  //onchange of input fields
  const handleChangeInput = (e) => {
    const {name, value} = e.target; //assigning form fields data like sentence
    setFormData({...formData, [name] : value}); //setting previous data, and add new sentence
  }//handleChangeInput

  //updating a sentence
  const handleChangeEditInput = (e) => { 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setEditFormData({...editFormData, [name] : value});//setting previous data, and add new word data
  }//handleChangeEditInput

  //adding new sentence
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
      setShowAddSentenceForm(false);//hide sentence form after submission of new sentence
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  //show update form
  const handleShowEditForm = (index, sentence) => {
    
    vIndex = index;
    setEditFormData({editSentence : sentence.sentence});
    setShowEditSentenceForm(true);//show update sentence form
  }//handleShowEditForm

  //update the sentence
  const handleUpdate = () => {

    //updating new sentence
    const sentence = {
      _type : 'sentences',
      sentence : editFormData.editSentence
    }

    client.patch({query: `*[_type == "sentences"][${vIndex}]`})
    .set(sentence).commit()
    .then(() => {
      setShowEditSentenceForm(false);//hide update sentence form after updating the sentence.
      toast.success('Successfully updated!')
      window.location.reload();
    })
    .catch((err) => {
      console.error('Updated failed: ', err.message)
    })
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

  const generatePDF = () => {
    // Call the custom hook wrapper
    generatePDFWrapper({ engData: sentences, heading: 'Sentences', fileName: 'sentences' });
  };

  return (
    <>
      <h2 className='head-text'>Sentences
      {
        //show sentence form after clicking on the add icon +
        <AiFillPlusCircle onClick={() => setShowAddSentenceForm(true)}/>
      }
      </h2>
      <p className='p-text'>In this section you can do practice Sentences.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>
      <div>
          <button type="button" className="app__sentence-form"  onClick={generatePDF}>Generate PDF</button>
      </div>
      {/* Add new sentence starts here */}
      {
        isShowAddSentenceForm ? (
          <div className='app__sentence-form app__flex'>
            <div className='app__flex'>
              <h3>Add Sentences</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a sentence" name="sentence" value={sentence} onChange={handleChangeInput} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Sentences' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div></div>
        )
      }
      {/* 1. Add new sentence ends here */}

      {/* 2. Update new sentence starts here */}
      {
        isShowEditSentenceForm ? (
          <div className='app__sentence-form app__flex'>
            <div className='app__flex'>
              <h3>Update Sentence</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a sentence" name="editSentence" value={editSentence} onChange={handleChangeEditInput} />
            </div>
            <button type="button" className="p-text" onClick={() => handleUpdate() }>{!loading ? 'Update Sentence' : 'Updating...'}</button>
          </div>
        )
        :
        (
          <div></div>
        )
      }
      {/*2. Update new sentence ends here */}

      {/*3. displaying sentences*/}
      <div className='app__sentences-items'>
          {/* sentence card */}
          {
            sentences.map((sentence, index) => (
              <motion.div whileInView={{opacity:1}}
                whileHover={{ scale: 1.1 }}
                transition= {{ duration: 0.5, type : 'tween'}}
                className='app__sentence-item'
                key= {sentence.sentence + index}
              > 
                <p>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, sentence._id)}/>
                  &nbsp;&nbsp;
                  <AiFillEdit onClick={() => handleShowEditForm(index, sentence)}/>
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