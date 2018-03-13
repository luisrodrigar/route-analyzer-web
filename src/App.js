import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router } from 'react-router-dom'
import FileUploaderContainer from './Components/FileUploaderContainer';
import RouteContainer from './Components/RouteContainer';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import blue from 'material-ui/colors/blue';
import './App.css';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      showMap: false,
      progress: false
    };
    this.showMapRoute = this.showMapRoute.bind(this);
    this.showProgressIcon = this.showProgressIcon.bind(this);
    this.hideProgressIcon = this.hideProgressIcon.bind(this);
  }

  showMapRoute = function(idParam){
    if(idParam)
      this.setState({showMap:true, id:idParam, progress: false});
    else
      this.hideProgressIcon();
  }

  showProgressIcon = function(){
    this.setState({progress: true});
  }

  hideProgressIcon = function(){
    this.setState({progress: false});
  }

  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Route Analyzer</h1>
        </header>
        <div className="App-intro">
          <FileUploaderContainer showProgressIcon={this.showProgressIcon} showMapRoute={this.showMapRoute} />
          {this.state.progress && <CircularProgress style={{ color: blue[600] }} size={240} />}
          {this.state.showMap && <RouteContainer id={this.state.id}/>}
        </div>
      </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
