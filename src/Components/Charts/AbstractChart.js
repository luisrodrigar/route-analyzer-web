import React    from 'react';
import XYAxis   from './Axis/XYAxis';
import Paper    from '@material-ui/core/Paper';
import * as d3            from "d3";

export default class AbstractChart extends React.Component{
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

    render() {
        let scales = {};
        if(this.props.data && this.props.data.length)
            scales = { xScale: this.xScale(this.props), yScale: this.yScale(this.props) };
        let childrenWithProps = [];
        if(this.props.children && Array.isArray(this.props.children)
            && this.props.children.filter(child=>child).length>0){

            childrenWithProps = React.Children.map(
                this.props.children
                    .filter(child => child), (child,index) =>
                    React.cloneElement(child, {
                        data:this.props.data,
                        laps:this.props.laps,
                        dataLine: this.props.dataLine,
                        height:this.props.height,
                        track:this.props.track,
                        handleMouseOver: index===0 ? this.props.handleMouseOver : null,
                        xScale: scales.xScale,
                        yScale: scales.yScale
                    })
            );
        } else if(this.props.children && !Array.isArray(this.props.children)) {
            childrenWithProps = React.cloneElement(this.props.children, {
                data:this.props.data,
                laps:this.props.laps,
                dataLine: this.props.dataLine,
                height:this.props.height,
                track:this.props.track,
                xScale: scales.xScale,
                yScale: scales.yScale
            });
        }

        return(
            <Paper  style={{overflowX:'auto'}}>
                <svg  height={this.props.height} width={this.props.width} >
                    {childrenWithProps}
                    <XYAxis {...this.props} {...scales}/>
                </svg>
            </Paper>
        );
    }
}
