import Exception from '../Exception'
import axios from 'axios';

export function upload(formData) {
   const path = "http://localhost:8080/RouteAnalyzer/file/upload";
    return axios
      .post(path, formData)
      .then(res => res.data[0])
      .catch(err => {
        throw new Exception(err.response.data.description);
      });
}