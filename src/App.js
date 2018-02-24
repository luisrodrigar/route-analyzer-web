import React, { Component } from 'react';
import logo from './logo.svg';
import FileUploaderForm from './FileUploaderForm';
import MapRoute from './MapRoute';
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Route Analyzer</h1>
        </header>
        <div className="App-intro">
          <FileUploaderForm showMapRoute={this.showMapRoute}/>
          {this.state.showMap && <MapRoute id={this.state.id}/>}
        </div>
      </div>
    );
  }
}

export default App;
