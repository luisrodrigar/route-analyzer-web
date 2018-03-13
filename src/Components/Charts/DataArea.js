import React    from 'react';
import * as d3  from "d3";

export class DataArea extends React.Component {

	renderArea(props, minYValue, xScale, yScale){

    let areaFunction = d3
      .area()
      .x(d=> xScale(d[0]))
      .y1(d=> yScale(d[1]))
      .y0(d=> yScale(minYValue));

    let data = [];
    props.tracks.forEach(track => data.push([track[0], track[1]]));

 		return <path className={props.label}
            d={areaFunction(data)} 
            stroke={props.color}
            strokeWidth={1}
            fill={props.color}
            key={props.index}/>
	};

	render(){
    let minYValue = d3.min(this.props.data, d => d[1]);
		return(
      <g className={'areas'}>
      { 
        this.props.laps.map(
          lap => this.renderArea(lap, minYValue, this.props.xScale, this.props.yScale)
        )
      }
      </g>
		);
  }

}

export default DataArea;