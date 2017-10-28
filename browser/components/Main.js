import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import WordList from './WordList';

export default class Main extends Component {
  render(){
    return (
      <div className='container'>
        <main>
          <Navbar />
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/word_list' component={ WordList } />
          </Switch>
        </main>

        <nav className="navbar navbar-toggleable-md navbar-inverse fixed-bottom bg-inverse">
          <footer className="text-white">
          <span className="fa fa-copyright" aria-hidden="true"></span>2017
            made with <span className="fa fa-heart" aria-hidden="true"></span> by <a href="www.github.com/kaz-a">kaz-a</a> 
          </footer>
        </nav>
      </div>
    )

  }

}
