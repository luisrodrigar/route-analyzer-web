import React, { Component } from 'react';
import {get, removePoint, removeLaps, getElevationData} from '../Services/activity';
import DownloadFileComponent from './DownloadFileComponent';
import {RouteMapContainer} from './RouteMapContainer';
import {getLapsTrackPoints} from '../Utils/lapOperations';
import Grid from 'material-ui/Grid';
import RouteTable from './RouteTable';
import Chart from './Charts/Chart';
import './RouteContainer.css';

const charStyle = {
  width   : 500,
  height  : 300,
  padding : 30,
};

class RouteContainer extends Component {

	constructor(props){
		super(props);
		this.setActivityObject = this.setActivityObject.bind(this);
		this.removePosition = this.removePosition.bind(this);
		this.removeLaps = this.removeLaps.bind(this);
		this.handleActivityResponse = this.handleActivityResponse.bind(this);
		this.state = {activity: {}, laps: [], elevations: []};
		this.setActivityObject(props.id);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.id !== this.props.id){
			this.setActivityObject(nextProps.id);
	    }
	}

	handleActivityResponse(activityObject){
		let laps = getLapsTrackPoints(activityObject.laps);
		let elevations = getElevationData(laps);
		this.setState({
			activity: activityObject,
			laps,
			elevations
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

  	removeLaps(dataSelected){
  		removeLaps(this.props.id, dataSelected)
  			.then(activityObject => {
	    		this.handleActivityResponse(activityObject);
	      	})
	      	.catch( err => {
	        	alert(err.message);
	      	});
  	}

	render(){
		if(this.state.activity && this.state.activity.laps){
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
								<RouteTable handleRemoveLaps={this.removeLaps} laps={this.state.laps}/>
							</div>
						</Grid>
						<Grid item xs={5}>
							<div className="RouteMap">
								<RouteMapContainer handleRemoveMarker={this.removePosition} laps={this.state.laps} />
							</div>
						</Grid>
					</Grid>
					<Grid container spacing={8}>
						<Grid item xs={4}>
							<Chart 	data={this.state.elevations} 
									laps={this.state.laps}
									{...charStyle} />
						</Grid>
						<Grid item xs={6}>
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

export default RouteContainer;