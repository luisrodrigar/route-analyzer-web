import React, {Component} from 'react';
import XYAxis             from './XYAxis';
import DataLine           from './DataLine';
import DataCircles           from './DataCircles';
import Paper from 'material-ui/Paper';
import * as d3            from "d3";
import './Chart.css';

// Returns the largest X coordinate from the data set
const xMax   = (data)  => d3.max(data.map(d=>new Date(d[0])));

// Returns the higest Y coordinate from the data set
const yMax   = (data)  => d3.max(data, (d) => d[1]);

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) => {
  return d3.scaleTime()
    .domain([new Date(props.data[0][0]), xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
  return d3.scaleLinear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

export class Chart extends Component{
    
    render() {
        let scales = {};
        if(this.props.data.length)
          scales = { xScale: xScale(this.props), yScale: yScale(this.props) };
        return(
          <Paper>
            <svg height={this.props.height} width={this.props.width} >
                {//this.props.laps.map( (lap, index) =>
                   //   <DataCircles  {...this.props}
                    //                {...scales}
                    //                key={index} />
                //)
                this.props.laps.length && <DataLine  {...this.props}
                                   {...scales}
                                     />
                }
                <XYAxis {...this.props} {...scales} textYAxis={'Altitude (meters)'} textXAxis={'Time (hh:mm:ss)'} />
            </svg>
          </Paper>
        );
    }
}

export default Chart;