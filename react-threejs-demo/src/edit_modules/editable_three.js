import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import * as THREE from 'three';

import TrackballControls from '../Example/trackball';
import React3 from 'react-three-renderer';
import MouseInput from '../Example/MouseInput';
import TouchableModels from './touchable_models';
import * as ModelFactory from './models_factory';
import HandlerSignal from './signals';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 1000),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
    };

    this.lightPosition = new THREE.Vector3(0, 500, 1000);
    this.lightTarget = new THREE.Vector3(0, 0, 0);
  }

  componentDidMount() {
    HandlerSignal.enableAllTouchable.add(this.enableTouchable);
    const {
      container,
      camera,
      scene
    } = this.refs;
    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.addEventListener('start', function () {
      HandlerSignal.selectModel.dispatch(null, -1);
    }.bind(this))
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

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  _onAnimateInternal() {
    const {
      mouseInput,
      camera,
    } = this.refs;

    if (!mouseInput.isReady() && this.models) {
      const {
        scene,
        container,
      } = this.refs;

      mouseInput.ready(scene, container, camera);
      mouseInput.restrictIntersections(this.models);
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

  setModels = (models) => {
    this.models = models;
  };

  componentWillUnmount() {
    HandlerSignal.enableAllTouchable.remove(this.enableTouchable);
    this.controls.dispose();
    delete this.controls;
  }

  enableTouchable = (enable) => {
    this.controls.setEnabled(enable);
  }

  render() {
    const {
      width,
      height,
      allModels,
    } = this.props;
    const {
      cameraPosition,
      cameraRotation,
      mouseInput,
      camera,
    } = this.state;

    return (
      <div ref="container">
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
          {ModelFactory.resources()}
          <scene ref="scene" >
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

            <TouchableModels allModels={allModels}
              onModelMounted={this.setModels}
              mouseInput={mouseInput}
              camera={camera}
            />
          </scene>
        </React3>
      </div>
    );
  }
}
