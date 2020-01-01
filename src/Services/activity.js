
import {Exception} from './Exception'
import axios from 'axios';

const DIR_BASE = "https://route-analyzer-api.herokuapp.com";

export const EXCEPTION_MESSAGE_NOT_FOUND = "Not match any activity with the id passed as a parameter.";
export const EXCEPTION_MESSAGE_ERROR_EXPORT = "Problem trying to export the file as ";
export const EXCEPTION_MESSAGE_ERROR_SET_COLORS = "It cannot be posible to set the colors";

export function get(id){
	const path = DIR_BASE + "/activity/" + id ;
	return axios
		.get(path)
    	.then(res => res.data)
    	.catch(err => {
    		console.log(err)
    		throw new Exception(EXCEPTION_MESSAGE_NOT_FOUND);
    	});
}

export function exportAs(id, type){
	const path = DIR_BASE + "/activity/" + id + "/export/" + type ;
	return axios
		.get(path)
    	.then(res => res.data)
    	.catch(err => {
    		console.log(err);
    		throw new Exception(EXCEPTION_MESSAGE_ERROR_EXPORT + type);
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
    		console.log(err);
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
    		console.log(err);
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
    		console.log(err);
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
    		console.log(err);
    		throw new Exception(err.response.data.description);
    	});
}

export function setColors(id, data){
	const url = DIR_BASE + "/activity/" + id +"/color/laps?data=" + data;
	return axios
		.put(url)
		.then()
    	.catch(err => {
    		console.log(err);
    		throw new Exception(EXCEPTION_MESSAGE_ERROR_SET_COLORS);
    	});
}

function getPositionParams(position){
	return "lat="+position.lat+"&lng="+position.lng;
}
