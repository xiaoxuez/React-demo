import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  Floor from './Floor';
ReactDOM.render(
  <Floor width={window.innerWidth}
    height={window.innerHeight}/>,
  document.getElementById('root')
);
