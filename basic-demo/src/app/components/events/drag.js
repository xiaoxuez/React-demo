import React from 'react';
import * as BasicUtils from '../../../utils/basic';
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragged: [],
    }
  }

  handleDragStart(ev) {
    ev.dataTransfer.setData('type', 'test');
  }

  handleDrop(ev) {
    let type = ev.dataTransfer.getData('type');
    if (type === 'test') {
      let dragged = this.state.dragged.concat();
      let uuid = BasicUtils.uuid(8, 16);
      dragged.push(<TestModule key={uuid}/>);
      this.setState({
        dragged: dragged,
      })
    }
  }

  handleDragEnter() {
  }

  handleDragOver(ev) {
    ev.preventDefault();
  }



  render() {
    return (
      <div>
        <div>
          <div className='draggable-one'
            draggable="true"
            onDragStart={this.handleDragStart} />
        </div>
        <div className='drag-acceptable'
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop.bind(this)}>
          {this.state.dragged}
        </div>
      </div>
    )
  }
}

class TestModule extends React.Component {
  render() {
    return (
      <div className='draggable-one' />
    )
  }
}