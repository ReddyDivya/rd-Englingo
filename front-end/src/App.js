import React from 'react';
import {Vocab, Idioms, Sentences, Grammar, Footer, Very} from './container';
import {Navbar} from './components';
import "./App.scss";

const App = () => {
  return (
    <div className="app">
        <Navbar/>
        <Vocab/>
        <Very/>
        <Idioms/>
        <Sentences/>
        <Grammar/>
        <Footer/>
    </div>
  )
}

export default App