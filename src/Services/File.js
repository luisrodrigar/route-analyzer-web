import axios from 'axios';
import Exception from '../Exception'

export function uploadFile(formData) {
   this.path = "http://localhost:8080/RouteAnalyzer/file/upload";
    axios
      .post(this.path, formData)
      .then(res => { 
        return res.data[0]; 
      } )
      .catch(err =>{
        throw new Exception(err.response.data.description);
      });
}



export default File;