import React    from 'react';
import * as d3  from "d3";
import {getColorObject} from '../../Utils/materialColors';

export class DataLine extends React.Component {

  renderLine(laps, xScale, yScale){

    let lineFunction = d3
      .line()
      .x(d=> xScale(d[0]))
      .y(d=> yScale(d[1]));

    let color = getColorObject('Red')[500];

    return <path  className={'avg-bpm'}
                  d={lineFunction(laps)} 
                  stroke={color}
                  strokeWidth={2}/>
  };

  render(){
    return(
      <g className={'areas'}>
      { 
        this.renderLine(this.props.dataLine, this.props.xScale, this.props.yScale)
      }
      </g>
    );
  }

}

export default DataLine;