import React, { PureComponent } from 'react';
import {getLapsTrackPoints} from '../Utils/lapOperations';
import { Marker } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import RouteMapComponent from './RouteMapComponent'

class RouteMap extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      laps: [],
      map:null
    }
    this.calculateCenterZoom = this.calculateCenterZoom.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.laps !== this.props.laps){
      this.setState({
        laps: getLapsTrackPoints(this.props.laps)
      });
    }
  }

  calculateCenterZoom(map){
    // Zoom to markers (all positions of the route)
    const bounds = new window.google.maps.LatLngBounds();
    // If it calls before this methos, it uses the state stored in the state
    if(this.state.map && !map)
      map = this.state.map;
    if(map){
      map.props.children.forEach((element) => {
          // Start or being of the route
          if (element.type === Marker) {
            let position = element.props.position;
            bounds.extend(new window.google.maps.LatLng(position.lat, position.lng));
          } 
          // Markers between start and ending, can be split into laps
          else if(element.type === MarkerClusterer){
            element.props.children.forEach((markerClustererLap)=>{
              markerClustererLap.filter((x)=>x && true).forEach((childTrack)=>{
                let position = childTrack.props.position;
                bounds.extend(new window.google.maps.LatLng(position.lat,position.lng));
              })
            })
          }
      })
      map.fitBounds(bounds);
    }
    // Save the map in the state of the component
    if(!this.state.map && map){
      this.setState({
        map
      });
    }
  }

  render() {
    if(this.state.laps.length){
      return (
          <RouteMapComponent 
            laps={this.state.laps} 
            fitBound={this.calculateCenterZoom}
          />
      );
    } else {
      return(<p>No data map</p>);
    }
  }
}

export default RouteMap;