import React, {useState, useEffect} from 'react'
import "./InsteadOfVery.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle, AiFillEdit} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import {RiDeleteBack2Fill} from 'react-icons/ri';
import { generatePDFWrapper } from '../../utils/useGeneratePDF.js';

const InsteadOfVery = () => {

  const [isShowAddVeryForm, setShowAddVeryForm] = useState(false);
  const [isShowEditVeryForm, setShowEditVeryForm] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [very, setVery] = useState([]);
  let vIndex = 0;

  //add
  const [formData, setFormData] = useState({
    word : '',
    alternative : '',
  });
  const {word, alternative} = formData;

  //edit
  const [editFormData, setEditFormData] = useState({
    editWord : '',
    editAlternative : '',
  });
  const {editWord, editAlternative} = editFormData;

  //adding new word
  const handleChangeInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, alternative
    setFormData({...formData, [name] : value});//setting previous data, and add new word data
  }//handleChangeInput

   //updating a word
   const handleChangeEditInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setEditFormData({...editFormData, [name] : value});//setting previous data, and add new word data
  }//handleChangeEditInput
  
  //submit new instead of very to sanity
  const handleSubmit = () => {
    setLoading(true);//loading

    //adding new vocab data
    const very = {
      _type: 'very',//very document
      word: formData.word,
      alternative: formData.alternative,
    };

    //creating a new very data into sanity
    client.create(very).then(() =>{
      setLoading(false);//loading
      setShowAddVeryForm(false);//hide very form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  //show update form
  const handleShowEditForm = (index, very) => {
    
    vIndex = index;
    setEditFormData({editWord : very.word, editAlternative : very.alternative});
    setShowEditVeryForm(true);//show update instead of very form
  }//handleShowEditForm

  //update the instead of very
  const handleUpdate = () => {

    //updating new instead of very phrases
    const very = {
      _type : 'very',
      word: editFormData.editWord,
      alternative: editFormData.editAlternative,
    }

    client.patch({query: `*[_type == "very"][${vIndex}]`})
    .set(very).commit()
    .then(() => {
      setShowEditVeryForm(false);//hide update instead of very phrases form after updating the grammar.
      toast.success('Successfully updated!')
      window.location.reload();
    })
    .catch((err) => {
      console.error('Updated failed: ', err.message)
    })
  }//handleUpdate
  
  //delete very
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "very"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!')
      console.log('Deleted');
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
  }//handleDelete


  //fetching very data from sanity
  useEffect(() => {
    const query = `*[_type == "very"]`;

    client.fetch(query).then((data) => {
      setVery(data);
    });
  }, []);

  const generatePDF = () => {
    // Call the custom hook wrapper
    generatePDFWrapper({ engData: very, heading: 'Instead of very', fileName: 'insteadOfvery' });
  };

  return (
    <>
      <h2 className='head-text'>Instead of "Very" 
        {
          //show very form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowAddVeryForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice instead of very.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>
      <div>
          <button type="button" className="app__very-form"  onClick={generatePDF}>Generate PDF</button>
      </div>

      {/*1. Add new instead of very starts here */}
      {
        isShowAddVeryForm ? (
          <div className='app__very-form app__flex'>
            <div className='app__flex'>
              <h3>Add Instead of "Very"</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a word" name="word" value={word} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter an alternative" name="alternative" value={alternative} onChange={handleChangeInput} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Instead of "Very"' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/*1. Add new instead of very ends here */}
 
      {/* 2. Update new instead of very starts here */}
      {
        isShowEditVeryForm ? (
          <div className='app__very-form app__flex'>
            <div className='app__flex'>
              <h3>Update Instead of "Very"</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a word" name="editWord" value={editWord} onChange={handleChangeEditInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter an alternative" name="editAlternative" value={editAlternative} onChange={handleChangeEditInput} />
            </div>

            <button type="button" className="p-text" onClick={() => handleUpdate() }>{!loading ? 'Update Instead of Very' : 'Updating...'}</button>
          </div>
        )
        :
        (
          <div></div>
        )
      }
      {/*2. Update new instead of very ends here */}
      
      {/* displaying very items starts here */}
      <div className='app__very-items'>
          {/* vocab item card */}
          {
            very.map((very, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__very-item'
              key={very.word + index}
              > 
                <h4>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, very._id)}/>
                  <AiFillEdit onClick={() => handleShowEditForm(index, very)}/>
                  &nbsp;&nbsp;
                  {very.word} : {very.alternative}
                </h4>
                
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
      {/* displaying very items ends here */}
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(InsteadOfVery, 'app__very'), //component 
"insteadofvery", //idName
"app__whitebg" //className for bg color
); 
