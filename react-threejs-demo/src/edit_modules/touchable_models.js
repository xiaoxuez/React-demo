import React from 'react';
import * as THREE from 'three';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import TouchableModel from './touchable_model';
export default class extends React.Component {

  models = [];

  _onModelCreate = (index, model) => {
    this.models[index] = model;
    if (index === this.props.allModels.length - 1) {
      this.props.onModelMounted(this.models);
    }
  };

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  renderChildren() {
    let self = this;
    const {allModels, mouseInput, camera} = this.props;
    this.models.length = allModels.length;
    let children = allModels.map((model, index) => {
      return <TouchableModel key={`touchable-model${index}`}
         model={model}
         onCreate={self._onModelCreate.bind(self, index)}
         mouseInput={mouseInput}
         camera={camera}
         index={index}/>
    });
    return children;
  }


  render() {
    return (
      <group>
        {this.renderChildren()}
      </group>
    )
  }
}
