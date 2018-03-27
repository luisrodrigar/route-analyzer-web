import React    from 'react';
import * as d3  from "d3";

export class InformationTooltip extends React.Component {

	constructor(props){
		super(props);
	    this.mouseMove = this.mouseMove.bind(this);
	    let trackpointDate = props.trackpoint.date;
	    let trackpointData = props.trackpoint.data;
	    let data = null, date = null, x2 = null, y2 = null, xTranslate = null, yTranslate = null, showFocus = false;
	    if(props.trackpoint){
		    showFocus = true;
		    y2 = props.height - props.yScale(trackpointData) - props.padding;
		    x2 = -props.xScale(trackpointDate)+ props.padding;
		    date = trackpointDate;
		    data = trackpointData;
		    xTranslate = props.xScale(trackpointDate);
		   	yTranslate = props.yScale(trackpointData);
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
		        x2:-this.props.xScale(this.props.trackpoint.date) + this.props.padding,
		        y2:this.props.height - this.props.yScale(this.props.trackpoint.data)- this.props.padding,
		        data:this.props.trackpoint.data,
		        date:this.props.trackpoint.date,
		        xTranslate: this.props.xScale(this.state.date),
		        yTranslate: this.props.yScale(this.state.data)
	    	})
 	}

  	mouseMove(event){
	  	const data = this.props.data;
	    const bisectDate = d3.bisector(d => d[0]).left; 
	    const coords = d3.clientPoint(event.target, event);
	    const x0 = this.props.xScale.invert(coords[0]);
	    const i = bisectDate(data, x0, 1);
	    const d0 = data[i - 1];
	    const d1 = data[i];
	    if(d0 && d1){
		    const d = x0 - d0[0] > d1[0]- x0 ? d1 : d0;
		    let xTranslate = this.props.xScale(d[0]);
		    let yTranslate = this.props.yScale(d[1]);
		    let x2 = -this.props.xScale(d[0]) + this.props.padding;
		    let y2 = this.props.height - this.props.yScale(d[1]) - this.props.padding;
		    let date = d[0];
		    // Looking for index of the lap and the trackpoint of the current data
		    let indexLap = null, indexTrackpoint =null;
		    let isFound = this.props.laps.some((lap,index)=>{
		      	lap.tracks.some((track,indexTrack)=>{
		      		if(track[1]===d[1] && track[0]===d[0]){
		      			indexTrackpoint = indexTrack;
		      			return true;
		      		}
		      		if(lap.tracks.length===indexTrackpoint)
		      			return false;
		      	})
		      	if(indexTrackpoint){
		      		indexLap = index;
		      		return true;
		      	}
		      	if(this.props.laps.length===index)
		      		return false;
		    })
		    if(isFound){
			    this.props.handleMouseOver(indexLap+"_"+indexTrackpoint);
			    this.setState({
			      showFocus:true,
			      x2,
			      y2,
			      data:d[1],
			      date,
			      xTranslate,
			      yTranslate
			    })
			}
		}
  	}

	render(){
		let xTranslate = null;
	    let yTranslate = null;
	    if(this.state.date && this.state.data){
	    	xTranslate = this.props.xScale(this.state.date);
	    	yTranslate = this.props.yScale(this.state.data);
	    }
		return(
			<g	className='focus'
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
	        <text x='9' y='-10' dy='.35em'>{Math.round(this.state.data*1000)/1000 + " " + this.props.legend}</text>
	        <text x='9' y='5' dy='.35em'>{this.state.date?new Date(this.state.date).toLocaleTimeString():null}</text>
	      	</g>
	    );
	}
}

export default InformationTooltip;