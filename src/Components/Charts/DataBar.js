import React    from 'react';
import * as d3  from "d3";

export class DataBar extends React.Component {

  constructor(props){
    super(props);
    this.renderBarLap = this.renderBarLap.bind(this);
  }

	renderBarLap(lap, xScale, yScale){
 		return lap.tracks.map( (track,index) =>
      <rect className={'lap ' + lap.index + ", trackpoint " + index }
            x={xScale(track[0])}
            y={yScale(track[1])}
            fill={lap.color}
            height={this.props.height - this.props.padding - yScale(track[1])}
            width={0.5}
            key={lap.index + "_" + index}/>
            )
	};

	render(){
    let minYValue = d3.min(this.props.data, d => d[1]);
		return(
      <g className={'bars'}>
      { 
        this.props.laps.map(
          lap => this.renderBarLap(lap, this.props.xScale, this.props.yScale)
        )
      }
      </g>
		);
  }

}

export default DataBar;