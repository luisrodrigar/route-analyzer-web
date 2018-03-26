import React    from 'react';
import * as d3  from "d3";

export class DataMultiLine extends React.Component {

  constructor(props){
    super(props);
    this.renderLine = this.renderLine.bind(this);
    this.showFocusHandle = this.showFocusHandle.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    let data = null, date = null, x2 = null, y2 = null, xTranslate = null, yTranslate = null, showFocus = false;
    if(props.trackpoint){
      showFocus = true;
      y2 = props.height - props.yScale(props.trackpoint.speed) - props.padding;
      x2 = -props.xScale(props.trackpoint.date)+ props.padding;
      date = props.trackpoint.date;
      data = props.trackpoint.speed;
      xTranslate = props.xScale(props.date);
      yTranslate = props.yScale(props.data);
    }
    this.state = {
      showFocus,
      x2,
      y2,
      data,
      date,
      xTranslate,
      yTranslate
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.trackpoint && prevProps.trackpoint !== this.props.trackpoint)
      this.setState({
        showFocus:true,
        x2:-this.props.xScale(this.props.track.date) + this.props.padding,
        y2:this.props.height - this.props.yScale(this.props.track.speed)- this.props.padding,
        data:this.props.track.speed,
        date:this.props.track.date,
        xTranslate: this.props.xScale(this.state.date),
        yTranslate: this.props.yScale(this.state.data)
      })
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

  mouseMove(event){
    const bisectDate = d3.bisector(d => d[0]).left;
    const data = this.props.data;
    const coords = d3.clientPoint(event.target, event);
    const x0 = this.props.xScale.invert(coords[0]);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    const d = x0 - d0[0] > d1[0]- x0 ? d1 : d0;
    let xTranslate = this.props.xScale(d[0]);
    let yTranslate = this.props.yScale(d[1]);
    let x2 = -this.props.xScale(d[0]) + this.props.padding;
    let y2 = this.props.height - this.props.yScale(d[1]) - this.props.padding;
    let date = d[0];
    let track = this.props.laps.map(lap=>
      lap.tracks.filter(track=>{
        if(track[1]===d[1] && track[0]===d[0])
          return track;
        else
          return null;
      })
    )[0][0];
    let lap = this.props.laps.filter(lap=>{
      if(lap.tracks.includes(track))
        return lap;
      else 
        return null;
    })
    let indexLap = this.props.laps.indexOf(lap[0]);
    let indexTrackpoint = this.props.laps[indexLap].tracks.indexOf(track);
    this.props.handleMouseOver(indexLap+"_"+indexTrackpoint);
    this.setState({
      x2,
      y2,
      data:d[1],
      date,
      xTranslate,
      yTranslate
    })
  }


  showFocusHandle(display){
    this.setState({
      showFocus:display
    });
  }

  render(){
    let xTranslate = null;
    let yTranslate = null;
    if(this.state.date && this.state.data){
      xTranslate = this.props.xScale(this.state.date);
      yTranslate = this.props.yScale(this.state.data);
    }
    return(
      <g className={'line'}>
      { 
        this.props.laps.map(lap=>this.renderLine(lap))
      }
      <g  ref={ref=>this.focus=ref}
          className='focus'
          style={{opacity:0.7,display:this.state.showFocus?'block':'none'}}
          transform={this.state.date && this.state.data ? 'translate('+xTranslate+','+yTranslate+')' : null}
          >
        <circle r='2.5' style={{fill:'none',stroke:'black'}}></circle>
        <line className='x'
              style={{fill: 'none', stroke: 'black', strokeWidth: '1.5px', strokeDasharray: '3, 3'}}
              x1='0' y1='0' y2='0' x2={this.state.x2} >
        </line>
        <line className='y'
              style={{fill: 'none', stroke: 'black', strokeWidth: '1.5px', strokeDasharray: '3, 3'}}
              x1='0' x2='0' y1='0' y2={this.state.y2}>
        </line>
        <text x='9' y='-10' dy='.35em'>{Math.round(this.state.data*1000)/1000}m/s</text>
        <text x='9' y='5' dy='.35em'>{this.state.date?new Date(this.state.date).toLocaleTimeString():null}</text>
      </g>
      <rect className="overlay" 
            width={this.props.width-this.props.padding-this.props.padding} 
            height={this.props.height-this.props.padding-this.props.padding}
            style={{fill: 'none', pointerEvents: 'all'}}
            onMouseOver={()=>this.showFocusHandle(true)}
            onMouseMove={(event)=>this.mouseMove(event)}/>
      </g>
    );
  }

}

export default DataMultiLine;