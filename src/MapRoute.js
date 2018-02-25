import React, { Component } from 'react';
import {get} from './Services/activity';
import DownloadFileComponent from './Components/DownloadFileComponent';
import './MapRoute.css';

class MapRoute extends Component {

	constructor(props){
		super(props);
		this.setLocationRows = this.setLocationRows.bind(this);
		this.setURLDownloadFile = this.setURLDownloadFile.bind(this);
		this.state = {activity: {}};
		if(this.props.id){
			get(this.props.id)
				.then( activityObject => {
					this.setState({activity: activityObject});
				})
				.catch( err => {
					alert(err.message);
				});
	    }
		
	}

	setLocationRows(){
		this.rows = [];
		this.state.activity.laps.forEach(lap=>{
	      		this.rows.push(<LapRow key={lap.index} value={lap.startTime ? lap.startTime : lap.index}/>);
				lap.tracks.forEach(track => {
					this.rows.push(<TrackPointRow key={track.date ? track.date : track.index} 
						date={track.date} position={track.position} altitudeMeters={track.altitudeMeters}/>);
				});
			});
	}

	setURLDownloadFile(){
		const host = "http://localhost:8080/RouteAnalyzer";
		const baseDir = "/file/get";
		const query = "?id-file=" + this.state.activity.id + "&type=" + this.state.activity.sourceXmlType;

		this.url = host + baseDir + query;
	}

	render(){
		if(this.state.activity && this.state.activity.laps){
			this.setURLDownloadFile();
			this.setLocationRows();
			
			return (
				<div>
					<DownloadFileComponent url={this.url} />
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

export default MapRoute;