
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
import iconMarker from './marker_default.png';
import './RouteMapComponent.css';

const RouteMapComponent =  
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDEtc96UC9co31AFUNuNsPZ1xV4SYEMwfA&v=3.exp&libraries=geometry,drawing,places"
    }),
    lifecycle({
      componentDidUpdate(prevProps, prevState) {
        if(prevProps.laps !== this.props.laps){
          this.props.fitBound(this.props.map);
        }
      }
    }),
    withScriptjs,
    withGoogleMap
  )(props =>

    <GoogleMap 
      ref={props.fitBound}
      defaultZoom={12}
      mapTypeId= {'terrain'}>
      {
        props.laps.map( (lap) => {
          const strokeColor = lap.color;
          const path = lap.tracks.map((track)=>track.position);
          return <Polyline key={lap.index} 
                    path={path} 
                    options={
                      {
                        strokeColor,
                        strokeOpacity: 3.0,
                        strokeWeight: 6,
                      }
                    }
          />} 
        )
      }
      {
        props.laps.map( (lap) => {
          let defaultIcon = iconMarker;
          return lap.tracks.map((track)=>{
            return <MarkerInfoViewComponent 
              key={lap.index + "_" + track.index}
              trackPoint={track}
              indexLap={props.laps.indexOf(lap)}
              indexTrackpoint={lap.tracks.indexOf(track)}
              sizeLaps = {props.laps.length}
              sizeTrackpoints = {lap.tracks.length}
              handleMarkClick={props.handleMarkClick}
              handleInfoClose={props.handleInfoClose}
              handleSplitLap={props.handleSplitLap}
              handleRemoveMarker={props.handleRemoveMarker}
              handleMouseOver={props.handleMouseOver}
              currentTrack={props.currentTrack}
              defaultIcon={defaultIcon}
              keys={props.keys}
            />
          })
        })
      }
    </GoogleMap>
  );

class MarkerInfoViewComponent extends Component{

  constructor(props){
    super(props);
    this.isEnd = this.isEnd.bind(this);
  }

  containsKey(keys,key){
    return keys.includes(key);
  }; 

  isStart(indexLap, indexTrackpoint){
    switch(indexLap){
      case 0:
        switch(indexTrackpoint){
          case 0:
            return true;
          default:
            return false;
        }
      default:
        return false;
    }
  }

  isEnd(indexLap, indexTrackpoint){
    const {sizeLaps,sizeTrackpoints} = this.props;
    const lastLapIndex = sizeLaps-1;
    const lastTrackpoint = sizeTrackpoints-1;
    switch(indexLap){
      case lastLapIndex:
        switch(indexTrackpoint){
          case lastTrackpoint:
            return true;
          default:
            return false;
        }
      default:
        return false;
    }
  }

  isStartOrEndPoint(indexLap, indexTrackpoint){
    return this.isStart(indexLap, indexTrackpoint) || this.isEnd(indexLap, indexTrackpoint);
  }

  render(){
    const {indexLap,indexTrackpoint,sizeTrackpoints} = this.props;
    // key marker
    const keyMarker = this.props.indexLap +"_"+this.props.indexTrackpoint;
    const isStartPoint = this.isStart(indexLap, indexTrackpoint);
    const isEndPoint = this.isEnd(indexLap, indexTrackpoint);
    let label = null;
    let icon = null;
    // Start
    if(isStartPoint)
      label = "A";
    // End
    else if(isEndPoint)
      label = "B";
    // track points between start and end
    else if(this.props.currentTrack !== keyMarker)
      icon=this.props.defaultIcon;

    // Only split lap functionality if its between start and end (not included) of a lap
    let handleSplitLap = this.props.handleSplitLap;
    if(isStartPoint || isEndPoint || (indexTrackpoint === (sizeTrackpoints-1) || indexTrackpoint === 0) )
      handleSplitLap = null;

    return (
        <Marker 
                position={this.props.trackPoint.position}
                onClick={()=>this.props.handleMarkClick(keyMarker)}
                onMouseOver={()=>this.props.handleMouseOver(keyMarker)}
                icon={icon}
                label={label}
                >
                { this.props.keys.length > 0 && this.containsKey(this.props.keys,keyMarker) &&
                  <InfoWindow onCloseClick={()=>this.props.handleInfoClose(keyMarker)}>
                    <InfoViewContent  trackPoint={this.props.trackPoint} 
                                      handleRemoveMarker={this.props.handleRemoveMarker} 
                                      handleSplitLap={handleSplitLap} 
                                      keyMarker={keyMarker}/>
                  </InfoWindow>
                }
        </Marker>
    )
  }
}

class InfoViewContent extends Component{
  render(){
    return(
      <div>
        <h2>Track Point</h2>
        <InfoViewLineComment title={"Time"} value={new Date(this.props.trackPoint.date).toLocaleTimeString()} />
        <InfoViewLineComment title={"Latitude"} value={this.props.trackPoint.position.lat} />
        <InfoViewLineComment title={"Longitude"} value={this.props.trackPoint.position.lng} />
        <InfoViewLineComment title={"Altitude"} value={this.props.trackPoint.alt} />
        <InfoViewLineComment title={"Distance"} value={this.props.trackPoint.dist} />
        <InfoViewLineComment title={"Speed"} value={this.props.trackPoint.speed} />
        <InfoViewLineComment title={"Heart Rate"} value={this.props.trackPoint.bpm} />
        <input type="button" onClick={()=>this.props.handleRemoveMarker(this.props.trackPoint.position, this.props.trackPoint.date, this.props.trackPoint.index, this.props.keyMarker)} value="Remove"/>
       { this.props.handleSplitLap && 
        <input type="button" onClick={()=>this.props.handleSplitLap(this.props.trackPoint.position, this.props.trackPoint.date, this.props.trackPoint.index)} value="Split Lap"/>
        }
      </div>
    )
  }
}

class InfoViewLineComment extends Component{
  render(){
    return(
      <p>
        <strong>{this.props.title}</strong>: <span>{this.props.value}</span>
      </p>
    )
  }
}

export default RouteMapComponent;
