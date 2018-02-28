import React, { Component } from 'react';
import {getLapsTrackPoints, getCenterLaps} from '../Utils/lapOperations';
import RouteMapComponent from './RouteMapComponent'

class RouteMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      path: [],
      center: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.laps !== this.props.laps){
      this.setState({
        path: getLapsTrackPoints(this.props.laps),
        center: getCenterLaps(this.props.laps)
      });
    }
  }

  render() {
    if(this.state.path.length){
      return (
          <RouteMapComponent
            path={this.state.path}
            center={this.state.center} />
      );
    } else {
      return(<p>No data map</p>);
    }
  }
}

export default RouteMap;