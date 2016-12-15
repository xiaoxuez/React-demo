import React from 'react';
import AllSide from './events/all_side';
export default class extends React.Component {
  render() {
    return (
      <div className='event-body'>
        <AllSide />
        <div className='event-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
