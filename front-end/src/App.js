import React from 'react';
import {Vocabulary, Idioms, Sentences, Grammar, Footer, Very, Synonyms, AdvancedPhrases, OtherWays} from './container';
import {Navbar} from './components';
import "./App.scss";

const App = () => {
  return (
    <div className="app">
        <Navbar/>
        <Vocabulary/>
        <Very/>
        <Synonyms/>
        <AdvancedPhrases/>
        <OtherWays/>
        <Idioms/>
        <Sentences/>
        <Grammar/>
        <Footer/>
    </div>
  )
}

export default App