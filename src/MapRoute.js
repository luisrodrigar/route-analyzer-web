import React, { Component } from 'react';
import Exception from './Exception'
import Activity from './Services/Activity'
import DownloadFileComponent from './Components/DownloadFileComponent'
import axios from 'axios';
import './MapRoute.css';

class LapRow extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<tr>
				<td colSpan="4">{this.props.value}</td>
			</tr>
		);
	}
}

class TrackPointRow extends Component{
	constructor(props){
		super(props);
	}

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


class MapRoute extends Component {

	constructor(props){
		super(props);
		this.state = {activity:{}}
	}

	setLocationRows(){
		this.state.activity.laps.forEach(lap=>{
	      		this.rows.push(<LapRow key={lap.index} value={lap.startTime ? lap.startTime : lap.index}/>);
				lap.tracks.forEach(track => {
					this.rows.push(<TrackPointRow key={track.date ? track.date : track.index} 
						date={track.date} position={track.position} altitudeMeters={track.altitudeMeters}/>);
				});
			});
	}

	render(){
		const host = "http:\/\/localhost:8080\/RouteAnalyzer";
		const baseDir = "\/file\/get";
		const query = "?" + "id-file=" + this.state.activity.id + "&type=" + this.state.activity.sourceXmlType;
		this.url = host + baseDir + query;

		this.rows = [];

		if(this.props.id){
			try{
				this.setState({activity: File.getActivity(this.props.id)});
			}catch(exception){
				alert(exception.message);
			}
	    }
		
		if(this.state.activity.laps){
	      	this.setLocationRows();
		}
		
		return (
		<div>
			<DownloadFileComponent url={this.url} />
			<table>
				<thead>
					<tr>
						<td>TIME</td>
						<td>LONGITUD</td>
						<td>LATITUD</td>
						<td>ALTITUD</td>
					</tr>
				</thead>
				<tbody>
					{this.rows}
				</tbody>
			</table>
		</div>
		);
	}

}

export default MapRoute;