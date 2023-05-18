import React, {useState, useEffect} from 'react';
import "./Idioms.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle, AiFillEdit} from 'react-icons/ai';
import {RiDeleteBack2Fill} from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';

const Idioms = () => {
  
  const [loading, setLoading] = useState(false);
  const [isShowAddIdiomForm, setShowAddIdiomForm] = useState(false);
  const [isShowEditIdiomsForm, setShowEditIdiomsForm] = useState(false);//to show edit idioms form
  const [idioms, setIdioms] = useState([]);
  const [formData, setFormData] = useState({
    idiom : '',
    meaning : '',
    sentence: ''
  });
  const {idiom, meaning, sentence} = formData;
  let vIndex = 0;

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
      setShowAddIdiomForm(false);//hide idiom form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  //show update form
  const handleShowEditForm = (index, idiom, meaning, sentence) => {
    
    vIndex = index;
    setShowEditIdiomsForm(true);//show update idioms form
  }//handleShowEditForm

  //update the sentence
  const handleUpdate = () => {

    //updating new idiom
    const idioms = {
      _type : 'idioms',
      idiom : formData.idiom,
      meaning : formData.meaning,
      sentence : formData.sentence
    }

    client.patch({query: `*[_type == "idioms"][${vIndex}]`})
    .set(idioms).commit()
    .then(() => {
      setShowEditIdiomsForm(false);//hide update idioms form after updating the sentence.
      toast.success('Successfully updated!')
      window.location.reload();
    })
    .catch((err) => {
      console.error('Updated failed: ', err.message)
    })
  }//handleUpdate

  //delete idiom
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "idioms"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!')
      console.log('Deleted');
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
  }//handleDelete

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
          <AiFillPlusCircle onClick={() => setShowAddIdiomForm(true)}/>
      }
      </h2>

      <p className='p-text'>In this section you can do practice idioms.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>
      
      {/*1. Add new idiom starts here */}
      {
        isShowAddIdiomForm ? (
          <div className='app__idiom-form app__flex'>
            <div className='app__flex'>
              <h3>Add Idioms</h3>
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

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Idioms' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/*1. Add new idiom ends here */}

      {/* 2. Update new sentence starts here */}
      {
        isShowEditIdiomsForm ? (
          <div className='app__idiom-form app__flex'>
            <div className='app__flex'>
              <h3>Update Idioms</h3>
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

            <button type="button" className="p-text" onClick={() => handleUpdate() }>{!loading ? 'Update Sentence' : 'Updating...'}</button>
          </div>
        )
        :
        (
          <div></div>
        )
      }
      {/*2. Update new sentence ends here */}

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
              <h4>
                <RiDeleteBack2Fill onClick={() => handleDelete(index, idiom._id)}/>
                &nbsp;&nbsp;
                {idiom.idiom} : {idiom.meaning}
              </h4>
              <p>
                {idiom.sentence}

                <AiFillEdit onClick={() => handleShowEditForm(index, idiom.idiom, idiom.meaning,  idiom.sentence)}/>
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
export default AppWrap(MotionWrap(Idioms, 'app__idioms'), //component 
"idioms", //idName
"app__primarybg" //className for bg color
); 