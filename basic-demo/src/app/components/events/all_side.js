import React from 'react';
import {Link, IndexLink} from 'react-router';
export default class extends React.Component {
  render() {
    return (
      <div className='all-side' style={{height: window.innerHeight}}>
        <ul>
          <li><IndexLink to="/event">Drag</IndexLink></li>
        </ul>
      </div>
    )
  }
}
