import React from 'react';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import * as THREE from 'three';

import React3 from 'react-three-renderer';

import ExampleBase from './Example/ExampleBase';

import TrackballControls from './Example/trackball';

import MouseInput from './Example/MouseInput';

import Cubes from './CubesComponent';

class Floor extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 1000),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
    };


    this.lightPosition = new THREE.Vector3(0, 500, 2000);
    this.lightTarget = new THREE.Vector3(0, 0, 0);
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  componentDidMount() {

    const {
        container,
        camera,
    } = this.refs;


    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

  }

  componentDidUpdate(newProps) {
    const {
        mouseInput,
    } = this.refs;

    const {
        width,
        height,
    } = this.props;

    if (width !== newProps.width || height !== newProps.height) {
      mouseInput.containerResized();
    }
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;

  }

  _onAnimateInternal() {
    const {
        mouseInput,
        camera,
    } = this.refs;

    if (!mouseInput.isReady()) {
      const {
          scene,
          container,
      } = this.refs;

      mouseInput.ready(scene, container, camera);
      mouseInput.restrictIntersections(this.cubes);
      mouseInput.setActive(false);
    }

    if (this.state.mouseInput !== mouseInput) {
      this.setState({
        mouseInput,
      });
    }

    if (this.state.camera !== camera) {
      this.setState({
        camera,
      });
    }

    this.controls && this.controls.update();
  }

  _onCubesMounted = (cubes) => {
    this.cubes = cubes;
  };

  render() {
    const {
        width,
        height,
    } = this.props;

    const {
        cameraPosition,
        cameraRotation,

        mouseInput,
        camera,
    } = this.state;

    return (<div
        ref="container"
       // style={}
    >
      <React3
          width={width}
          height={height}
          antialias
          pixelRatio={window.devicePixelRatio}
          mainCamera="mainCamera"
          onAnimate={this._onAnimate}
          sortObjects={false}
          shadowMapEnabled
          shadowMapType={THREE.PCFShadowMap}
          clearColor={0xf0f0f0}
      >
        <module
            ref="mouseInput"
            descriptor={MouseInput}
        />
        <scene ref="scene">
          <perspectiveCamera
              fov={70}
              aspect={width / height}
              near={1}
              far={10000}
              name="mainCamera"
              ref="camera"
              position={cameraPosition}
              rotation={cameraRotation}
          />
          <ambientLight
              color={0x505050}
          />
          <spotLight
              color={0xffffff}
              intensity={1.5}
              position={this.lightPosition}
              lookAt={this.lightTarget}

              castShadow
              shadowCameraNear={200}
              shadowCameraFar={10000}
              shadowCameraFov={50}

              shadowBias={-0.00022}

              shadowMapWidth={2048}
              shadowMapHeight={2048}
          />
          <mesh position={new THREE.Vector3(0, 0, 50)} rotation={new THREE.Euler(-0.5 * Math.PI, 0, 0)}>
            <planeGeometry width={200} height={200} widthSegments={1} heightSegments={1}/>
            <meshLambertMaterial color={0xcccccc}/>
          </mesh>
          <mesh position={new THREE.Vector3(0, 5, 0)} rotation={new THREE.Euler(-0.5 * Math.PI, 0, 0)}>
            <boxGeometry
                width={50}
                height={40}
                depth={10} />
            <meshLambertMaterial color={0xDEDEDE}/>
          </mesh>
          <mesh position={new THREE.Vector3(-10, 5, 75)} rotation={new THREE.Euler(-0.5 * Math.PI, 0, 0)}>
            <boxGeometry
                width={20}
                height={20}
                depth={10} />
            <meshLambertMaterial color={0xDEDEDE}/>
          </mesh>
          <mesh position={new THREE.Vector3(15, 5, 75)} rotation={new THREE.Euler(-0.5 * Math.PI, 0, 0)}>
            <boxGeometry
                width={20}
                height={20}
                depth={10} />
            <meshLambertMaterial color={0xDEDEDE}/>
          </mesh>
          <mesh position={new THREE.Vector3(60, 10, 0)} rotation={new THREE.Euler(0, -0.5 * Math.PI, 0)}>
            <planeGeometry width={15} height={20} widthSegments={1} heightSegments={1}/>
            <meshLambertMaterial color={0xcccccc}/>
          </mesh>
          <mesh position={new THREE.Vector3(60, 10, 15)} rotation={new THREE.Euler(0, -1, 0)}>
            <planeGeometry width={15} height={20} widthSegments={1} heightSegments={1}/>
            <meshLambertMaterial color={0xcccccc}/>
          </mesh>
          <Cubes onCubesMounted={this._onCubesMounted.bind(this)}/>
        </scene>
      </React3>
    </div>);
  }
}

export default Floor;