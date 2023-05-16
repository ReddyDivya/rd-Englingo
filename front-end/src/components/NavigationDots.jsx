import React from 'react'

//active - current visible section like 'vocab'
const NavigationDots = ({active}) => {
  return (
    <div className='app__navigation'>
      {
        ['vocabulary', 'idioms', 'sentences', 'very', 'synonyms', 'advanced-Phrases', 'grammar', 'visual-vocabulary'].map((item, index) => (
          <a href={`#${item.replaceAll('-','')}`}
             key = {item+index}
             className='app__navigation-dot'
             style={active === item ? {backgroundColor : '#313BAC'} : {}}
          />
        ))
      }
    </div>
  )
}

export default NavigationDots