import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import * as THREE from 'three';
import React3 from 'react-three-renderer';

import Editable from './editable_three';
import './editable.css';
import * as ModelFactory from './models_factory';
import HandlerSignal from './signals';

var ModelType = {
  rect: ModelFactory.RectModel,
  cylinder: ModelFactory.CylinderModel,
  cone: ModelFactory.ConeModel,
}

var InputType = {
  name: 'name',
  positionX: 'positionX',
  positionY: 'positionY',
  positionZ: 'positionZ',
}

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allModels: [],
      selected: null,
    }
    this.allModels = [];
  }

  componentWillMount() {
    HandlerSignal.selectModel.add(this.selecteModel);
    HandlerSignal.changePosition.add(this.changePosition);
    HandlerSignal.changePositionEnd.add(this.changePositionEnd);
  }

  componentWillUnmount() {
    HandlerSignal.selectModel.remove(this.selecteModel);
    HandlerSignal.changePosition.remove(this.changePosition);
    HandlerSignal.changePositionEnd.remove(this.changePositionEnd);
  }


  addModel(model) {
    this.allModels.push(model);
    this.setState({
      allModels: this.allModels.concat(),
    })
  }

  deleteModel() {
    if (this.selectedIndex !== -1) {
      console.log(this.allModels);
      this.allModels.splice(this.selectedIndex, 1);
      this.setState({
        allModels: this.allModels.concat(),
      });
      HandlerSignal.deleteModel.dispatch();
    }
  }

  selecteModel = (model, index) => {
    //存在model=null, index=-1的情况 ，代表点击了视角 所以没有选中
    if (model !== null) {
      this.setState({
        selected: {
          name: model.name,
          position: this.allModels[index].position,
        },
      })
    } else {
      this.setState({
        selected: null,
      })
    }
    this.selectedIndex = index;
  }

  changePosition = (position) => {
    if (this.state.selected && this.state.selected.position !== position) {
      let stateSelected = Object.assign({}, this.state.selected, {position: position});
      // this.allModels[this.selectedIndex] = Object.assign({}, this.allModels[this.selectedIndex], {position: position});
      this.setState({
        selected: stateSelected,
      })
    }
  }

  changePositionEnd = () => {
    if (this.state.selected !== null && this.selectedIndex !== -1) {
      this.allModels[this.selectedIndex] = Object.assign({}, this.allModels[this.selectedIndex], this.state.selected);
      this.setState({
        allModels: this.allModels.concat(),
      })
    }
  }

  handleChange = (e, flag) => {
    switch (flag) {
      case InputType.name:
        if (this.state.selected && this.state.selected.name !== e.target.value) {
          let stateSelected = Object.assign({}, this.state.selected, {name: e.target.value});
          this.setState({
            selected: stateSelected,
          });
          this.allModels[this.selectedIndex] = Object.assign({}, this.allModels[this.selectedIndex], {name: e.target.value});
          this.setState({
            allModels: this.allModels.concat(),
          })
        }
        break;
      case InputType.positionX:
        this.inputChangePosition({x: e.target.value});
        break;
      case InputType.positionY:
        this.inputChangePosition({y: e.target.value});
        break;
      case InputType.positionZ:
        this.inputChangePosition({z: e.target.value});
        break;
      default:
    }
  }

  inputChangePosition(value) {
    let position = Object.assign({}, this.state.selected.position, value);
    this.changePosition(position);
    this.allModels[this.selectedIndex] = Object.assign({}, this.allModels[this.selectedIndex], {position: position});
    this.setState({
      allModels: this.allModels.concat(),
    })
  }

  onMouseEnterInput = () => {
    HandlerSignal.enableAllTouchable.dispatch(false);
  }
  onMouseLeaveInput = () => {
    HandlerSignal.enableAllTouchable.dispatch(true);
  }

  render() {
    return (
      <div>
        <div className='moduls'>
          <div className='option'>
            <ul>
              <li onClick={() => this.addModel(ModelType.rect())}></li>
              <li onClick={() => this.addModel(ModelType.cylinder())}></li>
              <li onClick={() => this.addModel(ModelType.cone())}></li>
            </ul>
          </div>
          <Editable height={window.innerHeight} width={window.innerWidth - 40} allModels={this.state.allModels}/>
        </div>
        {this.state.selected ? <div className='specific'>
          <div onMouseEnter={this.onMouseEnterInput}
            onMouseLeave={this.onMouseLeaveInput}>
            <div className='delete-button' onClick={this.deleteModel.bind(this)}>删除</div>
            <div>name: <input type="text" value={this.state.selected.name} onChange={(e) => this.handleChange(e, InputType.name)} /></div>
            <div>x: <input type="number" value={this.state.selected.position.x} onChange={(e) => this.handleChange(e, InputType.positionX)} /></div>
            <div>y: <input type="number" value={this.state.selected.position.y} onChange={(e) => this.handleChange(e, InputType.positionY)} /></div>
            <div>z: <input type="number" value={this.state.selected.position.z} onChange={(e) => this.handleChange(e, InputType.positionZ)} /></div>
          </div>
        </div> : null}
      </div>
    )
  }
}
