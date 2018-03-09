import React    from 'react';
import * as d3  from "d3";

export class DataLine extends React.Component {

	renderLine(props){

    let lineFunction = d3
      .line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; });

 		return <path class={props.label}
            d={lineFunction(props.data)} 
            stroke={props.color}
            stroke-width={2}
            fill={'none'}/>
	};

	render() {

		return(
      <g>{this.renderLine(this.props)}</g>
		);
    }

}

export default DataLine;