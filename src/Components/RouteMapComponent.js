import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const RouteMapComponent =  
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDEtc96UC9co31AFUNuNsPZ1xV4SYEMwfA&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: '100%' }} />,
      containerElement: <div style={{ height: '600px', width: '700px' }} />,
      mapElement: <div style={{ height: '100%' }} />
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
                        strokeWeight: 3,
                      }
                    }
          />} 
        )
      }
      <MarkerInfoViewComponent 
        trackPoint={props.laps[0].tracks[0]}
        keyMarker={"0_0"}
        label={"A"}
        handleMarkClick={props.handleMarkClick}
        handleInfoClose={props.handleInfoClose}
        handleRemoveMarker={props.handleRemoveMarker}
        keys={props.keys}
      />
      <PositionNotFirstOrLastMarkerClustererComponent 
        laps={props.laps} 
        gridSize={80} 
        minimumClusterSize={22}
        handleMarkClick={props.handleMarkClick}
        handleInfoClose={props.handleInfoClose}
        handleRemoveMarker={props.handleRemoveMarker}
        keys={props.keys} 
      />
      <MarkerInfoViewComponent 
        trackPoint={props.laps[props.laps.length-1].tracks[props.laps[props.laps.length-1].tracks.length-1]}
        keyMarker={(props.laps.length-1)+"_"+(props.laps[props.laps.length-1].tracks.length-1)}
        label={"B"}
        handleMarkClick={props.handleMarkClick}
        handleInfoClose={props.handleInfoClose}
        handleRemoveMarker={props.handleRemoveMarker}
        keys={props.keys}
      />
    </GoogleMap>
  );

 class PositionNotFirstOrLastMarkerClustererComponent extends Component{

  isFirstOrEndPosition(indexLap, indexPosition){
    let lastIndexLap = this.props.laps.length-1;
    let lastIndexPositionOfLastLap = this.props.laps[lastIndexLap].tracks.length-1;
    return (indexPosition!==0 || indexLap!==0 ) 
            && (indexLap !== lastIndexLap 
                || indexPosition !== lastIndexPositionOfLastLap)
  }

  render(){
    return (
      <MarkerClusterer  
        averageCenter 
        gridSize={this.props.gridSize} 
        minimumClusterSize={this.props.minimumClusterSize}
      >
      {
        this.props.laps.map( (lap, indexLap) => {
          return lap.tracks.map( (track, indexPosition) => {
              return ((this.isFirstOrEndPosition(indexLap,indexPosition)) ? 
                        (<MarkerInfoViewComponent 
                          trackPoint={track}
                          key={indexLap+"_"+indexPosition}
                          keyMarker={indexLap+"_"+indexPosition}
                          icon={'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png'}
                          handleMarkClick={this.props.handleMarkClick}
                          handleInfoClose={this.props.handleInfoClose}
                          handleRemoveMarker={this.props.handleRemoveMarker}
                          keys={this.props.keys}
                        />)
                    :   null);
            
          }) 
        })
      }
      </MarkerClusterer>
    )
  }
}

class MarkerInfoViewComponent extends Component{

  render(){
    return (
      <Marker position={this.props.trackPoint.position}
              onClick={()=>this.props.handleMarkClick(this.props.keyMarker)}
              icon={this.props.icon}
              label={this.props.label}
              >
              {this.props.keys.length > 0 && (this.props.keys.indexOf(this.props.keyMarker)!==-1) &&  
                <InfoWindow onCloseClick={()=>this.props.handleInfoClose(this.props.keyMarker)}>
                  <InfoViewContent  trackPoint={this.props.trackPoint} handleRemoveMarker={this.props.handleRemoveMarker}/>
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
        <InfoViewLineComment title={"Heart Rate (bpm)"} value={this.props.trackPoint.bpm} />
        <input type="button" onClick={()=>this.props.handleRemoveMarker(this.props.trackPoint.position, this.props.trackPoint.date, this.props.trackPoint.index)} value="Remove"/>
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
