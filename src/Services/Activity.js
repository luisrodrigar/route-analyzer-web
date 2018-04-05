
import {Exception} from './Exception'
import axios from 'axios';

const DIR_BASE = "https://routeanalyzer-api.herokuapp.com/";

export function get(id){
	const path = DIR_BASE + "/activity/" + id ;
	return axios
		.get(path)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception("Not match any activity with the id passed as a parameter.");
    	});
}

export function exportAs(id, type){
	const path = DIR_BASE + "/activity/" + id + "/export/" + type ;
	return axios
		.get(path)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception("Problem trying to export the file as " + type);
    	});
}

export function joinLaps(id, dataSelected){
	let indexLap1 = dataSelected[0].indexLap - 1;
	let indexLap2 = dataSelected[1].indexLap - 1;

	const url = DIR_BASE + "/activity/" + id +"/join/laps?index1=" 
		+ indexLap1 + "&index2=" + indexLap2;

	return axios
		.put(url)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception(err.response.data.description);
    	});
}

export function removePoint(id, position, timeInMillis, index){
	const positionParam = getPositionParams(position);
	const time = !timeInMillis || isNaN(timeInMillis) ? null : "timeInMillis=" + timeInMillis ;
	const indexParam = "index="+index;
	
	const url = DIR_BASE + "/activity/" + id +"/remove/point?" 
		+ positionParam + (time ? "&" + time : "&timeInMillis=") + "&" + indexParam;

	return axios
		.put(url)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception(err.response.data.description);
    	});
}

export function splitLap(id, position, timeInMillis, index){
	const positionParam = getPositionParams(position);
	const time = !timeInMillis || isNaN(timeInMillis) ? null : "timeInMillis=" + timeInMillis ;
	const indexParam = "index="+index;
	
	const url = DIR_BASE + "/activity/" + id +"/split/lap?" + positionParam + "&" + indexParam + (time ? "&" + time : "&timeInMillis=");

	return axios
		.put(url)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception(err.response.data.description);
    	});
}

export function removeLaps(id,dataSelected){

	const indexLaps = dataSelected.map(lap => {
		return lap.indexLap;
	}).join(",");

	const startTimeLaps = dataSelected.map(lap => {
		return lap.startTime?lap.startTime:null;
	}).join(",");

	const url = DIR_BASE + "/activity/" + id +"/remove/laps?date=" + startTimeLaps + "&index=" + indexLaps;

	return axios
		.put(url)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception(err.response.data.description);
    	});
}

export function setColors(id, data){
	const url = DIR_BASE + "/activity/" + id +"/color/laps?data=" + data;
	return axios
		.put(url)
		.then()
    	.catch(err => {
    		throw new Exception("It cannot be posible to set the colors");
    	});
}

function getPositionParams(position){
	return "lat="+position.lat+"&lng="+position.lng;
}