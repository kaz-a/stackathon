import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger'; 
import thunkMiddleware from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'

// Initial state
const initialState = {
  words: [],
  newWord: {}
}

// Action types
const GET_WORDS = "GET_WORDS"

export const getWords = (words) => {
  return { type: GET_WORDS, words }
}

// Thunks
export const fetchWords = () => {
  return function thunk (dispatch) {
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


// Reducers
const rootReducer = (state=initialState, action) => {
  switch(action.type){
    case GET_WORDS:
      return Object.assign({}, state, { words: action.words })

    default:
      return state;
    }
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()));





