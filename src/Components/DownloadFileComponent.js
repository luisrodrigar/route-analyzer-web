import React, {Component} from 'react';
import {get} from '../Services/file';
import {exportAs} from '../Services/activity';
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

  	export(type) {
		exportAs(this.props.id, type)
			.then(response => {
				FileDownload(response, this.props.id + "_" + type + '.xml');
			})
			.catch(err =>{
				alert(err.message);
			});
  	}
  	
	render() {
	   	return(
	   		<div>
		   		<button onClick={this.download}>Download file </button>
		   		<button onClick={()=>this.export('tcx')}>Export as TCX</button>
		   		<button onClick={()=>this.export('gpx')}>Export as GPX</button>
	   		</div>
	 	);
	}
}



export default DownloadFileComponent;