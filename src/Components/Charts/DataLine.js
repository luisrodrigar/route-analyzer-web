import React    from 'react';
import * as d3  from "d3";

export class DataLine extends React.Component {

	renderLine(props, xScale, yScale){

    let lineFunction = d3
      .area()
      .x(d=> xScale(d[0]))
      .y1(d=> yScale(d[1]))
      .y0(d=> yScale(0));

    let elevationsData = [];
    props.tracks.forEach(track => elevationsData.push([track.date, track.alt]));

 		return <path className={props.label}
            d={lineFunction(elevationsData)} 
            stroke={props.color}
            strokeWidth={1}
            fill={props.lightColor}
            key={props.index}/>
	};

	render(){
		return(
      <g className={'lines'}>{this.props.laps.map(lap => this.renderLine(lap, this.props.xScale, this.props.yScale))}</g>
		);
  }

}

export default DataLine;