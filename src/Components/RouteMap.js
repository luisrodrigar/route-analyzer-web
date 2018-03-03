import React, { PureComponent } from 'react';
import {getLapsTrackPoints, recalculateLapValues} from '../Utils/lapOperations';
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
    this.removeLocation = this.removeLocation.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.laps !== this.props.laps){
      this.setState({
        laps: getLapsTrackPoints(this.props.laps)
      });
    }
  }


  handleInfoClose(key){
      this.setState({
          keys: this.getKeysWithoutKey(key)
      });
  }

  getKeysWithoutKey(key){
    let index = this.state.keys.indexOf(key);
    if(index>=0)
      return [...this.state.keys.slice(0,index),...this.state.keys.slice(index+1)];
    else
      return this.state.keys;
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

  removeLocation(position,date,index){
    // Remove element from the laps stored in state
    // If it is not at the begining or in the end of a lap
    // the lap splits into two new ones.
    let indexLap = null, indexPosition = null;
    this.state.laps.forEach(
      (lap, index)=> {lap.tracks.forEach(
        (track, indexTrack)=>{
            if(track.position.lat === position.lat && track.position.lng === position.lng && 
              ((track.date && track.date === date)||(track.index && track.index === index))
            )
              indexPosition = indexTrack;
        })
        if(indexPosition!==null && indexLap == null)
          indexLap = index;
      });

    let sizeOfTrackPoints = this.state.laps[indexLap].tracks.length;

    // Track point not start nor end. Thus, it slipt into two laps
    if(indexPosition > 0 && indexPosition < this.state.laps[indexLap].tracks.length-1){
      let lapSplitLeft = Object.assign({},this.state.laps[indexLap]), lapSplitRight = Object.assign({},this.state.laps[indexLap]);
      lapSplitLeft.tracks = [...lapSplitLeft.tracks.slice(0,indexPosition)];
      recalculateLapValues(lapSplitLeft);
      lapSplitLeft.cal = this.state.laps[indexLap].cal ? (lapSplitLeft.tracks.length * 1000 / sizeOfTrackPoints) * this.state.laps[indexLap].cal : null;
      lapSplitRight.tracks = [...lapSplitRight.tracks.slice(indexPosition+1)];
      recalculateLapValues(lapSplitRight);
      lapSplitRight.cal = this.state.laps[indexLap].cal ? (lapSplitRight.tracks.length * 1000 / sizeOfTrackPoints) * this.state.laps[indexLap].cal : null;
      lapSplitRight.index++;
      this.state.laps.slice(indexLap+1).map((lap)=>++lap.index);
      this.setState({
        laps: [...this.state.laps.slice(0,indexLap),lapSplitLeft,lapSplitRight,...this.state.laps.slice(indexLap+1)],
        keys: this.getKeysWithoutKey(indexLap + "_" + indexPosition)
      })
    }
    // Start or end, it doesnt split into two laps, just delete the track point.
    else{
      let newLap = Object.assign({}, this.state.laps[indexLap]);
      newLap.tracks = [...newLap.tracks.slice(0,indexPosition),...newLap.tracks.slice(indexPosition+1)];
      
      this.setState({
        laps: [...this.state.laps.slice(0,indexLap),newLap,...this.state.laps.slice(indexLap+1)],
        keys: this.getKeysWithoutKey(indexLap + "_" + indexPosition)
      })
    }
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
            handleRemoveMarker={this.removeLocation}
            keys={this.state.keys}
          />
      );
    } else {
      return(<p>No data map</p>);
    }
  }
}

export default RouteMap;