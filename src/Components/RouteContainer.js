import React, { Component } from 'react';
import {get} from '../Services/activity';
import DownloadFileComponent from './DownloadFileComponent';
import {RouteMapContainer} from './RouteMapContainer';
import './RouteContainer.css';

class RouteContainer extends Component {

	constructor(props){
		super(props);
		this.setLocationRows = this.setLocationRows.bind(this);
		this.setActivityObject = this.setActivityObject.bind(this);
		this.state = {activity: {}};
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
				this.setState({activity: activityObject});
			})
			.catch( err => {
				alert(err.message);
			});
	}

	setLocationRows(){
		this.rows = []; 
		this.state.activity.laps.forEach(lap=>{
      		this.rows.push(<LapRow key={lap.index} value={lap.startTime ? new Date(lap.startTime).toLocaleDateString() + " " + new Date(lap.startTime).toLocaleTimeString()  : lap.index}/>);
			lap.tracks.forEach(track => {
				this.rows.push(<TrackPointRow key={track.date ? track.date : track.index + "_trackpoint"} 
					date={track.date ? new Date(track.date).toLocaleTimeString() : ""} position={track.position} altitudeMeters={track.altitudeMeters}/>);
			});
		});
	}

	render(){
		if(this.state.activity && this.state.activity.laps){
			this.setLocationRows();
			
			return (
				<div>
				<div className="RouteTable">
					<DownloadFileComponent id={this.state.activity.id} type={this.state.activity.sourceXmlType} />
					<table>
						<thead>
							<tr>
								<td>Time</td>
								<td>Longitude</td>
								<td>Latitude</td>
								<td>Altitude</td>
							</tr>
						</thead>
						<tbody>
							{this.rows}
						</tbody>
					</table>
				</div>
				<div className="RouteMap">
					<RouteMapContainer  laps={this.state.activity.laps}/>
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

class LapRow extends Component{
	render(){
		return(
			<tr>
				<td colSpan="4">{this.props.value}</td>
			</tr>
		);
	}
}

class TrackPointRow extends Component{
	render(){
		return(
			<tr>
				<td>{this.props.date ? this.props.date : this.props.index}</td>
				<td> {this.props.position && this.props.position.latitudeDegrees ? this.props.position.latitudeDegrees : 0} </td>
				<td>{this.props.position && this.props.position.longitudeDegrees ? this.props.position.longitudeDegrees : 0}</td>
				<td>{this.props.altitudeMeters ? this.props.altitudeMeters : 0}</td>
			</tr>
		);
	}
}

export default RouteContainer;