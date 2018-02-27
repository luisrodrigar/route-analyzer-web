
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from "react-google-maps";

const PolylineComponent = 
  withScriptjs(withGoogleMap(props =>
    <GoogleMap key='1' defaultZoom={11} defaultCenter={{lat:40.7978271737, lng:-73.9744663239}}> 
      {props.path.map( lap => <Polyline key={lap.index} path={lap} geodesic={true}/> )}
    </GoogleMap>
));

class RouteMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      path: []
    }
  }

   componentDidUpdate(prevProps, prevState) {
    if(prevProps.laps !== this.props.laps){
      this.setState({
        path: this.getLapsTrackPoints(this.props.laps)
      });
    }
  }

  getLapTrackPoint(lap){
    return lap.tracks.map(track => {
        var lat = parseFloat(track.position.latitudeDegrees);
        var lng = parseFloat(track.position.longitudeDegrees);
        return {
          lat,
          lng
        };
    });
  }

  getLapsTrackPoints(laps){
    return laps.map(lap => {
        return this.getLapTrackPoint(lap);
    });
  }

  render() {
    if(this.state.path.length){
      return (
          <PolylineComponent
            googleMapURL= "https://maps.googleapis.com/maps/api/js?key=AIzaSyDEtc96UC9co31AFUNuNsPZ1xV4SYEMwfA&v=3.exp&libraries=geometry,drawing,places"
            loadingElement= {<div style={{ height: '100%' }} />}
            containerElement= {<div style={{ height: '600px', width: '900px' }} />}
            mapElement= {<div style={{ height: '100%' }} />}
            path={this.state.path}/>
      );
    } else {
      return(<p>No data map</p>);
    }
  }
}

export default RouteMap;