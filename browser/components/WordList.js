import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewWord } from '../store';

class WordList extends Component {
  constructor(props){
    super(props);
    this.state = {
      word: "",
      category: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event){
    const key = event.target.name, val = event.target.value;
    key === "word" ? this.setState({ word: val }) : 
    this.setState({ category: val })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleAdd(this.state);
  }

  handleClick(){
    this.refs.word.value = "";
    this.refs.category.value = "";
  }

  render(){
    const { words, handleAdd } = this.props;
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

    const positiveWords = words.filter(word => {
      return word.category === "positive";
    });

    const negativeWords = words.filter(word => {
      return word.category === "negative";
    });


    return (
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-4">
            <h1>Word List</h1>
            <form onSubmit={ this.handleSubmit }>
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
              <button className="btn btn-info mt-3" onClick={ this.handleClick } style={ btnStyle }>Add new word</button>
            </form>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <h3 style={ positiveWordStyle }>Positive Words</h3>
                {
                  positiveWords && positiveWords.map(word => {
                    return (
                      <span key={ word.id }>{ word.word } </span>
                    )
                  })
                }
              </div>

              <div className="col-md-6">            
                <h3 style={ negativeWordStyle }>Negative Words</h3>
                {
                  negativeWords && negativeWords.map(word => {
                    return (
                      <span key={ word.id }>{ word.word } </span>
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


const mapStateToProps = ({ words }) => {
  return {
    words
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: (word) => {
      dispatch(addNewWord(word))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordList);




