var React = require('react');


var SVGSet = React.createClass({displayName: "SVGSet",
  render: function() {
    return (                                                       //viewBox： x y width height xy调整圆心
      React.createElement("svg", {className: "svg", style: this.props.style, viewBox: "0 0 300 42.2"}, //width height 指的是在画布的大小，即，
        this.props.children                                       //画物确定的情况下，画布越大，画物越小，画布越小，画物越大
      )
    );
  }
});


module.exports = SVGSet;
