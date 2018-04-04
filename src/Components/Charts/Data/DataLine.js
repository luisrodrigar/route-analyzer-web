import React    from 'react';
import * as d3  from "d3";

export class DataLine extends React.Component {

  constructor(props){
    super(props);
    this.renderLine = this.renderLine.bind(this);
  }

  renderLine(props){

    let lineFunction = d3
      .line()
      .x(datum=>props.xScale(datum[0]))
      .y(datum=>props.yScale(datum[1]));

    return <path  className={'avg-bpm'}
                  d={lineFunction(props.dataLine)} 
                  stroke={this.props.color}
                  strokeWidth={this.props.strokeWidth}
                  fill={'none'}/>
  };

  render(){
    return(
      <g className={'line'}>
      { 
        this.renderLine(this.props)
      }
      </g>
    );
  }

}

export default DataLine;