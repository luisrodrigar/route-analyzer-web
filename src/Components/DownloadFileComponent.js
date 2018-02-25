import React, {Component} from 'react';
import {get} from '../Services/file';
import FileDownload from 'js-file-download';

export class DownloadFileComponent extends Component {

	constructor(props){
	    super(props);
	    this.download = this.download.bind(this);
  	}

	download() {
		get(this.props.id, this.props.type)
			.then(response => {
				FileDownload(response, this.props.id + "_" + this.props.type + '.xml');
			})
			.catch(err =>{
				alert(err.message);
			});
  	}
  	
	render() {
	   	return(
	   		<button onClick={this.download}>Download file </button>
	 	);
	}
}



export default DownloadFileComponent;