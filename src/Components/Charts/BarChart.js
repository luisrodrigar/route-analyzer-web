import React from 'react';
import AbstractChart from './AbstractChart';
import DataBar from './DataBar';
import DataLine from './DataLine';
import * as d3            from "d3";

export class BarChart extends React.Component{

	// Returns the largest X coordinate from the data set
    xMax   = (data)  => d3.max(data, (d)=>d[0]);

    // Returns the largest X coordinate from the data set
    xMin   = (data)  => d3.min(data, (d)=>d[0]);

    // Returns the higest Y coordinate from the data set
    yMax   = (data)  => d3.max(data, (d) => d[1]);

    // Returns the higest Y coordinate from the data set
    yMin   = (data)  => d3.min(data, (d) => d[1]);

    // Returns a function that "scales" X coordinates from the data to fit the chart
    xScale = (props) => {
      return d3.scaleTime()
        .domain([new Date(this.xMin(props.data)), new Date(this.xMax(props.data))])
        .range([props.padding, props.width - props.padding * 2]);
    };

    // Returns a function that "scales" Y coordinates from the data to fit the chart
    yScale = (props) => {
      return d3.scaleLinear()
        .domain([this.yMin(props.data), this.yMax(props.data)])
        .range([props.height - props.padding, props.padding]);
    };

	render(){
		let scales = {};
      	if(this.props.data && this.props.data.length)
          	scales = { xScale: this.xScale(this.props), yScale: this.yScale(this.props) };
		return( 
			<AbstractChart {...this.props} {...scales}  >
				{ this.props.data && this.props.data.length && 
	              	<DataBar   {...this.props}
	                          	{...scales} />
                }
                { this.props.data && this.props.data.length &&
                    <DataLine   {...this.props}
                                {...scales} />
				}
			</AbstractChart>
		);
	}
}

export default BarChart;