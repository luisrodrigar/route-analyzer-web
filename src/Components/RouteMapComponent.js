import React, { Component }               from 'react';
import { withScriptjs, withGoogleMap, 
              GoogleMap, Polyline, 
              Marker, InfoWindow }        from "react-google-maps";
import { compose, withProps, lifecycle }  from "recompose";
import { connect }                        from "react-redux";
import { updateTrackpoint }               from "../actions/index";
import { getNearestPosition }       from "../Utils/operations";
import iconMarkerSelected                 from '../resources/marker_selected.png';
import './RouteMapComponent.css';

const mapDispatchToProps = dispatch => {
  return {
    updateTrackpoint: (idLap, idTrackpoint) => dispatch(updateTrackpoint(idLap, idTrackpoint))
  };
};

const handleMouseOver = (event,props) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  const position = {
    lat,
    lng,
  };
  let trackpointLocationInLap = getNearestPosition(props.laps, position);
  props.updateTrackpoint(trackpointLocationInLap.indexLap, trackpointLocationInLap.indexTrackpoint);
}

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
                        strokeWeight: 8,
                      }
                    }
                    onMouseOver={(event)=>handleMouseOver(event, props)}
                    onMouseOut={(event)=>handleMouseOver(event, props)}
          />
        })
      }
      {
        props.laps.map( (lap) => {
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
              currentTrack={props.currentTrack}
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
    this.isRenderedPoint = this.isRenderedPoint.bind(this);
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

  isRenderedPoint(){
    return this.isStartOrEndPoint(this.props.indexLap, this.props.indexTrackpoint) || 
        this.props.currentTrack === this.props.indexLap +"_"+this.props.indexTrackpoint;
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

    // Only split lap functionality if its between start and end (not included) of a lap
    let handleSplitLap = this.props.handleSplitLap;
    if(isStartPoint || isEndPoint || (indexTrackpoint === (sizeTrackpoints-1) || indexTrackpoint === 0) )
      handleSplitLap = null;
    if(this.isRenderedPoint())
      return (
          <Marker 
                  position={this.props.trackPoint.position}
                  onClick={()=>this.props.handleMarkClick(keyMarker)}
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
    else 
      return null;
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

export default connect(null,mapDispatchToProps)(RouteMapComponent);
