import React    from 'react';
import InformationTooltip from '../Tooltip/InformationTooltip';
import * as d3  from "d3";

export default class DataArea extends React.Component {

	renderArea(props, minYValue, xScale, yScale){
        let areaFunction = d3.area().x(d=> xScale(d[0])).y1(d=> yScale(d[1])).y0(d=> yScale(minYValue));

        let data = [];
        props.tracks.forEach(track => data.push([track[0], track[1]]));
        return <path className={props.label} d={areaFunction(data)} stroke={props.color}
            strokeWidth={1} fill={props.color} key={props.index}/>
	};

	render(){
        let minYValue = d3.min(this.props.data, d => d[1]);
        let date = null, data=null;
        if(this.props.track){
          date = this.props.track.date;
          data = this.props.track.alt;
        }
        return(
          <g className={'areas'}>
              { this.props.laps.map(lap =>
                  this.renderArea(lap, minYValue, this.props.xScale, this.props.yScale)) }
              <InformationTooltip ref="tooltip" xScale={this.props.xScale}
                                  yScale={this.props.yScale} width={this.props.width}
                                  height={this.props.height} padding={this.props.padding}
                                  handleMouseOver={this.props.handleMouseOver}
                                  laps={this.props.laps} data={this.props.data}
                                  legend={this.props.legend} trackpoint={{date, data}}
              />
              <rect className="overlay" width={this.props.width-(2*this.props.padding)}
                    height={this.props.height-(2*this.props.padding)}
                    style={{fill: 'none', pointerEvents: 'all'}}
                    onMouseOver={(event)=>
                        this.refs.tooltip.mouseMove(event)}
                    onMouseMove={(event)=>
                        this.refs.tooltip.mouseMove(event)}/>
          </g>
        );
  }
}
