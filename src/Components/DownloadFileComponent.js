import React, {Component} from 'react';

export class DownloadFileComponent extends Component {

	constructor(props){
	    super(props);
	    this.download = this.download.bind(this);
  	}

	download = function() {
	    setTimeout(() => {
	      const response = {
	        file:this.props.url,
	      };
	      window.open(response.file);
	    }, 100);
  	}
	  render() {
	    return(
	      <button onClick={this.download}>Download file </button>
	    );
	  }
}

export default DownloadFileComponent;