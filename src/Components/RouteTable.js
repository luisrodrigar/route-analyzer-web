import React, { Component } from 'react';

class RouteTable extends Component{

	constructor(props){
		super(props);
		this.state = {
			laps: props.laps
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.laps!==this.props.laps)
			this.setState({
				laps: this.props.laps
			});
	}

	render(){
		return(
			<table>
				<RouteTableHeader />
				<RouteTableBody laps={this.state.laps}/>
			</table>
		);
	}
}

class RouteTableBody extends Component {

	constructor(props){
		super(props);
		this.setLocationRows = this.setLocationRows.bind(this);
		this.setLocationRows();
	}

	setLocationRows(){ 
		let newRows = [];
		this.props.laps.forEach(lap=>{
      		newRows.push(<LapRow key={lap.index} value={lap.startTime ? new Date(lap.startTime).toLocaleDateString() + " " + new Date(lap.startTime).toLocaleTimeString()  : lap.index}/>);
			lap.tracks.forEach(track => {
				newRows.push(<TrackPointRow key={track.date ? track.date : track.index + "_trackpoint"} 
					track={track}/>);
			});
		});
		this.setState({
			rows: [...newRows]
		});
	}

	componentWillMount(){
		this.setLocationRows();
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.laps!==this.props.laps)
			this.setLocationRows();
	}

	render(){
		return(
			<tbody>
			{this.state.rows}			
			</tbody>
		);
	}
}

class RouteTableHeader extends Component {
	render(){
		return(
			<thead>
				<tr>
					<td rowSpan={2}>Time</td>
					<td colSpan={2}>Position</td>
					<td rowSpan={2}>Altitude</td>
					<td rowSpan={2}>Distance</td>
					<td rowSpan={2}>Speed</td>
					<td rowSpan={2}>Bpm</td>
				</tr>
				<tr>
					<td>Latitude</td>
					<td>Longitude</td>
				</tr>
			</thead>
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
				<td>{this.props.track.date ? new Date(this.props.track.date).toLocaleTimeString() : this.props.track.index}</td>
				<td>{this.props.track.position && this.props.track.position.lat ? this.props.track.position.lat : 0} </td>
				<td>{this.props.track.position && this.props.track.position.lng ? this.props.track.position.lng : 0}</td>
				<td>{this.props.track.alt ? this.props.track.alt : 0}</td>
				<td>{this.props.track.dist ? this.props.track.dist : 0}</td>
				<td>{this.props.track.speed ? this.props.track.speed : 0}</td>
				<td>{this.props.track.bpm ? this.props.track.bpm : 0}</td>
			</tr>
		);
	}
}

export default RouteTable;
