import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router } from 'react-router-dom'
import FileUploaderContainer from './Components/FileUploaderContainer';
import RouteContainer from './Components/RouteContainer';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      showMap: false
    };
    this.showMapRoute = this.showMapRoute.bind(this);
  }

  showMapRoute = function(idParam){
    this.setState({showMap:true, id:idParam});
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
          <FileUploaderContainer showMapRoute={this.showMapRoute}/>
          {this.state.showMap && <RouteContainer id={this.state.id}/>}
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
