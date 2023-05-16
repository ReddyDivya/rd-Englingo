import React, {useState, useEffect} from 'react'
import "./Advance.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import {RiDeleteBack2Fill} from 'react-icons/ri';

const Advance = () => {

  const [isShowAdvanceForm, setShowAdvanceForm] = useState(false);
  const [formData, setFormData] = useState({
    normalPhrase : '',
    advancePhrase : '',
  });

  const [loading, setLoading] = useState(false);  
  const {normalPhrase, advancePhrase} = formData;

  const [advance, setAdvance] = useState([]);
  
  //adding new advance phrase
  const handleChangeInput = (e) => {
 
    const {name, value} = e.target;//assigning form fields data like word, meaning, sentence
    setFormData({...formData, [name] : value});//setting previous data, and add new word data
  }//handleChangeInput

  //submit new advance phrase to sanity
  const handleSubmit = () => {
    setLoading(true);//loading

    //adding new advance data
    const advance = {
      _type: 'advance',//advance document
      normalPhrase: formData.normalPhrase,
      advancePhrase: formData.advancePhrase,
    };

    //creating a new advance data into sanity
    client.create(advance).then(() =>{
      setLoading(false);//loading
      setShowAdvanceForm(false);//hide advance form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

  //delete advance
  const handleDelete = (index, _id) => {
    client.delete({query: `*[_type == "advance"][${index}]`})
    .then(() => {
      toast.success('Successfully deleted!')
      console.log('Deleted');
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
  }//handleDelete


  //fetching advance phrases data from sanity
  useEffect(() => {
    const query = `*[_type == "advance"]`;

    client.fetch(query).then((data) => {
      setAdvance(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Normal vs Advances Phrases
        {
          //show advance form after clicking on the add icon +
        }
          <AiFillPlusCircle onClick={() => setShowAdvanceForm(true)}/>
      </h2>
      <p className='p-text'>In this section you can do practice advanced phrases.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>

      {/* Add new advance starts here */}
      {
        isShowAdvanceForm ? (
          <div className='app__advance-form app__flex'>
            <div className='app__flex'>
              <h3>Add Advance Phrases</h3>
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a normal phrase" name="normalPhrase" value={normalPhrase} onChange={handleChangeInput} />
            </div>
            <div className='app__flex'>
              <input className="p-text" type="text" placeholder="Please, enter a advance phrase" name="advancePhrase" value={advancePhrase} onChange={handleChangeInput} />
            </div>

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Advance' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }
      {/* Add new advance ends here */}
      
      {/* displaying advance phrases items starts here */}
      <div className='app__advance-items'>
          {/* advance item card */}
          {
            advance.map((advance, index) => (
              <motion.div whileInView={{opacity:1}}
              whileHover={{ scale: 1.1 }}
              transition= {{ duration: 0.5, type : 'tween'}}
              className='app__advance-item'
              key={advance.title + index}
              > 
                <h4>
                  <RiDeleteBack2Fill onClick={() => handleDelete(index, advance._id)}/>
                  &nbsp;&nbsp;
                  {advance.normalPhrase} : {advance.advancePhrase}
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
      {/* displaying advance phrases items ends here */}
    </>
  )
}

//AppWrap - Component, idName, className(parameters)
//MotionWrap - Component, className(parameters)
export default AppWrap(MotionWrap(Advance, 'app__advance'), //component 
"advance", //idName
"app__whitebg" //className for bg color
); 
