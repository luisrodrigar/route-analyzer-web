
import {Exception} from './Exception'
import axios from 'axios';

export function get(id){
	const path = "http://localhost:8080/RouteAnalyzer/activity/" + id ;
	return axios
		.get(path)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception("Not match any activity with the id passed as a parameter.");
    	});
}

export function exportAs(id, type){
	const path = "http://localhost:8080/RouteAnalyzer/activity/" + id + "/export/" + type ;
	return axios
		.get(path)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception("Problem trying to export the file as " + type);
    	});
}

export function removePoint(id, position, timeInMillis, index){
	const path = "http://localhost:8080/RouteAnalyzer/activity/" + id +"/remove/point";

	const latParam = "lat="+position.lat;
	const lngParam = "lng="+position.lng;

	const positionParam = latParam+"&"+lngParam;
	const timeInMillisParam = isNaN(timeInMillis) ? null : "timeInMillis=" + timeInMillis ;
	const indexParam = "index="+index;
	
	const url = path + "?" + positionParam + (timeInMillisParam ? "&" + timeInMillisParam : "&timeInMillis=") + "&" + indexParam;

	return axios
		.put(url)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception(err.response.data.description);
    	});
}

export function removeLaps(id,dataSelected){
	const path = "http://localhost:8080/RouteAnalyzer/activity/" + id +"/remove/laps";
	
	const indexLaps = dataSelected.map(lap => {
		return lap.indexLap;
	}).join(",");

	const startTimeLaps = dataSelected.map(lap => {
		return lap.startTime?lap.startTime:null;
	}).join(",");

	const url = path + "?date=" + startTimeLaps + "&index=" + indexLaps;

	return axios
		.put(url)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception(err.response.data.description);
    	});
}

export function setColors(id, data){
	const path = "http://localhost:8080/RouteAnalyzer/activity/" + id +"/color/laps";

	const url = path + "?data=" + data;

	return axios
		.put(url)
		.then()
    	.catch(err => {
    		throw new Exception(err.response.data.description);
    	});
}