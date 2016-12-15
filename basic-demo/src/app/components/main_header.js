import React from 'react';
var Link = require('react-router').Link;

var MainNav = require('./main_nav');

var MainHeader = React.createClass({
  render: function () {
    return (
      <header>
        <div className='main-header'>
          <MainNav />
        </div>
      </header>
    );
  }
});

module.exports = MainHeader;
