import React, { PropTypes, Component } from 'react'
import SpeechRecognition from 'react-speech-recognition';
import negativeWords from './negativeWordList.json';
import positiveWords from './positiveWordList.json';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Dictaphone extends Component {
  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props
    const wordsSpoken = transcript.split(' ');
    const iconStyle = { fontSize: "36px", marginTop: "28%" }
    const btnStyle = { 
      backgroundColor: "transparent", 
      border: "1px black solid", 
      fontFamily: "'Cabin Sketch', cursive", 
      color: "#000",
      borderRadius: 0,
      cursor: "pointer",
      width: "20%"
    }

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div className="container pb-5">
        <div className="row mb-5">

          <div className="col-md-2 ml-auto mt-3">
            <div className="circle">
              <span className="fa fa-microphone text-white" aria-hidden="true" style={ iconStyle } ></span>
            </div>
          </div>
            
          <div className="col-md-6 mr-auto mt-3">
            <h1>Say something...</h1>
            <p>Speak to me and I will show you what <span className="badge badge-pill badge-success">positive</span> or  
            <span className="badge badge-pill badge-danger">negative</span> words you are saying.</p>  
            <button className="btn btn-info mt-3" style={ btnStyle } onClick={ resetTranscript }>Reset</button>
                           
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6 mt-3">
            <span>{ transcript }</span>
          </div>

          <div className="col-md-6 mt-3">
          {
            wordsSpoken && wordsSpoken.map(word => {
              for(let i=0; i<negativeWords.length; i++){
                if(word === negativeWords[i]){
                  return (                                      
                    <span className="badge badge-pill badge-danger m-1 p-3">{ word }</span>
                  )
                } 

                for(let j=0; j<positiveWords.length; j++){
                  if(word === positiveWords[j]){
                    return (
                      <span className="badge badge-pill badge-success m-1 p-3">{ word }</span>
                    )
                  }
                }
              }
            })
          }
          </div>
        </div>
      </div>

    )
  }
}

Dictaphone.propTypes = propTypes

export default SpeechRecognition(Dictaphone);



