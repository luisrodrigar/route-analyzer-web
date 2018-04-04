import React, { Component } from 'react';
import {get, removePoint, removeLaps, setColors, splitLap, joinLaps} from '../Services/activity';
import DownloadFileComponent from './DownloadFileComponent';
import RouteMapContainer from './RouteMapContainer';
import {getLapsTrackPoints, setLapColors} from '../Utils/operations';
import Grid from 'material-ui/Grid';
import RouteTable from './RouteTable';
import ElevationsChart from './ElevationsChart';
import HeartRateChart from './HeartRateChart';
import SpeedChart from './SpeedChart';
import { connect } from "react-redux";
import { setActivity } from "../actions/index";
import './RouteContainer.css';

const mapStateToProps = state => {
  return { 
    activity: 		state.container.activity,
    idLap: 			state.container.idLap,
    idTrackpoint: 	state.container.idTrackpoint
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivity: activity => dispatch(setActivity(activity))
  };
};

class RouteContainer extends Component {

	constructor(props){
		super(props);
		this.handleActivityResponse = this.handleActivityResponse.bind(this);
		this.setActivityObject = this.setActivityObject.bind(this);
		this.removePosition = this.removePosition.bind(this);
		this.splitLap = this.splitLap.bind(this);
		this.removeLaps = this.removeLaps.bind(this);
		this.joinLaps = this.joinLaps.bind(this);
		this.setActivityObject(props.id);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.id !== this.props.id){
			this.setActivityObject(nextProps.id);
	    }
	}

	saveColorsIfNotInformed(activityObject){
		if(activityObject.laps && activityObject.laps.length>0
			&& activityObject.laps.filter(lap=> !lap.color).length>0){
			let data = activityObject.laps
				.map((lap,index)=>
					lap.color.substring(1)+"-"+lap.lightColor.substring(1)
				).join('@');
			setColors(activityObject.id, data)
		}
	}

	handleActivityResponse(activityObject){
		setLapColors(activityObject.laps);
		this.saveColorsIfNotInformed(activityObject);
		this.props.setActivity(activityObject);
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

	render(){
		if(this.props.activity && this.props.activity.laps){
			let track = this.props.idLap && this.props.idTrackpoint ? 
						this.props.activity.laps[this.props.idLap].tracks[this.props.idTrackpoint] 
						: null;
			let laps = getLapsTrackPoints(this.props.activity.laps);
			return (
				<div>
					<Grid container spacing={8}>
						<Grid item xs={12}>
							<DownloadFileComponent/>
						</Grid>
					</Grid>
					<Grid container spacing={16}>
						<Grid item xs={7}>
							<div className="RouteTable">
								<RouteTable handleRemoveLaps={this.removeLaps} 
											handleJoinLaps={this.joinLaps} 
											laps={laps}
								/>
							</div>
						</Grid>
						<Grid item xs={5}>
							<div className="RouteMap">
								<RouteMapContainer 	handleRemoveMarker={this.removePosition} 
													handleSplitLap={this.splitLap} 
													handleMouseOver={this.selectTrackpoint}
								/>
							</div>
						</Grid>
					</Grid>
					<Grid container spacing={24}>
						<Grid item xs={12}>
						<ElevationsChart	yTitle={'Altitude (m)'}
											xTitle={'Time (hh:mm:ss)'}
											currentTrack={track}
						/>
						</Grid>
					</Grid>
					<Grid container spacing={24}>
						<Grid item xs={12}>
						<HeartRateChart 	yTitle={'Heart Rate (bpm)'}
											xTitle={'Time (hh:mm:ss)'}
											currentTrack={track}
						/>
						</Grid>
					</Grid>
					<Grid container spacing={24}>
						<Grid item xs={12}>
						<SpeedChart		 	yTitle={'Speed (m/s)'}
											xTitle={'Time (hh:mm:ss)'}
											currentTrack={track}
						/>
						</Grid>
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

export default connect(mapStateToProps,mapDispatchToProps)(RouteContainer);