import React, {useState, useEffect} from 'react'
import "./Vocabulary.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle, AiFillEdit} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import {RiDeleteBack2Fill} from 'react-icons/ri';

const Vocabulary = () => {

  const [isShowAddVocabForm, setShowAddVocabForm] = useState(false);
  const [isShowEditVocabForm, setShowEditVocabForm] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [vocabs, setVocabs] = useState([]);

  let vIndex = 0;

  //add
  const [formData, setFormData] = useState({
    word : '',
    meaning : '',
    sentence: '',
  });
  const {word, meaning, sentence} = formData;
  
  //edit
  const [editFormData, setEditFormData] = useState({
    editWord : '',
    editMeaning : '',
    editSentence: '',
  });
  const {editWord, editMeaning, editSentence} = editFormData;
  
  //adding new word
  const handleChangeInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setFormData({...formData, [name] : value});//setting previous data, and add new word data
  }//handleChangeInput

   //updating new word
   const handleChangeEditInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setEditFormData({...editFormData, [name] : value});//setting previous data, and add new word data
  }//handleChangeEditInput

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
      setShowAddVocabForm(false);//hide vocab form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));

    window.location.reload();
  }//handleSubmit

  //show update form
  const handleShowEditForm = (index, vocab) => {

    vIndex = index;
    setEditFormData({editWord : vocab.word, editMeaning : vocab.meaning, editSentence : vocab.sentence});
    setShowEditVocabForm(true);//show update vocabs form
  }//handleShowEditForm

  //update the vocabs
  const handleUpdate = () => {

    //updating vocabs
    const vocabs = {
      _type : 'vocabs',
      word: editFormData.editWord,
      meaning: editFormData.editMeaning,
      sentence: editFormData.editSentence,
    }

    client.patch({query: `*[_type == "vocabs"][${vIndex}]`})
    .set(vocabs).commit()
    .then(() => {
      setShowEditVocabForm(false);//hide update vocabs form after updating the synonyms.
      toast.success('Successfully updated!')
    })
    .catch((err) => {
      console.error('Updated failed: ', err.message)
    })

    window.location.reload();
  }//handleUpdate

  //delete vocab
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "vocabs"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!');
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })

    window.location.reload();
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
      <h2 className='head-text'>Vocabulary 
        {
          //show vocab form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowAddVocabForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice vocabulary.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/*1. Add new vocab starts here */}
      {
        isShowAddVocabForm ? (
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

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Vocabulary' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/*1. Add new vocab ends here */}
      
      {/* 2. Update vocab starts here */}
      {
        isShowEditVocabForm ? (
          <div className='app__vocab-form app__flex'>
            <div className='app__flex'>
              <h3>Update Vocabulary</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a word" name="editWord" value={editWord} onChange={handleChangeEditInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a meaning" name="editMeaning" value={editMeaning} onChange={handleChangeEditInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a sentence" name="editSentence" value={editSentence} onChange={handleChangeEditInput} />
            </div>

            <button type="button" className="p-text" onClick={() => handleUpdate() }>{!loading ? 'Update Vocabulary' : 'Updating...'}</button>
          </div>
        )
        :
        (
          <div></div>
        )
      }
      {/*2. Update vocab ends here */}

      {/* displaying vocabs items starts here */}
      <div className='app__vocab-items'>
          {/* vocab item card */}
          {
            vocabs.map((vocab, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__vocab-item'
              key={vocab.word + index}
              > 
                <h4>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, vocab._id)}/>
                  &nbsp;&nbsp;
                  <AiFillEdit onClick={() => handleShowEditForm(index, vocab)}/>
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
export default AppWrap(MotionWrap(Vocabulary, 'app__vocab'), //component 
"vocabulary", //idName
"app__whitebg" //className for bg color
); 
