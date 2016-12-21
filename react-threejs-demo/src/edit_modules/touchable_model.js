import React from 'react';
import React3 from 'react-three-renderer';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import * as THREE from 'three';
import HandlerSignal from './signals';

const dragPlane = new THREE.Plane();
const backVector = new THREE.Vector3(0, 0, -1);

export default class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      model: props.model,
      hoverHight: false,
      selected: false,
    }
    this.newModel = false;
  }

  static propTypes = {
    onCreate: React.PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.model !== this.props.model) {
      this.newModel = true;
      this.setState({
        model: nextProps.model,
      })
    }
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  componentDidUpdate() {
    console.log(' componentDidUpdate ');
    if (this.newModel === true && this.modelDom) {
      this.props.onCreate(this.modelDom);
      this.newModel = false;
    }
  }

  transferVector3(x, y, z) {
    return new THREE.Vector3(x, y, z);
  }

  _onMouseDown(event, intersection) {
    //一次点击可能并不会触发一个东西、需要对数据进行健全是否可点击
    console.log('down');
    const {index, setChoiceItem, model} = this.props;
    HandlerSignal.selectModel.dispatch(this.modelDom, index);
      event.preventDefault();
      event.stopPropagation();

      const {
        position,
      } = this.state.model;

      const {
        camera,
      } = this.props;

      dragPlane.setFromNormalAndCoplanarPoint(backVector.clone()
        .applyQuaternion(camera.quaternion), intersection.point);

      this._offset = intersection.point.clone().sub(position);

      document.addEventListener('mouseup', this._onDocumentMouseUp);
      document.addEventListener('mousemove', this._onDocumentMouseMove);
  }



  _onDocumentMouseUp = (event) =>  {
    event.preventDefault();
    document.removeEventListener('mouseup', this._onDocumentMouseUp);
    document.removeEventListener('mousemove', this._onDocumentMouseMove);
    HandlerSignal.changePositionEnd.dispatch();
  }

  _onDocumentMouseMove = (event) =>  {
      console.log('down');
    event.preventDefault();
    const {
      mouseInput,
    } = this.props;

    const ray:THREE.Ray = mouseInput.getCameraRay(new THREE
      .Vector2(event.clientX, event.clientY));

    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone()
        .add(ray.direction.clone().multiplyScalar(10000))
    ));
    if (intersection) {
      let offset = intersection.sub(this._offset);
      this.setState({
        model: Object.assign({}, this.state.model, {position: offset}),
      });
      HandlerSignal.changePosition.dispatch(offset);
    }
  }

  selecteModel = (refs, index) => {
    if (this.modelDom && index !== -1 && refs === this.modelDom) {
      this.setState({
        selected: true,
      })
    } else if (this.state.selected == true){
      this.setState({
        selected: false,
      })
    }
  }

  removeModel = () => {
    this.setState({
      selected: false,
    })
  }

  componentDidMount() {
    console.log(' componentDidMount ');
    HandlerSignal.selectModel.add(this.selecteModel);
    HandlerSignal.deleteModel.add(this.removeModel);
    this.modelDom && this.props.onCreate(this.modelDom);
  }

  componentWillUnmount() {
    HandlerSignal.selectModel.remove(this.selecteModel);
    HandlerSignal.deleteModel.remove(this.removeModel);
    document.removeEventListener('mouseup', this._onDocumentMouseUp.bind(this));
  }

  _onMouseEnter() {
    console.log(this.state.model.position);
    this.setState({
      hoverHight: true,
    })
  }

  _onMouseLeave() {
    this.setState({
      hoverHight: false,
    })
  }

  render() {
    const {model} = this.state;
    let self = this;
    return(
      <group position={model.position}>
          <mesh
            ref={(mesh) => self.modelDom = mesh}
            onMouseDown={this._onMouseDown.bind(this)}
            onMouseEnter={this._onMouseEnter.bind(this)}
            onMouseLeave={this._onMouseLeave.bind(this)}
            castShadow
            receiveShadow
            name={model.name}
            >
            {model.geometry}
            <meshLambertMaterial
              color={model.color} />
          </mesh>
          {this.state.hoverHight || this.state.selected ? <mesh
            ignorePointerEvents
          >
            {model.geometry}
            <materialResource
              resourceId="highlightMaterial"
            />
          </mesh> : null}
      </group>
    )
  }
}
