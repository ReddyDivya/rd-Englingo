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
  const handleChangeInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setFormData({...formData, [name] : value});//setting previous data, and add new word data
  }//handleChangeInput

  //submit new VisualVocabulary to sanity
  // const handleSubmit = () => {
  //   setLoading(true);//loading

  //   alert(formData.imageUrl);
    
  //   const filePath = 'D://Divya//Program//rd-react-projects//englingo//front-end//src//assets';

  //   client.assets
  //   .upload('image', createReadStream(filePath), {
  //     filename: basename(filePath)
  //   })
  //   .then(imageAsset => {
  //     return client
  //       .patch({query: `*[_type == "visualVocabs"]`})
  //       .set({
  //         theImageField: {
  //           _type: 'image',
  //           asset: {
  //             _type: "reference",
  //             _ref: imageAsset._id
  //           }
  //         }
  //       })
  //       .commit()
  //   })
  //   .then(() => {
  //     console.log("Done!");
  //   })

  //   // //adding new visual vocabulary data
  //   // const VisualVocabulary = {
  //   //   _type: 'otherways',//otherways document
  //   //   // imageUrl: urlFor({_ref: reference}).auto('format').url()
  //   //   imageUrl: '',
  //   // };

  //   // //creating a new VisualVocabulary data into sanity
  //   // client.create(VisualVocabulary).then(() =>{
  //   //   setLoading(false);//loading
  //   //   setShowVisualVocabForm(false);//hide VisualVocabulary form after submission of new word
  //   //   setFormData([]);
  //   // }).catch((err) => console.log(err));
  // }//handleSubmit

  //submit new VisualVocabulary to sanity
  const handleSubmit = () => {
    setLoading(true);//loading
alert(formData.imageUrl.split("\\")[2]);
    let image = formData.imageUrl.split("\\")[2];
    //adding new visual vocabulary data
    const VisualVocabulary = {
      _type: 'visualVocabs',//visualvocabs document
      imageUrl : {
        "_type": "image",
        "asset": {
          "_type": "reference",
          "_ref" : `https://cdn.sanity.io/images/12bn7nhe/production/image-${urlFor(image).width(200).url()}`,
          // "_ref" : `https://cdn.sanity.io/images/12bn7nhe/production/G3i4emG6B8JnTmGoN0UjgAp8-300x450.jpg?rect=70,20,120,150&h=200&blur=10`,
          // "_ref": `https://cdn.sanity.io/images/12bn7nhe/production-${image}`,
          
        }
      }
    };

    //creating a new VisualVocabulary data into sanity
    client.create(VisualVocabulary).then(() =>{
      setLoading(false);//loading
      setShowVisualVocabForm(false);//hide VisualVocabulary form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  //delete VisualVocabulary
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "visualVocabs"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!')
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
              <input type="file" name="imageUrl" value={imageUrl} onChange={handleChangeInput} />
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
