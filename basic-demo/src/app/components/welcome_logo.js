var React = require('react');


var Logo = React.createClass({displayName: "Logo",

  shouldComponentUpdate: function(nextProps) {
    return nextProps.opacity !== this.props.opacity;
  },

  render: function() {
    var opacity = this.props.opacity;
    if (opacity === undefined) {
      opacity = 1;
    }
    return(
      <g fill={this.props.color} opacity={this.props.opacity}>
        <text x={0} y={0} style={{letterSpacing: 8, fontSize: 24, fontWeight: 'bold'}}>
          W<tspan dy={-3}>e</tspan>
          <tspan dy={3}>l</tspan>
          <tspan dy={0}>c</tspan>
          <tspan dy={3}>o</tspan>
          <tspan dy={-3}>m</tspan>
          <tspan dy={0}>e</tspan>
        </text>
      </g>
    )
  }
});


module.exports = Logo;
