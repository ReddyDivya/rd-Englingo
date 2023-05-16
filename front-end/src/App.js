import React from 'react';
import {Vocabulary, Idioms, Sentences, Grammar, Footer, InsteadOfVery, Synonyms, AdvancedPhrases, OtherWays} from './container';
import {Navbar} from './components';
import "./App.scss";

const App = () => {
  return (
    <div className="app">
        <Navbar/>
        <Vocabulary/>
        <InsteadOfVery/>
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