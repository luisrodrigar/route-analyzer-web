import React, { PureComponent } from 'react';
import {getLapsTrackPoints} from '../Utils/lapOperations';
import {Polyline} from 'react-google-maps';
import RouteMapComponent from './RouteMapComponent';

class RouteMap extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      laps: [],
      keys: [],
      map:null
    }
    this.calculateCenterZoom = this.calculateCenterZoom.bind(this);
    this.handleInfoClose = this.handleInfoClose.bind(this);
    this.handleMarkClick = this.handleMarkClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.laps !== this.props.laps){
      this.setState({
        laps: getLapsTrackPoints(this.props.laps)
      });
    }
  }

  handleInfoClose(key){
    let index = this.state.keys.indexOf(key);
    if(index>=0)
      this.setState({
          keys: [...this.state.keys.slice(0,index),...this.state.keys.slice(index+1)]
        });
  }

  handleMarkClick(key){
    let index = this.state.keys.indexOf(key);
    if(index===-1){
      this.setState({
        keys: [...this.state.keys, key]
      });
    } else{
      this.setState({
          keys: [...this.state.keys.slice(0,index),...this.state.keys.slice(index+1)]
        });
    }
                
  }

  removeLocation(indexLap,indexTrackPoints,date,lat,long,index){
    // Remove element from the laps stored in state
    // If it is not at the begining or in the end of a lap
    // the lap splits into two new ones.
    let lap = this.state.laps[indexLap];
    //let indexToRemove = lap[lap.map((element)=>element.position.lat+"_"+element.position.lng).indexOf(lat+"_"+lng)];
    //lap.slice(indexToRemove)
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
    if(this.state.laps.length){
      return (
          <RouteMapComponent 
            laps={this.state.laps} 
            fitBound={this.calculateCenterZoom} 
            handleMarkClick={this.handleMarkClick} 
            handleInfoClose={this.handleInfoClose}
            keys={this.state.keys}
          />
      );
    } else {
      return(<p>No data map</p>);
    }
  }
}

export default RouteMap;