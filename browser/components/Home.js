import React, { PropTypes, Component } from 'react'
import SpeechRecognition from 'react-speech-recognition';
import Speak from './Speak';


const Home = (props) => {

  return (
    <div className="container mt-3">
      <Speak />
    </div>    
  )  
}

export default Home;