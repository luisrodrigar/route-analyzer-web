import Exception from './Exception'
import axios from 'axios';

const DIR_BASE = "http://ec2-52-214-69-233.eu-west-1.compute.amazonaws.com:8080";

export function upload(formData) {
   const path = DIR_BASE + "/file/upload";
    return axios
      .post(path, formData)
      .then(res => res.data[0])
      .catch(err => {
        throw new Exception(err.response.data.description);
      });
}

export function get(id, type) {
   const path = DIR_BASE + "/file/get/"+type+"/"+id;
    return axios
      .get(path)
      .then(res => res.data)
      .catch(err => {
        throw new Exception(err.response.data.description);
      });
}
