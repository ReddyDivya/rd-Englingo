import React from 'react';
import {Vocabulary, Idioms, Sentences, Grammar, Footer, InsteadOfVery, Synonyms, AdvancedPhrases, VisualVocabulary} from './container';
import {Navbar} from './components';
import "./App.scss";

const App = () => {
  return (
    <div className="app">
        <Navbar/>
        <Vocabulary/>
        <Synonyms/>
        <Sentences/>
        <Idioms/>
        <InsteadOfVery/>
        <AdvancedPhrases/>
        <Grammar/>
        <VisualVocabulary/>
        <Footer/>
    </div>
  )
}

export default App