import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps, lifecycle, withStateHandlers } from "recompose";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const RouteMapComponent =  
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDEtc96UC9co31AFUNuNsPZ1xV4SYEMwfA&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: '100%' }} />,
      containerElement: <div style={{ height: '600px', width: '700px' }} />,
      mapElement: <div style={{ height: '100%' }} />
    }),
    withStateHandlers(() => (
          {
            keys: [],
          }), 
          {
            handleMarkClick: ({keys}) => 
              (key) => {
                let index = keys.indexOf(key);
                if(index===-1){
                  return ({
                    keys: [...keys, key]
                  })
                } else
                  return ({
                      keys: [...keys.slice(0,index),...keys.slice(index+1)]
                    })
                
              }
            ,handleInfoClose: ({keys}) => 
              (key) => {
                let index = keys.indexOf(key);
                if(index>=0)
                  return ({
                      keys: [...keys.slice(0,index),...keys.slice(index+1)]
                    })
              }
          }
    ),
    lifecycle({
      componentDidUpdate(prevProps, prevState) {
        if(prevProps.laps !== this.props.laps && this.props.keys.length===0){
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
      <Marker position={props.laps[0].tracks[0].position} 
              key={0+"_"+0}
              label={"A"}
              onClick={()=>props.handleMarkClick(0+"_"+0)}>
        {props.keys.length > 0 && (props.keys.indexOf(0+"_"+0)!==-1) && 
          <InfoWindow onCloseClick={()=>props.handleInfoClose(0+"_"+0)}>
            <InfoViewContent trackPoint={props.laps[0].tracks[0]}/>
          </InfoWindow>
        }
      </Marker>
      <MarkerClusterer  averageCenter 
                        gridSize={80} 
                        minimumClusterSize={12}
                        >
      {
        props.laps.map( (lap, indexLap) => {
          return lap.tracks.map( (track, indexPosition) => {
              return ((indexPosition!==0 || indexLap!==0 ) && (indexLap !== props.laps.length-1 || indexPosition !== props.laps[props.laps.length-1].tracks.length-1)) 
                    ?
                        <Marker key={indexLap+"_"+indexPosition} 
                        position={track.position} 
                        icon='https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png'
                        onClick={()=>props.handleMarkClick(indexLap+"_"+indexPosition)}
                        >
                        {props.keys.length > 0 && props.keys.indexOf(indexLap+"_"+indexPosition)!==-1 && 
                          <InfoWindow onCloseClick={()=>props.handleInfoClose(indexLap+"_"+indexPosition)}>
                            <InfoViewContent trackPoint={track}/>
                          </InfoWindow>
                        }
                        </Marker> 
                    :   null;
            
          }) 
        })
      }
      </MarkerClusterer>
      <Marker position={props.laps[props.laps.length-1].tracks[props.laps[props.laps.length-1].tracks.length-1].position}
              key={(props.laps.length-1)+"_"+(props.laps[props.laps.length-1].tracks.length-1)}
              label={"B"}
              onClick={()=>props.handleMarkClick((props.laps.length-1)+"_"+(props.laps[props.laps.length-1].tracks.length-1))}
              >
              {props.keys.length > 0 && (props.keys.indexOf((props.laps.length-1)+"_"+(props.laps[props.laps.length-1].tracks.length-1))!==-1) &&  
                <InfoWindow onCloseClick={()=>props.handleInfoClose((props.laps.length-1)+"_"+(props.laps[props.laps.length-1].tracks.length-1))}>
                  <InfoViewContent  trackPoint={props.laps[props.laps.length-1].tracks[props.laps[props.laps.length-1].tracks.length-1]}/>
                </InfoWindow>
              }
      </Marker>
    </GoogleMap>
  );

class InfoViewContent extends Component{
  render(){
    return(
      <div>
        <h2>Track Point</h2>
        <InfoViewLineComment title={"Time"} value={new Date(this.props.trackPoint.date).toLocaleTimeString()} />
        <InfoViewLineComment title={"Latitude"} value={this.props.trackPoint.position.lat} />
        <InfoViewLineComment title={"Longitude"} value={this.props.trackPoint.position.lng} />
        <InfoViewLineComment title={"Altitude"} value={this.props.trackPoint.alt} />
        <InfoViewLineComment title={"Speed"} value={this.props.trackPoint.speed} />
        <InfoViewLineComment title={"Heart Rate (bpm)"} value={this.props.trackPoint.bpm} />
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
