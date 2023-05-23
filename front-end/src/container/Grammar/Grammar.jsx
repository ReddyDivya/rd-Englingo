import React, {useState, useEffect} from 'react';
import "./Grammar.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client, urlFor } from '../../client.js';
import {AiFillPlusCircle, AiFillEdit } from 'react-icons/ai';
import {RiDeleteBack2Fill} from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';

const Grammar = () => {
  
  const [isShowAddGrammarForm, setShowAddGrammarForm] = useState(false);
  const [isShowEditGrammarForm, setShowEditGrammarForm] = useState(false);//to show edit grammar form
  const [grammar, setGrammar] = useState([]);
  const [loading, setLoading] = useState(false);
  let vIndex = 0;

  //add
  const [formData, setFormData] = useState({
    heading : '',
    notes : '',
    imageUrl : '',
  });
  const {heading, notes, imageUrl} = formData;

  //edit
  const [editFormData, setEditFormData] = useState({
    editHeading : '',
    editNotes : '',
    // imageUrl: '',
  });
  const {editHeading, editNotes} = editFormData;

  //adding new grammar
  const handleChangeInput = async (event) => {
    const {name, value} = event.target; //assigning form fields data like grammar, meaning, sentence
    setFormData({...formData, [name] : value}); //setting previous data, and add new word data
  }//handleChangeInput

  const handleChangeImage = async (event) => {
    const file = event.target.files[0];//file

    // Upload the image
    formData.imageUrl = await uploadImage(file);
  }//handleChangeImage

  //updating a word
  const handleChangeEditInput = async (event) => {
 
    const {name, value} = event.target;//assigning form fields data like word, meaning, sentence
    setEditFormData({...editFormData, [name] : value});//setting previous data, and add new word data
  }//handleChangeEditInput

  //submit new grammar to sanity
  const handleSubmit = () => {
    setLoading(true);//loading

    //adding new grammar data
    const grammar = {
      _type : 'grammar', //grammar document
      heading : formData.heading,
      notes : formData.notes,
      imageUrl : formData.imageUrl,
    }

    //creating a new grammar data into sanity
    client.create(grammar).then(() =>{
      setLoading(false);//loading
      setShowAddGrammarForm(false);//hide grammar form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  /*
    uploadImage takes a file as input, uploads it to Sanity using client.assets.upload, 
    and returns the image reference in the required format.
  */
  const uploadImage = async (file) => {
    const imageData = await client.assets.upload('image', file);

    return {
      _type: 'grammar',
      asset: {
        _ref: imageData._id,
        _type: 'reference'
      }
    };
  }//uploadImage

  //show update form
  const handleShowEditForm = (index, grammar) => {
    
    vIndex = index;
    setEditFormData({editHeading : grammar.heading, editNotes : grammar.notes});
    setShowEditGrammarForm(true);//show update grammar form
  }//handleShowEditForm

  //update the grammar
  const handleUpdate = () => {

    //updating new grammar phrases
    const grammar = {
      _type : 'grammar',
      heading : editFormData.editHeading,
      notes : editFormData.editNotes,
    }

    client.patch({query: `*[_type == "grammar"][${vIndex}]`})
    .set(grammar).commit()
    .then(() => {
      setShowEditGrammarForm(false);//hide update grammar phrases form after updating the grammar.
      toast.success('Successfully updated!')
      window.location.reload();
    })
    .catch((err) => {
      console.error('Updated failed: ', err.message)
    })
  }//handleUpdate
  
  //delete grammar
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "grammar"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!')
      console.log('Deleted');
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
  }//handleDelete

  //fetching grammar data from sanity
  useEffect(() => {
    const query = `*[_type == "grammar"]`;

    client.fetch(query).then((data) => {
      setGrammar(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Grammar
      {
          //show grammar form after clicking on the add icon +
          <AiFillPlusCircle onClick={() => setShowAddGrammarForm(true)}/>
      }
      </h2>

      <p className='p-text'>In this section you can do practice grammar.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>
      
      {/*1. Add new grammar starts here */}
      {
        isShowAddGrammarForm ? (
          <div className='app__grammar-form app__flex'>
            <div className='app__flex'>
              <h3>Add Grammar Notes</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a heading" name="heading" value={heading} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <textarea className="p-text" type="text" placeholder="Please, enter a notes" name="notes" value={notes} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input type="file" name="imageUrl" onChange={handleChangeImage} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Grammar Notes' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }

      {/*1. Add new grammar ends here */}

      {/* 2. Update new grammar starts here */}
      {
        isShowEditGrammarForm ? (
          <div className='app__grammar-form app__flex'>
            <div className='app__flex'>
              <h3>Update Grammar Notes</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a heading" name="editHeading" value={editHeading} onChange={handleChangeEditInput} />
            </div>
            <div className='app__flex'>
              <textarea className="p-text" type="text" placeholder="Please, enter a notes" name="editNotes" value={editNotes} onChange={handleChangeEditInput} />
            </div>
            <div className='app__flex'>
              <input type="file" name="imageUrl" onChange={handleChangeImage} />
            </div>

            <button type="button" className="p-text" onClick={() => handleUpdate() }>{!loading ? 'Update Grammar Notes' : 'Updating...'}</button>
          </div>
        )
        :
        (
          <div></div>
        )
      }
      {/*2. Update new grammar ends here */}


      {/*displaying grammar items*/}
      <div className='app__grammar-items'>
          {/* grammar item card */}

          {
            grammar.map((grammar, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__grammar-item'
              key={'grammar' + index}
            > 
              <h4>
                <RiDeleteBack2Fill onClick={() => handleDelete(index, grammar._id)}/>
                &nbsp;&nbsp;
                <AiFillEdit onClick={() => handleShowEditForm(index, grammar)}/>
                &nbsp;&nbsp;
                {grammar.heading}
              </h4>
              <pre>
                {grammar.notes}
              </pre>
              {
                grammar.imageUrl ? <img src={urlFor(grammar.imageUrl)}/> : <></>
              }


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
export default AppWrap(MotionWrap(Grammar, 'app__grammar'), //component 
"grammar", //idName
"app__whitebg" //className for bg color
); 