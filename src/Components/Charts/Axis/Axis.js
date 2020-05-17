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
      case 'left': axis = d3.axisLeft(); break;
      case 'bottom': axis = d3.axisBottom(); break;
      case 'right': axis = d3.axisRight(); break;
      case 'top': axis = d3.axisTop(); break;
      default: axis = d3.axisBottom(); break;
    }
    if(this.props.isTimeFormat)
      axis = axis.tickFormat(d3.timeFormat(this.props.timeFormat));
    axis = axis.ticks(this.props.ticks).scale(this.props.scale);
    d3.select(node).call(axis);
  }

  render() {
    return (
      <g className={'axix ' + this.props.className} ref="axis" transform={this.props.translate}>
        <text transform={this.props.textTranslate} y={this.props.y} dy={this.props.dY} x={this.props.x}
              dx={this.props.dX} style={{textAnchor:'end'}} fill={"#000"} >
          {this.props.text}
        </text>
      </g>
      )
  }
}
