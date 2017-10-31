import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchWords, fetchTranscripts } from '../store';

import Navbar from './Navbar';
import Home from './Home';
import WordList from './WordList';
import Chart from './Chart';

class Main extends Component {
  constructor(){
    super()
  }

  componentDidMount(){
    this.props.getWords();
    this.props.getTranscripts();
  }

  render(){
    return (
      <div className='container'>
        <main>
          <Navbar />
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/words' component={ WordList } />
            <Route exact path='/analyze' component={ Chart } />
          </Switch>
        </main>

        <nav className="navbar navbar-toggleable-md navbar-inverse bg-info fixed-bottom">
          <footer className="text-white">
          <span className="fa fa-copyright" aria-hidden="true"></span>2017
            Made with <span className="fa fa-heart" aria-hidden="true"></span> by <a href="https://github.com/kaz-a/stackathon">kaz-a</a> 
          </footer>
        </nav>
      </div>
    )
  }
}


const mapStateToProps = ({ words, texts }) => {
  return {
    words, 
    texts
  }
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    getWords: () => {
      dispatch(fetchWords());
    },
    getTranscripts: () => {
      dispatch(fetchTranscripts());
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

