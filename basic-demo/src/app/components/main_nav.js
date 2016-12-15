import React from 'react';
// var Link = require('react-router').Link;
import {Link, IndexLink} from 'react-router';
const ACTIVE = { color: 'green' };
import '../css/main_nav.css';
var MainNav = React.createClass({
  render: function () {
    return (
      <nav className='main-nav' role='navigation'>
        <ul className='clearfloat'>
          <li><IndexLink to="/"  activeStyle={ACTIVE}>All</IndexLink></li>
          <li><Link to="/event"  activeStyle={ACTIVE}>Event</Link></li>
          <li><Link to="/girls"  activeStyle={ACTIVE}>Girls</Link></li>
          <li><Link to="/add"  activeStyle={ACTIVE}>Add</Link></li>
        </ul>
      </nav>
    );
  }
});

module.exports = MainNav;
