import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger'; 
import thunkMiddleware from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'

// Initial state
const initialState = {
  words: [],
  newWord: {},
  texts: []
}

// Action types
const GET_WORDS = "GET_WORDS",
  GET_TRANSCRIPTS = "GET_TRANSCRIPTS";

export const getWords = (words) => {
  return { type: GET_WORDS, words }
}

export const getTranscripts = (texts) => {
  return { type: GET_TRANSCRIPTS, texts }
}

// Thunks
export const fetchWords = () => {
  return (dispatch) => {
    return axios.get('/api')
      .then(res => res.data)
      .then(words => {
        dispatch(getWords(words));
      });
  }
}

export const addNewWord = (newWord) => {
  return (dispatch) => {
    axios.post('/api', newWord)
      .then(() =>{
        dispatch(fetchWords())
      })
      .catch(console.log);
  }
}

export const fetchTranscripts = () => {
  return (dispatch) => {
    axios.get('/api/transcripts')
      .then(res => res.data)
      .then(transcripts => {
        dispatch(getTranscripts(transcripts))
      })
      .catch(console.log);
  }
}

export const postTranscript = (newTranscript) => {
  return (dispatch) => {
    axios.post('/api/transcripts', newTranscript)
      .then(() => {
        dispatch(fetchTranscripts())
      })
      .catch(console.log);
  }
}


// Reducers
const rootReducer = (state=initialState, action) => {
  switch(action.type){
    case GET_WORDS:
      return Object.assign({}, state, { words: action.words })

    case GET_TRANSCRIPTS:
      return Object.assign({}, state, { texts: action.texts})

    default:
      return state;
    }
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()));





