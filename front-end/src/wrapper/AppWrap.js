import React from 'react';
import { NavigationDots, SocialMedia } from '../components';

const AppWrap = (Component, idName, className) => function HOC(){
  return (
    <div id={idName} className={`app__container ${className}`}>
        <SocialMedia/>

        <div className='app__wrapper app__flex'>
            <Component/> {/*displaying components like vocab, idoms*/}
        </div>

        {/* to change the navigation dot color when the section is active like vocab, idioms */}
        <NavigationDots active={idName}/>
    </div>
  )
}

export default AppWrap