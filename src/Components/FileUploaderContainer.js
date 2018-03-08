import React, { Component } from 'react';
import {upload} from '../Services/file';
import './FileUploaderContainer.css';


class FileUploaderContainer extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.showProgressIcon();
    const formData = new FormData();
    formData.append("name", "name de ejemplo");
    formData.append('file', this.fileInput.files[0]);
    formData.append('type', this.type.value);
    
    upload(formData)
      .then(idActivity => {
        this.props.showMapRoute(idActivity);
      })
      .catch(err => {
        alert(err.message);
      });

  };

  render() {
    return (
      <div className="FileUploaderContainer">
      <form className="FileUploaderForm" onSubmit={this.handleSubmit}>
        <input 
          type="file" 
          ref={input => { this.fileInput = input; }} />
        <select defaultValue="gpx" className="optionFileUploaderForm" ref={option => { this.type = option; }} >
          <option value='gpx'>gpx</option>
          <option value='tcx'>tcx</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default FileUploaderContainer;