import React, {useState, useEffect} from 'react'
import "./Synonyms.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle, AiFillEdit} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import {RiDeleteBack2Fill} from 'react-icons/ri';
import { generatePDFWrapper } from '../../utils/useGeneratePDF.js';

const Synonyms = () => {

  const [loading, setLoading] = useState(false);  
  const [vSynonyms, setSynonyms] = useState([]);
  const [isShowAddSynonymsForm, setShowAddSynonymsForm] = useState(false);
  const [isShowEditSynonymsForm, setShowEditSynonymsForm] = useState(false);
  let vIndex = 0;
  
  //add
  const [formData, setFormData] = useState({
    word : '',
    synonyms : '',
    sentence: '',
  });
  const {word, synonyms, sentence} = formData;

  //edit
  const [editFormData, setEditFormData] = useState({
    editWord : '',
    editSynonyms : '',
    editSentence: '',
  });
  const {editWord, editSynonyms, editSentence} = editFormData;
  
  //adding new word
  const handleChangeInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setFormData({...formData, [name] : value});//setting previous data, and add new word data
  }//handleChangeInput

   //updating a word
   const handleChangeEditInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setEditFormData({...editFormData, [name] : value});//setting previous data, and add new word data
  }//handleChangeEditInput

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
      setShowAddSynonymsForm(false);//hide synonym form after submission of new word
      setFormData([]);
      toast.success('Successfully added!')
      window.location.reload();
    }).catch((err) => console.log(err));
  }//handleSubmit

  //show update form
  const handleShowEditForm = (index, synonym) => {
    
    vIndex = index;
    setEditFormData({editWord : synonym.word, editSynonyms : synonym.synonyms, editSentence : synonym.sentence});
    setShowEditSynonymsForm(true);//show update synonyms form
  }//handleShowEditForm

  //update the synonyms
  const handleUpdate = () => {

    //updating synonym
    const synonyms = {
      _type : 'synonyms',
      word: editFormData.editWord,
      synonyms: editFormData.editSynonyms,
      sentence: editFormData.editSentence,
    }

    client.patch({query: `*[_type == "synonyms"][${vIndex}]`})
    .set(synonyms).commit()
    .then(() => {
      setShowEditSynonymsForm(false);//hide update synonyms form after updating the synonyms.
      toast.success('Successfully updated!')
      window.location.reload();
    })
    .catch((err) => {
      console.error('Updated failed: ', err.message)
    })
  }//handleUpdate
  
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

  const generatePDF = () => {
    // Call the custom hook wrapper
    generatePDFWrapper({ engData: vSynonyms, heading: 'Synonyms', fileName: 'synonyms' });
  };

  return (
    <>
      <h2 className='head-text'>Synonyms 
        {
          //show synonym form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowAddSynonymsForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice synonyms.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>
      
      <div>
          <button type="button" className="app__synonym-form"  onClick={generatePDF}>Generate PDF</button>
      </div>

      {/*1. Add synonym starts here */}
      {
        isShowAddSynonymsForm ? (
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
      {/*1. Add synonym ends here */}

      {/* 2. Update synonyms starts here */}
      {
        isShowEditSynonymsForm ? (
          <div className='app__synonym-form app__flex'>
            <div className='app__flex'>
              <h3>Update Synonyms</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a word" name="editWord" value={editWord} onChange={handleChangeEditInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter synonyms" name="editSynonyms" value={editSynonyms} onChange={handleChangeEditInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a sentence" name="editSentence" value={editSentence} onChange={handleChangeEditInput} />
            </div>

            <button type="button" className="p-text" onClick={() => handleUpdate() }>{!loading ? 'Update Synonyms' : 'Updating...'}</button>
          </div>
        )
        :
        (
          <div></div>
        )
      }
      {/*2. Update synonyms ends here */}
      
      {/* displaying synonyms items starts here */}
      <div className='app__synonym-items'>
          {/* synonym item card */}
          {
            vSynonyms.map((synonym, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__synonym-item'
              key={synonym.word + index}
              > 
                <h4>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, synonym._id)}/>
                  <AiFillEdit onClick={() => handleShowEditForm(index, synonym)}/>
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
