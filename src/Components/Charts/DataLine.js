import React    from 'react';
import * as d3  from "d3";
import {getColorObject} from '../../Utils/materialColors';

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

    let color = getColorObject('Red')[500];

    return <path  className={'avg-bpm'}
                  d={lineFunction(props.dataLine)} 
                  stroke={color}
                  strokeWidth={props.dataLine===1?12:1}
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