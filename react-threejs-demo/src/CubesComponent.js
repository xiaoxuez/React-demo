import React from 'react';
import * as CubeData from './DataModule';
import Blubs from './BlubMesh';

var P_X = - 100;
var P_Y = 12;
var P_Z = 12;

export default class Cubes extends React.Component {

  componentWillMount() {
    let length =  CubeData.rectBulb.length;
    console.log(length);
    const cubes = [];
    cubes.length = length;
    this.cubes = cubes;
    this.index = -1;
  }

  componentDidMount() {
    const {
        onCubesMounted,
    } = this.props;

    onCubesMounted(this.cubes);
  }

  _onCubeCreate = (index, cube) => {
    this.cubes[index] = cube;
  };

  renderRectBulb() {
    let rectBulb =  CubeData.rectBulb;
    let positionX = P_X;
    let positionY = P_Y;
    let positionZ = P_Z;
    let self = this;
    let bulbs =  rectBulb.map((item, index) => {
      positionZ += 12;
      if(index % 7 === 0) {
        positionX += 12;
        positionZ = 12;
      }
      if(index !== 25) {
        this.index ++ ;
      }
      let element = (index === 25) ? null : <Blubs key={`${positionX}_${positionY}_${positionZ}`} x={positionX} y={positionY} z={positionZ} info={item}  onCreate={this._onCubeCreate.bind(this, this.index)}/>
      // let element = <Blubs key={`${positionX}_${positionY}_${positionZ}`} x={positionX} y={positionY} z={positionZ} info={item}  onCreate={this._onCubeCreate.bind(this, self.index)}/>
      return element;
    })
    return bulbs;
  }

  renderLatheBulb() {
    let latheBulb = CubeData.latheBlub;
    let positionX = P_X + 24;
    let positionY = P_Y - 4;
    let positionZ = P_Z;
    let positionVecters = [
      {x: positionX, y: positionY, z: positionZ + 18},  //n * 12 + 6
      {x: positionX, y: positionY, z: positionZ + 54},
      {x: positionX + 12, y: positionY, z: positionZ + 30},
      {x: positionX + 12, y: positionY, z: positionZ + 66},
      {x: positionX + 24, y: positionY, z: positionZ + 6},
      {x: positionX + 24, y: positionY, z: positionZ + 48},
      {x: positionX + 36, y: positionY, z: positionZ + 18},
      {x: positionX + 36, y: positionY, z: positionZ + 48},
    ];
    return positionVecters.map((po, item) => {
      this.index ++ ;
      return <Blubs key={`${po.x}_${po.y}_${po.z}`} x={po.x} y={po.y} z={po.z} info={latheBulb[item]} onCreate={this._onCubeCreate.bind(this, this.index)}/>
    })

  }

  renderCylinderBulb() {
    let cylinder = CubeData.cylinder;
    let positionX = P_X + 80;
    let positionY = P_Y ;
    let positionZ = P_Z  + 10;
    let positionVecters = [
      {x: positionX, y: positionY, z: positionZ + 20},  //n * 12 + 6
      {x: positionX, y: positionY, z: positionZ + 28},
      {x: positionX, y: positionY, z: positionZ + 36},
      {x: positionX + 12, y: positionY, z: positionZ + 20},
      {x: positionX + 12, y: positionY, z: positionZ + 28},
      {x: positionX + 12, y: positionY, z: positionZ + 36},
    ];
    return positionVecters.map((po, item) => {
      this.index ++ ;
      return <Blubs key={`${po.x}_${po.y}_${po.z}`} x={po.x} y={po.y} z={po.z} info={cylinder[item]} onCreate={this._onCubeCreate.bind(this, this.index)}/>
    })
  }

  renderDoorCylinderBulb() {
    let cylinder = CubeData.doorCylinder;
    let positionX = P_X + 130;
    let positionY = P_Y ;
    let positionZ = P_Z - 20;
    let positionVecters = [
      {x: positionX, y: positionY, z: positionZ},  //n * 12 + 6
      {x: positionX, y: positionY, z: positionZ + 12},
      {x: positionX + 12, y: positionY, z: positionZ},
      {x: positionX + 12, y: positionY, z: positionZ+ 12},
    ];
    return positionVecters.map((po, item) => {
      this.index ++ ;
      console.log( this.index)

      return <Blubs key={`${po.x}_${po.y}_${po.z}`} x={po.x} y={po.y} z={po.z} info={cylinder[item]} onCreate={this._onCubeCreate.bind(this, this.index)}/>
    })
  }

  render() {
    return (
        <group>
          {this.renderRectBulb()}
          {this.renderLatheBulb()}
          {this.renderCylinderBulb()}
          {this.renderDoorCylinderBulb()}
        </group>
    )
  }
}