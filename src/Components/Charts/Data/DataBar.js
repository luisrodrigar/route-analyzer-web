import React    from 'react';
import InformationTooltip from '../Tooltip/InformationTooltip';

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
    let date = null, data=null;
    if(this.props.track){
      date = this.props.track.date;
      data = this.props.track.bpm;
    }
		return(
      <g className={'bars'}>
      { 
        this.props.laps.map(
          lap => this.renderBarLap(lap, this.props.xScale, this.props.yScale)
        )
      }
        <InformationTooltip ref="tooltip" 
                            xScale={this.props.xScale}
                            yScale={this.props.yScale}
                            width={this.props.width}
                            height={this.props.height}
                            padding={this.props.padding}
                            handleMouseOver={this.props.handleMouseOver}
                            laps={this.props.laps} 
                            data={this.props.data}
                            legend={this.props.legend}
                            trackpoint={{
                              date,
                              data
                            }}
        />
        <rect className="overlay" 
              width={this.props.width-(2*this.props.padding)} 
              height={this.props.height-(2*this.props.padding)}
              style={{fill: 'none', pointerEvents: 'all'}}
              onMouseOver={(event)=>this.refs.tooltip.mouseMove(event)}
              onMouseMove={(event)=>this.refs.tooltip.mouseMove(event)}
        />
      </g>
		);
  }

}

export default DataBar;