import React    from 'react';
import * as d3  from "d3";

export class DataMultiLine extends React.Component {

  constructor(props){
    super(props);
    this.renderLine = this.renderLine.bind(this);
  }

  renderLine(props){

    let lineFunction = d3
      .line()
      .x(datum=>this.props.xScale(datum[0]))
      .y(datum=>this.props.yScale(datum[1]));

    return <path  className={'avg-bpm'}
                  d={lineFunction(props.tracks)} 
                  stroke={props.color}
                  strokeWidth={props.strokeWidth}
                  fill={'none'}
                  key={props.index}/>
  };

  render(){
    return(
      <g className={'line'}>
      { 
        this.props.laps.map(lap=>this.renderLine(lap))
      }
      </g>
    );
  }

}

export default DataMultiLine;