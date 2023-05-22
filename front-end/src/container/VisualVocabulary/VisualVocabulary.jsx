import React, {useState, useEffect} from 'react'
import "./VisualVocabulary.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client, urlFor } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import {RiDeleteBack2Fill} from 'react-icons/ri';

const VisualVocabulary = () => {

  const [isShowVisualVocabForm, setShowVisualVocabForm] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [visualVocabs, setVisualVocabs] = useState([]);
  
  const [formData, setFormData] = useState({
    imageUrl : '',
  });
  const {imageUrl} = formData;

  //adding new word
  const handleChangeInput = async (event) => {

    let fileInput = document.querySelector('input[type="file"]');
    const file = event.target.files[0];//file
    
    // Upload the image
    const image = await uploadImage(file);

    // Create a document with the uploaded image
    await handleAddVisualVocab(image);
  }//handleChangeInput

  // Function to upload an image and return its Sanity image reference
  async function uploadImage(file) {
    const imageData = await client.assets.upload('image', file);

    return {
      _type: 'visualVocabs',
      asset: {
        _ref: imageData._id,
        _type: 'reference'
      }
    };
  }//uploadImage

  // Function to create a new document in the Studio with the image field
  async function handleAddVisualVocab(imageUrl) {
    const document = {
      _type: 'visualVocabs',
      // Other fields of your document
      imageUrl : imageUrl,  // Assign the image reference obtained from uploadImage()
    };

    // Create the document in Sanity
    await client.create(document);

    toast.success('Successfully uploaded!');
    setLoading(false);//loading
    setShowVisualVocabForm(false);//hide VisualVocabulary form after submission of new word
    setFormData([]);
  }//handleAddVisualVocab

  //delete VisualVocabulary
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "visualVocabs"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!');
      console.log('Deleted');
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
  }//handleDelete

  //fetching visual vocabs data from sanity
  useEffect(() => {
    const query = `*[_type == "visualVocabs"]`;

    client.fetch(query).then((data) => {
      setVisualVocabs(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Visual Vocabulary
        {
          //show VisualVocabulary form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowVisualVocabForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice visual vocabulary.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/* Add new VisualVocabulary starts here */}
      {
        isShowVisualVocabForm ? (
          <div className='app__visualVocab-form app__flex'>
            <div className='app__flex'>
              <h3>Add Visual Vocabulary</h3>
            </div>
            <div className='app__flex'>
              <input type="file" id='file-input' name="imageUrl" value={imageUrl} onChange={handleChangeInput} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Visual Vocabulary' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/* Add new VisualVocabulary ends here */}
      
      {/* displaying visual vocabs items starts here */}
      <div className='app__visualVocab-items'>
          {/* VisualVocabulary item card */}
          {
            visualVocabs.map((visualVocab, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__visualVocab-item'
              key={index}
              > 
                <h4>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, visualVocab._id)}/>
                  &nbsp;&nbsp;
                </h4>
                <img src={urlFor(visualVocab.imageUrl)}/>
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
      {/* displaying visual vocabs items ends here */}
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(VisualVocabulary, 'app__visualVocabs'), //component 
"visualvocabulary", //idName
"app__primarybg" //className for bg color
); 
