import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps";
import {getLapsTrackPoints, getCenterLaps} from '../Utils/lapOperations';
import randomColor from 'randomcolor'; 

const PolylineComponent = 
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDEtc96UC9co31AFUNuNsPZ1xV4SYEMwfA&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: '100%' }} />,
      containerElement: <div style={{ height: '600px', width: '700px' }} />,
      mapElement: <div style={{ height: '100%' }} />
    }),
    lifecycle({
      componentWillMount() {
        this.setState({
          onMapMounted: ref => {
            this.map = ref;
          }
        });
      },
      componentDidMount() {
        //this.map.fitBounds(bounds);
      }
    }),
    withScriptjs,
    withGoogleMap
  )(props =>
    <GoogleMap 
      ref={props.onMapMounted}
      defaultZoom={12}
      center={props.center}>
      {
        props.path.map( (lap, index) => {
          const strokeColor = randomColor();
          return <Polyline key={index} 
                    path={lap} 
                    options={
                      {
                        strokeColor,
                        strokeOpacity: 3.0,
                        strokeWeight: 1,
                      }
                    }
          />} 
        )
      }
      {
        props.path.map( (lap, index) => {
          return lap.map( (position, index) => {
          return  <Marker key={index} 
                          position={position} 
                          
                  />
          }) 
        })
      }
    </GoogleMap>
  );

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
          <PolylineComponent
            path={this.state.path}
            center={this.state.center} />
      );
    } else {
      return(<p>No data map</p>);
    }
  }
}

export default RouteMap;