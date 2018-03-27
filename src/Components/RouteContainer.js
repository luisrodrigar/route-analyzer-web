import React, { Component } from 'react';
import {get, removePoint, removeLaps, setColors, splitLap, joinLaps} from '../Services/activity';
import DownloadFileComponent from './DownloadFileComponent';
import {RouteMapContainer} from './RouteMapContainer';
import {getLapsTrackPoints} from '../Utils/lapOperations';
import Grid from 'material-ui/Grid';
import RouteTable from './RouteTable';
import ElevationsChart from './ElevationsChart';
import HeartRateChart from './HeartRateChart';
import SpeedChart from './SpeedChart';
import './RouteContainer.css';



class RouteContainer extends Component {

	constructor(props){
		super(props);
		this.handleActivityResponse = this.handleActivityResponse.bind(this);
		this.setActivityObject = this.setActivityObject.bind(this);
		this.removePosition = this.removePosition.bind(this);
		this.splitLap = this.splitLap.bind(this);
		this.removeLaps = this.removeLaps.bind(this);
		this.joinLaps = this.joinLaps.bind(this);
		this.selectTrackpoint =this.selectTrackpoint.bind(this);
		this.state = {
			activity: {},
			idLap: null,
			idTrackpoint:null,
			laps: []
		};
		this.setActivityObject(props.id);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.id !== this.props.id){
			this.setActivityObject(nextProps.id);
	    }
	}

	saveLapsColors(activityObject, laps){
		let data = laps.map((lap,index)=>lap.color.substring(1)+"-"+lap.lightColor.substring(1)).join('@');
		setColors(activityObject.id, data)
	}

	saveColorsIfNotInformed(activityObject, laps){
		if(activityObject.laps && activityObject.laps.length>0
			&& activityObject.laps.filter(lap=> !lap.color).length>0){
			this.saveLapsColors(activityObject, laps);
		}
	}

	handleActivityResponse(activityObject){
		let laps = getLapsTrackPoints(activityObject.laps);
		this.saveColorsIfNotInformed(activityObject, laps);
		this.setState({
			activity: activityObject,
			idLap: null,
			idTrackpoint:null,
			laps: laps
		});
	}

	setActivityObject(id){
		get(id)
			.then( activityObject => {
				this.handleActivityResponse(activityObject);
			})
			.catch( err => {
				alert(err.message);
			});
	}

	removePosition(position, date, index){
    	removePoint(this.props.id,position, date, index)
	      	.then( activityObject => {
	      		this.handleActivityResponse(activityObject);
	      	})
	      	.catch( err => {
	        	alert(err.message);
	      	});
  	}

  	splitLap(position, date, index){
  		splitLap(this.props.id,position, date, index)
	      	.then( activityObject => {
	      		this.handleActivityResponse(activityObject);
	      	})
	      	.catch( err => {
	        	alert(err.message);
	      	});
  	}

  	removeLaps(dataSelected){
  		removeLaps(this.props.id, dataSelected)
  			.then(activityObject => {
	    		this.handleActivityResponse(activityObject);
	      	})
	      	.catch( err => {
	        	alert(err.message);
	      	});
  	}

  	joinLaps(dataSelected){
  		joinLaps(this.props.id, dataSelected)
  			.then(activityObject =>{
  				this.handleActivityResponse(activityObject)
  			})
  			.catch(err =>{
  				alert(err.message);
  			});
  	}

  	selectTrackpoint(keyMarker){
  		let idLap = keyMarker.split('_')[0];
  		let idTrackpoint = keyMarker.split('_')[1];
  		this.setState({
  			idLap,
  			idTrackpoint
  		})
  	}

	render(){
		if(this.state.activity && this.state.activity.laps){
			let trackObject = this.state.idLap && this.state.idTrackpoint ? 
						this.state.laps[this.state.idLap].tracks[this.state.idTrackpoint] 
						: null;
			return (
				<div>
					<Grid container spacing={8}>
						<Grid item xs={12}>
							<DownloadFileComponent 	id={this.state.activity.id} 
													type={this.state.activity.sourceXmlType} />
						</Grid>
					</Grid>
					<Grid container spacing={16}>
						<Grid item xs={7}>
							<div className="RouteTable">
								<RouteTable handleRemoveLaps={this.removeLaps} 
											handleJoinLaps={this.joinLaps} 
											laps={this.state.laps}/>
							</div>
						</Grid>
						<Grid item xs={5}>
							<div className="RouteMap">
								<RouteMapContainer 	handleRemoveMarker={this.removePosition} 
													handleSplitLap={this.splitLap} 
													handleMouseOver={this.selectTrackpoint}
													currentTrack={this.state.idLap+"_"+this.state.idTrackpoint}
													laps={this.state.laps} />
							</div>
						</Grid>
					</Grid>
					<Grid container spacing={8}>
						<ElevationsChart 	laps={this.state.laps}
											yTitle={'Altitude (m)'}
											xTitle={'Time (hh:mm:ss)'}
											handleMouseOver={this.selectTrackpoint}
											track={trackObject}
											/>
						<HeartRateChart 	laps={this.state.laps}
											yTitle={'Heart Rate (bpm)'}
											xTitle={'Time (hh:mm:ss)'}
											handleMouseOver={this.selectTrackpoint}
											track={trackObject}
											/>
						<SpeedChart		 	laps={this.state.laps}
											yTitle={'Speed (m/s)'}
											xTitle={'Time (hh:mm:ss)'}
											handleMouseOver={this.selectTrackpoint}
											track={trackObject}
											/>
					</Grid>
				</div>
			);
		} else
			return(
				<div>
					
				</div>
			);
	}

}

export default RouteContainer;