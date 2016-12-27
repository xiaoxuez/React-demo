import React from 'react';
import {Link, IndexLink} from 'react-router';
export default class extends React.Component {
  render() {
    return (
      <div className='all-side' style={{height: window.innerHeight - 44}}>
        <ul>
          <li><IndexLink to="/event">Drag</IndexLink></li>
          <li><Link to="/event/css-pseudo">CssPseudo</Link></li>
        </ul>
      </div>
    )
  }
}
