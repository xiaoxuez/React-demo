import React from 'react';
import ReactDOM from 'react-dom';
import {Link, IndexLink} from 'react-router';

const ACTIVE = { color: 'green' };
import '../css/scroll_header.css';
var SVGSet = require('./svg_set');
var Logo = require('./welcome_logo');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: 0,
    }
  }

  componentDidMount() {
    //offsetHeight 为元素外尺寸高度，是指 元素内容高度+内边距高度(上下两个)+边框(上下两个)
    this.offsetHeight = ReactDOM.findDOMNode(this).offsetHeight;
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = (event) => {
    this.offsetHeight =  ReactDOM.findDOMNode(this).offsetHeight;
  }

  handleScroll = (event) => {
    if (!this._pending) {
      var headerHeight = Math.min(800, Math.max(260, document.documentElement.clientHeight * 0.7));
      if (window.scrollY < headerHeight) {
        this._pending = true;
        window.requestAnimationFrame(function()  {
          this._pending = false;
          this.setState({ scroll: window.scrollY });
        }.bind(this));
      }
    }
  }

  render() {
    var neg = this.state.scroll < 0;
    var s = neg ? 0 : this.state.scroll;
    // var sp = isMobile ? 35 : 70;
    var sp = 70;
    return (
      <div className='header'>
        <div className='miniHeader'>
          <div className='miniHeaderContents'>
            <IndexLink to="/"  activeStyle={ACTIVE}>All</IndexLink>
            <Link to="/event"  activeStyle={ACTIVE}>Event</Link>
            <Link to="/girls"  activeStyle={ACTIVE}>Girls</Link>
            <Link to="/add"  activeStyle={ACTIVE}>Add</Link>
          </div>
        </div>
        <div className='coverContainer'>
          <div className='cover'>
            <div className='coverFixed'>
              <div className='filler'>
                <div className='miniHeader' style={{backgroundColor: '#d7dadb'}}>
                  <div className='miniHeaderContents'>
                    <IndexLink to="/"  activeStyle={ACTIVE}>All</IndexLink>
                    <Link to="/event"  activeStyle={ACTIVE}>Event</Link>
                    <Link to="/girls"  activeStyle={ACTIVE}>Girls</Link>
                    <Link to="/add"  activeStyle={ACTIVE}>Add</Link>
                  </div>
                </div>
              </div>
              <div className='synopsis'>
                <div className='logo'>
                  {[0,0,0,0,0,0,0,0,0,0,0,0].map(function(_, i) {
                    return React.createElement(SVGSet, {key: i, style: t(y(s, i * sp), z(s, i * sp))},
                        React.createElement(Logo, {color: "#d7dadb"}),
                        React.createElement(Logo, {color: "#6dbcdb", opacity: o(s, i * sp)})
                      );
                    })
                  }
                  {React.createElement(SVGSet, {style: t(s * -0.55, 1)},
                      React.createElement(Logo, {color: "#FC4349"}),
                      React.createElement(Logo, {color: "#2C3E50", inline: true})
                    )}
                </div>
              </div>
              <div className='buttons'>to basic-demo ~</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
{/* <div className='cover-fixed'>
  <div className='logo'>
    {[0,0,0,0,0,0,0,0,0,0,0,0].map(function(_, i) {
      return React.createElement(SVGSet, {key: i, style: t(y(s, i * sp), z(s, i * sp))},
          React.createElement(Logo, {color: "#d7dadb"}),
          React.createElement(Logo, {color: "#6dbcdb", opacity: o(s, i * sp)})
        );
      })
    }
    {React.createElement(SVGSet, {style: t(s * -0.55, 1)},
        React.createElement(Logo, {color: "#FC4349"}),
        React.createElement(Logo, {color: "#2C3E50", inline: true})
      )}
  </div>
</div> */}

function y(s, p) {
  return ((p < s ? p : s) * -0.55);
}

function o(s, p) {
  return Math.max(0, s > p ? 1 - (s - p)/350 : 1);
}

function z(s, p) {
  return Math.max(0, s > p ? 1 - (s - p)/20000 : 1);
}

function t(y, z) {
  var transform = 'translate3d(0, '+y+'px, 0) scale('+z+','+ z+')';
  return {
    transform: transform,
    WebkitTransform: transform,
    MozTransform: transform,
    msTransform: transform,
    OTransform: transform,
  };
}


module.exports = Header;
