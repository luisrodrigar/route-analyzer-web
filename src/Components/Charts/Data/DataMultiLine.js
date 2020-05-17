import React    from 'react';
import InformationTooltip from '../Tooltip/InformationTooltip';
import * as d3  from "d3";

export default class DataMultiLine extends React.Component {

  constructor(props){
    super(props);
    this.renderLine = this.renderLine.bind(this);
  }

  renderLine(props){

    let lineFunction = d3
      .line()
      .x(datum=>this.props.xScale(datum[0]))
      .y(datum=>this.props.yScale(datum[1]));

    return <path  className={'avg-bpm'}
                  d={lineFunction(props.tracks)} 
                  stroke={props.color}
                  strokeWidth={props.strokeWidth}
                  fill={'none'}
                  key={props.index}/>
  };

  render(){
      let date = null, data=null;
      if(this.props.track){
          date = this.props.track.date;
          data = this.props.track.speed;
      }
      return(
          <g className={'line'}>
              {this.props.laps.map(lap=>this.renderLine(lap))}
              <InformationTooltip ref="tooltip" xScale={this.props.xScale}
                                  yScale={this.props.yScale} width={this.props.width}
                                  height={this.props.height} padding={this.props.padding}
                                  handleMouseOver={this.props.handleMouseOver}
                                  laps={this.props.laps} data={this.props.data}
                                  legend={this.props.legend} trackpoint={{ date, data}}
              />
              <rect className="overlay" width={this.props.width-(2*this.props.padding)}
                    height={this.props.height-(2*this.props.padding)}
                    style={{fill: 'none', pointerEvents: 'all'}}
                    onMouseOver={(event) =>
                        this.refs.tooltip.mouseMove(event)}
                    onMouseMove={(event) =>
                        this.refs.tooltip.mouseMove(event)}
              />
          </g>
      );
  }
}
