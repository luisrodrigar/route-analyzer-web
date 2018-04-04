import React, { Component } from 'react';
import {Polyline} from 'react-google-maps';
import RouteMapComponent from './RouteMapComponent';
import Paper from 'material-ui/Paper';
import { connect } from "react-redux";
import './RouteMapContainer.css';

const mapStateToProps = state => {
  return { 
    laps:               state.container.laps,
    idLap:              state.container.indexLap,
    idTrackpoint:       state.container.indexTrackpoint,
    currentTrackpoint:  state.container.currentTrackpoint
  };
};
 
class RouteMapContainer extends Component {

	constructor(props){
    super(props);
    this.state = {
      keys: [],
      map:null
    }
    this.calculateCenterZoom = this.calculateCenterZoom.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
    this.handleMarkClick = this.handleMarkClick.bind(this);
    this.handleDeletePoint = this.handleDeletePoint.bind(this);
  }

  getKeysWithoutKey(key){
    let index = this.state.keys.indexOf(key);
    if(index>=0)
      return [...this.state.keys.slice(0,index),...this.state.keys.slice(index+1)];
    else
      return this.state.keys;
  }

  handleInfoClose(key){
      this.setState({
          keys: this.getKeysWithoutKey(key)
      });
  }

  handleMarkClick(key){
    let index = this.state.keys.indexOf(key);
    if(index===-1){
      this.setState({
        keys: [key, ...this.state.keys]
      });
    } else{
      this.setState({
          keys: [...this.state.keys.slice(0,index),...this.state.keys.slice(index+1)]
        });
    }            
  }

  handleDeletePoint(position, date, index, keyMarker){
  	this.props.handleRemoveMarker(position, date, index);
  	this.setState({
       	keys: this.getKeysWithoutKey(keyMarker)
    });
  }

  calculateCenterZoom(map){
    // Zoom to markers (all positions of the route)
    const bounds = new window.google.maps.LatLngBounds();
    // If it calls before this methos, it uses the state stored in the state
    if(this.state.map && !map)
      map = this.state.map;
    if(map){
      map.props.children.filter((element)=> (element instanceof Array))[0]
      .forEach((lap) => {
        if(lap.type === Polyline){
          lap.props.path.forEach((position)=>{
            bounds.extend(new window.google.maps.LatLng(position.lat, position.lng));
          });
        }
      });
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
    if(this.props.laps.length){
      return (
          <RouteMapComponent 
            loadingElement={
              <div style={
                  { height: '100%' }
                } 
              />
            }
            containerElement= {
              <Paper style={
                { height: '424px', 
                  width: '100%' , 
                  'marginTop': '24px'
                }
              } 
              />
            }
            mapElement= {
              <div style={
                { height: '100%' }
              } 
              />
            }
            fitBound={this.calculateCenterZoom} 
            handleMarkClick={this.handleMarkClick} 
            handleInfoClose={this.handleInfoClose} 
            handleRemoveMarker={this.handleDeletePoint} 
            handleSplitLap={this.props.handleSplitLap}
            currentTrack={this.props.idLap + "_" + this.props.idTrackpoint}
            track={this.props.currentTrack}
            keys={this.state.keys}
            laps={this.props.laps}
          />
      );
    } else {
      return(<p>No data map</p>);
    }
  }

}

export default connect(mapStateToProps)(RouteMapContainer);