import React, { Component } from 'react';
import {BrowserRouter as Router } from 'react-router-dom'
import FileUploaderContainer from './Components/FileUploaderContainer';
import RouteContainer from './Components/RouteContainer';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from "react-redux";
import blue from 'material-ui/colors/blue';
import './App.css';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const mapStateToProps = state => {
  return { 
    showRoute: state.app.showRoute,
    progress: state.app.progress,
    id: state.app.id
  };
};

export class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        {this.props.progress && 
            <div className={"loading-div"}>
            <CircularProgress style={{ 
                                color: blue[600],
                                }}
                              size={240}
            />
            </div>
        }
        <header className="App-header">
          <h1 className="App-title">Route Analyzer</h1>
        </header>
        <div className="App-intro">
          <FileUploaderContainer/>
          {this.props.showRoute && <RouteContainer id={this.props.id}/>}
        </div>
      </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(App));
