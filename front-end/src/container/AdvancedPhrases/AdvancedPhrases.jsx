import React, {useState, useEffect} from 'react'
import "./AdvancedPhrases.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle, AiFillEdit} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import {RiDeleteBack2Fill} from 'react-icons/ri';

const AdvancedPhrases = () => {

  const [advanced, setAdvanced] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShowAddAdvancedForm, setShowAddAdvancedForm] = useState(false);
  const [isShowEditAdvancedForm, setShowEditAdvancedForm] = useState(false);//to show edit sentence form
  let vIndex = 0;

  //add
  const [formData, setFormData] = useState({
    normalPhrase : '',
    advancedPhrase : '',
  });
  const {normalPhrase, advancedPhrase} = formData;
  
  //edit
  const [editFormData, setEditFormData] = useState({
    editNormalPhrase : '',
    editAdvancedPhrase: '',
  });
  const {editNormalPhrase, editAdvancedPhrase} = editFormData;
  
  //adding new advanced phrase
  const handleChangeInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setFormData({...formData, [name] : value});//setting previous data, and add new word data
  }//handleChangeInput

  //updating new word
  const handleChangeEditInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setEditFormData({...editFormData, [name] : value});//setting previous data, and add new word data
  }//handleChangeEditInput

  //submit new advanced phrase to sanity
  const handleSubmit = () => {
    setLoading(true);//loading

    //adding new advanced data
    const advanced = {
      _type: 'advanced',//advanced document
      normalPhrase: formData.normalPhrase,
      advancedPhrase: formData.advancedPhrase,
    };

    //creating a new advanced data into sanity
    client.create(advanced).then(() =>{
      setLoading(false);//loading
      setShowAddAdvancedForm(false);//hide advanced form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  //show update form
  const handleShowEditForm = (index, advanced) => {
    
    vIndex = index;
    setEditFormData({editNormalPhrase : advanced.normalPhrase, editAdvancedPhrase : advanced.advancedPhrase });
    setShowEditAdvancedForm(true);//show update advanced form
  }//handleShowEditForm

  //update the advanced
  const handleUpdate = () => {

    //updating new advanced phrases
    const advanced = {
      _type : 'advanced',
      normalPhrase : editFormData.editNormalPhrase,
      advancedPhrase : editFormData.editAdvancedPhrase
    }

    client.patch({query: `*[_type == "advanced"][${vIndex}]`})
    .set(advanced).commit()
    .then(() => {
      setShowEditAdvancedForm(false);//hide update advanced phrases form after updating the sentence.
      toast.success('Successfully updated!')
      window.location.reload();
    })
    .catch((err) => {
      console.error('Updated failed: ', err.message)
    })
  }//handleUpdate

  //delete advanced
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "advanced"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!')
      console.log('Deleted');
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
  }//handleDelete


  //fetching advanced phrases data from sanity
  useEffect(() => {
    const query = `*[_type == "advanced"]`;

    client.fetch(query).then((data) => {
      setAdvanced(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Normal vs Advanced Phrases
        {
          //show advanced form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowAddAdvancedForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice advanced phrases.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/*1. Add new advanced starts here */}
      {
        isShowAddAdvancedForm ? (
          <div className='app__advanced-form app__flex'>
            <div className='app__flex'>
              <h3>Add Advanced Phrases</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a normal phrase" name="normalPhrase" value={normalPhrase} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a advanced phrase" name="advancedPhrase" value={advancedPhrase} onChange={handleChangeInput} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Advanced Phrases' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/*1. Add new advanced ends here */}

      {/* 2. Update new sentence starts here */}
      {
        isShowEditAdvancedForm ? (
          <div className='app__advanced-form app__flex'>
            <div className='app__flex'>
              <h3>Update Advanced Phrases</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a normal phrase" name="editNormalPhrase" value={editNormalPhrase} onChange={handleChangeEditInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a advanced phrase" name="editAdvancedPhrase" value={editAdvancedPhrase} onChange={handleChangeEditInput} />
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

      
      {/* displaying advanced phrases items starts here */}
      <div className='app__advanced-items'>
          {/* advanced item card */}
          {
            advanced.map((advanced, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__advanced-item'
              key={advanced.normalPhrase + index}
              > 
                <h4>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, advanced._id)}/>
                  &nbsp;&nbsp;
                  <AiFillEdit onClick={() => handleShowEditForm(index, advanced)}/>
                  &nbsp;&nbsp;
                  {advanced.normalPhrase} : {advanced.advancedPhrase}
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
      {/* displaying advanced phrases items ends here */}
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(AdvancedPhrases, 'app__advanced'), //component 
"advancedPhrases", //idName
"app__primarybg" //className for bg color
); 
