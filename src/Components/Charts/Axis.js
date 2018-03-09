import React from 'react';
import * as d3    from 'd3';

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    let node = this.refs.axis;
    let axis = null;
    switch(this.props.orient){
      case 'left':
      axis = d3.axisLeft().ticks(5).scale(this.props.scale);
      break;
      case 'bottom':
      axis = d3.axisBottom().tickFormat(d3.timeFormat("%H:%M:%S")).ticks(5).scale(this.props.scale);
      break;
      case 'right':
      axis = d3.axisRight().ticks(5).scale(this.props.scale);
      break;
      case 'top':
      axis = d3.axisTop().ticks(5).scale(this.props.scale);
      break;
    }
    d3.select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}