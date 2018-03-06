import React, { Component } from 'react';
import {get, removePoint} from '../Services/activity';
import DownloadFileComponent from './DownloadFileComponent';
import {RouteMapContainer} from './RouteMapContainer';
import {getLapsTrackPoints} from '../Utils/lapOperations';
import RouteTable from './RouteTable';
import './RouteContainer.css';

class RouteContainer extends Component {

	constructor(props){
		super(props);
		this.setActivityObject = this.setActivityObject.bind(this);
		this.removePosition = this.removePosition.bind(this);
		this.state = {activity: {}, laps: []};
		this.setActivityObject(this.props.id);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.id !== this.props.id){
			this.setActivityObject(nextProps.id);
	    }
	}

	setActivityObject(id){
		get(id)
			.then( activityObject => {
				this.setState({
					activity: activityObject,
					laps: getLapsTrackPoints(activityObject.laps)
				});
			})
			.catch( err => {
				alert(err.message);
			});
	}

	removePosition(position, date, index){
    	removePoint(this.props.id,position, date, index)
	      .then( activityObject => {
	        this.setState({
	        	activity: activityObject,
	        	laps: getLapsTrackPoints(activityObject.laps)
	        });
	      })
	      .catch( err => {
	        alert(err.message);
	      });
  	}

	render(){
		if(this.state.activity && this.state.activity.laps){
			return (
				<div>
				<DownloadFileComponent id={this.state.activity.id} type={this.state.activity.sourceXmlType} />
				<div className="RouteTable">
					<RouteTable laps={this.state.laps} height={'300px'}/>
				</div>
				<div className="RouteMap">
					<RouteMapContainer handleRemoveMarker={this.removePosition} laps={this.state.laps} />
				</div>
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