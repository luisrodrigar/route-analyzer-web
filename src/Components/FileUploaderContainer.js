import React, { Component } from 'react';
import {upload} from '../Services/file';
import { connect } from "react-redux";
import { showRoute, toggleProgress } from "../actions/index";
import './FileUploaderContainer.css';

const mapDispatchToProps = dispatch => {
  return {
    actionShowRoute: id => dispatch(showRoute(id)),
    toggleProgress: isEnable => dispatch(toggleProgress(isEnable))
  };
};

class FileUploaderContainer extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.toggleProgress(true);
    const formData = new FormData();
    formData.append("name", "name de ejemplo");
    formData.append('file', this.fileInput.files[0]);
    formData.append('type', this.type.value);
    
    upload(formData)
      .then(idActivity => {
        this.props.actionShowRoute(idActivity);
      })
      .catch(err => {
        alert(err.message);
        this.props.actionShowRoute(null);
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

export default connect(null,mapDispatchToProps)(FileUploaderContainer);