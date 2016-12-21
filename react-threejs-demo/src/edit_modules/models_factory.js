import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

var positionVector3 = function() {
  let p_x = Math.random() * 150 - 50;
  let p_y = Math.random() * 150 + 60;
  let p_z = Math.random() * 120 - 60;
  return new THREE.Vector3(p_x, p_y, p_z);
}

var resources = function() {
  return (
    <resources>
      <boxGeometry
        resourceId="boxGeometry"
        width={40}
        height={40}
        depth={40}
      />
      <cylinderGeometry
        resourceId="coneGeometry"
        radiusTop={35}
        radiusBottom={10}
        height={10}
        radialSegments={0}
        heightSegments={1}
       />
       <cylinderGeometry
         resourceId="cylinderGeometry"
         radiusTop={35}
         radiusBottom={35}
         height={10}
         radialSegments={0}
         heightSegments={1}
        />
      <meshBasicMaterial
        resourceId="highlightMaterial"
        color={0xffff00}
        wireframe
      />
    </resources>
  )
}

var rectGeometry = function() {
  return(
    <geometryResource
      resourceId="boxGeometry"
    />
  )
}

var coneGeometry = function() {
  return (
    <geometryResource
      resourceId="coneGeometry"
    />
  )
}

var cylinderGeometry = function() {
  return (
    <geometryResource
      resourceId="cylinderGeometry"
    />
  )
}

var CylinderModel = function() {
  return {
    position: positionVector3(),
    name: '',
    geometry: cylinderGeometry(),
    color: new THREE.Color(Math.random() * 0xffffff),
  }
}

var ConeModel = function() {
  return {
    position: positionVector3(),
    geometry: coneGeometry(),
    name: '',
    color: new THREE.Color(Math.random() * 0xffffff),
  }
}

var RectModel = function() {
  return {
    position: positionVector3(),
    geometry: rectGeometry(),
    name: '',
    color: new THREE.Color(Math.random() * 0xffffff),
  }
}

export {
  resources,
  CylinderModel,
  ConeModel,
  RectModel,
}
