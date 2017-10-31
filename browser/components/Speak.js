import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import SpeechRecognition from 'react-speech-recognition';
import { connect } from 'react-redux';
import { postTranscript } from '../store';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  stopListening: PropTypes.func,
  finalTranscript: PropTypes.string
}

class Dictaphone extends Component {
  constructor(props){
    super(props)
    this.stopRecordingAndSaveText = this.stopRecordingAndSaveText.bind(this);
  }

  stopRecordingAndSaveText(){
    this.props.stopListening;
    this.props.handleAdd({ text: this.props.transcript });
  }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, stopListening, finalTranscript, words } = this.props;
    const wordsSpoken = transcript.split(' ');
    const iconStyle = { fontSize: "36px", marginTop: "28%" }
    const btnStyle = { 
      backgroundColor: "transparent", 
      border: "1px black solid", 
      fontFamily: "'Cabin Sketch', cursive", 
      color: "#000",
      borderRadius: 0,
      cursor: "pointer",
      width: "auto"
    }

    const positiveWords = words.filter(word => {
      return word.category === "positive";
    }).map(word => {
      return word.word
    });

    const negativeWords = words.filter(word => {
      return word.category === "negative";
    }).map(word => {
      return word.word
    });
    
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
            <button className="btn btn-info m-3" style={ btnStyle } onClick={ resetTranscript }>Reset</button>
            <Link className="btn btn-info m-3" style={ btnStyle } onClick={ this.stopRecordingAndSaveText } to="/analyze">Analyze</Link>               
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
              return (
                (negativeWords.indexOf(word) >= 0) ? <span className="badge badge-pill badge-danger m-1 p-3">{ word }</span> : 
                (positiveWords.indexOf(word) >= 0) ? <span className="badge badge-pill badge-success m-1 p-3">{ word }</span> : ""
              )
            })            
          }
          </div>
        </div>
      </div>

    )
  }
}

Dictaphone.propTypes = propTypes
// export default SpeechRecognition(Dictaphone);

const mapStateToProps = ({ words }) => {
  return {
    words
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: (transcript) => {
      dispatch(postTranscript(transcript))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeechRecognition(Dictaphone));
