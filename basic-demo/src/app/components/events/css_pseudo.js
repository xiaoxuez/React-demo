/**
*  css pseudo elements and class
*  css 伪类和伪元素的使用
*/
import React from 'react';

import '../../css/css_pseudo.css';
export default class extends React.Component {
  render() {
    return(
      <div  className='container'>
        <h4>:focus的使用</h4>
        <div className='input-example-1'>
          <input  className='input'>
          </input>
          <div className='cool'>点赞</div>
          <div className='send'>发送</div>
        </div>
        <br/>
        <p>根据input的focus情况， 将点赞或发送对应设置为‘display: none’或‘display: block’</p>
        <h4>感知子元素的个数 nth-last-child(n+4)</h4>
        <div className='example-2'>
          <ul>
            <li>one</li>
            <li>two</li>
            <li>tree</li>
            <li>four</li>
            <li>five</li>
            <li>six</li>
          </ul>
        </div>
        <p>1. 伪类 nth-last-child(n+4) n为计数器，从0开始， 4是偏移量（选中的元素依次为：倒数4， 5， 6）</p>
        <p>2. ~ 选择器 为选择其后所有的兄弟元素</p>
        <p>3. .example-2 ul li:nth-last-child(n+4) ~ li 当子类元素数量不超过4， 则不会匹配到任何。配到之后选择之后所有的li，但是不会匹配到第一个，所以又加上了
        ul li:nth-last-child(n+4):first-child</p>
      </div>
    )
  }
}
