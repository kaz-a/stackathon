import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import negativeWords from './negativeWordList.json';
import positiveWords from './positiveWordList.json';


export default class WordList extends Component {
  constructor(){
    super();
    this.state = {
      newNegativeWord: "",
      newPositiveWord: "",
      negativeWords: negativeWords,
      positiveWords: positiveWords
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event){
    console.log(event.target.name, event.target.value); 

    // const positiveWordsCopy = positiveWords.slice();
    // const negativeWordsCopy = negativeWords.slice();

    // if(event.target.name.category === "positive") {      
    //   positiveWordsCopy.push(event.target.value.word);
    //   this.setState({ positiveWords: positiveWordsCopy });
    // } else {
    //   negativeWordsCopy.push(event.target.value.word);
    //   this.setState({ negativeWords: negativeWordsCopy });
    // }

    event.target.name.category === "positive" ? 
      this.setState({ newPositiveWord: event.target.value.word }) :
      this.setState({ newNegativeWord: event.target.value.word });  
  }

  handleClick(){
    console.log("firing handleClick", this.state.newPositiveWord); 
    // const jsonfile = require('jsonfile')
    // override external json files with this.state.positiveWords/negativeWords
    // const override = require('json-override');
    // override(positiveWords, this.state.newPositiveWord);
    // override(negativeWords, this.state.newNegativeWord);

    jsonfile.writeFile(positiveWords, this.state.positiveWords, function (err) {
      console.error(err)
    })

    // jsonfile.writeFileSync(positiveWords, this.state.positiveWords, {flag: 'a'})

    this.refs.word.value = "";
  }

  render(){
    const wordOptions = [{ val: "positive" }, { val: "negative" }];
    const positiveWordStyle = { color: "#5cb85c" }, negativeWordStyle = { color: "#d9534f" };
    const btnStyle = { 
      backgroundColor: "transparent", 
      border: "1px black solid", 
      fontFamily: "'Cabin Sketch', cursive", 
      color: "#000",
      borderRadius: 0,
      cursor: "pointer",
      width: "100%"
    }
    const fontStyle = { fontFamily: "'Cabin Sketch', cursive" };

    return (
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-4">
            <h1>Word List</h1>
            <form>
              <div className="form-group">
                <input name="word" type="text" ref="word" onChange={ this.handleChange } 
                  className="form-control" placeholder="Please enter new word" style={ fontStyle } />
              </div>
              <select name="category" className="form-control" style={ fontStyle } onChange={ this.handleChange }>
                <option>Select word category</option>
                {
                  wordOptions.map(wordOption => {
                    return (
                      <option key={ wordOption.val }>{ wordOption.val }</option>
                    )
                  })
                }
              </select>
              <Link to="/word_list" className="btn btn-info mt-3" onClick={ this.handleClick } style={ btnStyle }>Add new word</Link>
            </form>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <h3 style={ positiveWordStyle }>Positive Words</h3>
                {
                  positiveWords && positiveWords.map(word => {
                    return (
                      <span key={ word }>{ word } </span>
                    )
                  })
                }
              </div>

              <div className="col-md-6">            
                <h3 style={ negativeWordStyle }>Negative Words</h3>
                {
                  negativeWords && negativeWords.map(word => {
                    return (
                      <span key={ word }>{ word } </span>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>        
      </div>
      
    )
  }

}