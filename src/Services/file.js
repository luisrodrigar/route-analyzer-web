import Exception from './Exception'
import axios from 'axios';

export function upload(formData) {
   const path = "https://routeanalyzer-api.herokuapp.com/file/upload";
    return axios
      .post(path, formData)
      .then(res => res.data[0])
      .catch(err => {
        throw new Exception(err.response.data.description);
      });
}

export function get(id, type) {
   const path = "https://routeanalyzer-api.herokuapp.com/file/get/"+type+"/"+id;
    return axios
      .get(path)
      .then(res => res.data)
      .catch(err => {
        throw new Exception(err.response.data.description);
      });
}
