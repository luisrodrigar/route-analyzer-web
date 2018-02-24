import React, { Component } from 'react';
import File from './Services/File';
import './FileUploaderForm.css';


class FileUploaderForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", "name de ejemplo");
    formData.append('file', this.fileInput.files[0]);
    formData.append('type', this.type.value);
    try{
      this.props.showMapRoute(File.uploadFile(formData));
    } catch (exception){
      alert(exception.message);
    }
  };

  render() {
    return (
      <form className="FileUploaderForm" onSubmit={this.handleSubmit}>
        <label>
          Type
          <select defaultValue="gpx" className="optionFileUploaderForm" ref={option => { this.type = option; }} >
            <option value='gpx'>GPX</option>
            <option value='tcx'>TCX</option>
          </select>
        </label>
        <input 
          type="file" 
          ref={input => { this.fileInput = input; }} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default FileUploaderForm;