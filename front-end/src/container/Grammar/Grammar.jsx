import React, {useState, useEffect} from 'react';
import "./Grammar.scss";
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
import { client, urlFor } from '../../client.js';
import {AiFillPlusCircle} from 'react-icons/ai';
import {RiDeleteBack2Fill} from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';

const Grammar = () => {
  
  const [isShowGrammarForm, setShowGrammarForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grammar, setIdioms] = useState([]);

  const [formData, setFormData] = useState({
    heading : '',
    notes : '',
    imageUrl : '',
  });
  const {heading, notes, imageUrl} = formData;

  //adding new grammar
  const handleChangeInput = (e) => {
      const {name, value} = e.target; //assigning form fields data like grammar, meaning, sentence
      setFormData({...formData, [name] : value}); //setting previous data, and add new word data
  }//handleChangeInput

  //submit new grammar to sanity
  const handleSubmit = () => {
    setLoading(true);//loading

    //adding new grammar data
    const grammar = {
      _type : 'grammar', //grammar document
      heading : formData.heading,
      notes : formData.notes,
      // imageUrl : formData.imageUrl, 
    }

    //creating a new grammar data into sanity
    client.create(grammar).then(() =>{
      setLoading(false);//loading
      setShowGrammarForm(false);//hide grammar form after submission of new word
      setFormData([]);
    }).catch((err) => console.log(err));
  }//handleSubmit

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
      setIdioms(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Grammar
      {
          //show grammar form after clicking on the add icon +
          <AiFillPlusCircle onClick={() => setShowGrammarForm(true)}/>
      }
      </h2>

      <p className='p-text'>In this section you can do practice grammar.</p>
      <p className='p-text'>Read as much as possible. If you come across a word you don't know, add it down or look it up.</p>
      
      {/* Add new grammar starts here */}
      {
        isShowGrammarForm ? (
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

            <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Add Grammar Notes' : 'Sending...'}</button>
          </div>
        )
        :
        (
          <div>
            
          </div>
        )
      }

      {/* Add new grammar ends here */}

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
"app__primarybg" //className for bg color
); 