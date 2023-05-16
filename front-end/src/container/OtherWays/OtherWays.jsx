import React, {useState, useEffect} from 'react'
import "./OtherWays.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client, urlFor } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import {RiDeleteBack2Fill} from 'react-icons/ri';

const OtherWays = () => {

  const [isShowOtherWaysForm, setShowOtherWaysForm] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl : '',
  });

  const [loading, setLoading] = useState(false);  
  const {imageUrl} = formData;

  const [otherWays, setOtherWays] = useState([]);
  
  //adding new word
  const handleChangeInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setFormData({...formData, [name] : value});//setting previous data, and add new word data
  }//handleChangeInput

  //submit new OtherWays to sanity
  const handleSubmit = () => {
    setLoading(true);//loading
    // const reference = `image-12bn7nhe-${formData.imageUrl.split('\\')[2]}`;
    const reference = urlFor(`image-928ac96d53b0c9049836c86ff25fd3c009039a16-${formData.imageUrl.split('\\')[2]}`)
    .auto('format')
    .fit('max')
    .width(720)
    .toString();
    
    alert(reference);
    //adding new OtherWays data
    const OtherWays = {
      _type: 'otherways',//otherways document
      // imageUrl: formData.imageUrl.split('\\')[2],
      // imageUrl: urlFor({_ref: formData.imageUrl.split('\\')[2]}).url()
      imageUrl: urlFor({_ref: reference}).auto('format').url()
    };

    //creating a new OtherWays data into sanity
    client.create(OtherWays).then(() =>{
      setLoading(false);//loading
      setShowOtherWaysForm(false);//hide OtherWays form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  //delete OtherWays
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "otherways"][${index}]`})
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
    const query = `*[_type == "otherways"]`;

    client.fetch(query).then((data) => {
      setOtherWays(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Other Ways 
        {
          //show OtherWays form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowOtherWaysForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice synonyms.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/* Add new OtherWays starts here */}
      {
        isShowOtherWaysForm ? (
          <div className='app__synonym-form app__flex'>
            <div className='app__flex'>
              <h3>Add</h3>
            </div>
            <div className='app__flex'>
              <input type="file" name="imageUrl" value={imageUrl} onChange={handleChangeInput} />
            </div>
            
            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/* Add new OtherWays ends here */}
      
      {/* displaying synonyms items starts here */}
      <div className='app__synonym-items'>
          {/* OtherWays item card */}
          {
            otherWays.map((otherWay, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__synonym-item'
              key={index}
              > 
                <h4>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, otherWays._id)}/>
                  &nbsp;&nbsp;
                </h4>
                <img src={urlFor(otherWay.imageUrl)}/>
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
export default AppWrap(MotionWrap(OtherWays, 'app__synonyms'), //component 
"OtherWays", //idName
"app__whitebg" //className for bg color
); 
