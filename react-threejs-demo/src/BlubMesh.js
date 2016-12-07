import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

var COLOR_ON =  0x00FF00;
var COLOR_OFF =  0xFFFF00;
var COLOR = {
  R: {
    on: 0x00FF00,
    off: 0xFFFF00,
  },
  L: {
    on: 0xFFFF00,
    off: 0xE8E8E8,
  },
  C: {
    on: 0x00FF00,
    off: 0xFFFF00,
  }
}
export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: COLOR[props.info.type].on,
    }
  }

  static propTypes = {
    onCreate: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    x: 0,
    y: 0,
    z: 0,
    info: {identifier: -1, type: 'R'},
  }


  transferVector3(x, y, z) {
    return new THREE.Vector3(x, y, z);
  }

  _onMouseDown() {
    const {info} = this.props;
    let color = this.state.color === COLOR[info.type].on ? COLOR[info.type].off : COLOR[info.type].on;
    this.setState({
      color: color,
    })

  }

  componentDidMount() {
    this.props.onCreate(this.mesh);
  }

  render() {
    const {x, y, z, info} = this.props;
    let geometry = function () {
      switch (info.type) {
        case 'R': //rect 方形灯
          return (
            <boxGeometry
              width={2}
              height={0.5}
              depth={2} />
          )
          break;
        case 'L':  //吊灯
          return(
            <cylinderGeometry
              radiusTop={0.5}
              radiusBottom={2}
              height={2}
              radialSegments={0}
              heightSegments={1} />
          )
          break;
        case 'C':  //圆柱形
          return(
            <cylinderGeometry
              radiusTop={1}
              radiusBottom={1}
              height={0.5}
              radialSegments={18}
              heightSegments={3}/>
          )
          break;
        default:
          return (
              <boxGeometry
                  width={2}
                  height={0.5}
                  depth={2} />
          )
      }
    }
    return(
        <mesh position={this.transferVector3(x, y, z)}
              castShadow
              receiveShadow
              ref={(mesh) => this.mesh = mesh}
              onMouseDown={this._onMouseDown.bind(this)}
              visible={true}
             >
          {geometry()}
          <meshBasicMaterial
              color={this.state.color}
          />
        </mesh>
    )
  }
}