
import {Exception} from './Exception'
import axios from 'axios';

export function get(id){
	const path = "http://localhost:8080/RouteAnalyzer/activity/" + id ;
	return axios
		.get(path)
    	.then(res => res.data)
    	.catch(err => {
    		throw new Exception("Not mach any activity with the id passed as a parameter.");
    	});
}