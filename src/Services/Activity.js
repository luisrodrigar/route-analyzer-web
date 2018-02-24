import axios from 'axios';
import Exception from '../Exception'

export function getActivity(idActivity){
	axios.get("http://localhost:8080/RouteAnalyzer/activity/"+idActivity)
    	.then(res => {
			return res.data;
	     })
    	.catch(err => {
    		throw new Exception("Not mach any activity with the id passed as a parameter.");
    	});
}