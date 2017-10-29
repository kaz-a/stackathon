import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
const navbarStyle = { padding: "24px", width: "100%" };

const Navbar = (props) => {
  return (    
    <nav className="navbar navbar-toggleable-md navbar-light">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <Link className="navbar-brand" to="/"><span className="fa fa-microphone" aria-hidden="true"></span>&nbsp;&nbsp;Speeek</Link>
      
      <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/words" className="nav-link">Word List</Link>
          </li>
        </ul>
      </div>
    </nav>
  
  )
}

export default Navbar;

