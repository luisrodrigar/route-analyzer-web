import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps, lifecycle, withStateHandlers } from "recompose";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import randomColor from 'randomcolor'; 

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
            isOpen: false,
            keys: [],
            lastKey: ""
          }), 
          {
            handleMarkClick: ({keys}) => 
              (key) => {
                const newKeys = keys;
                if(keys.indexOf(key)===-1)
                  newKeys.push(key);
                return ({
                  isOpen: true,
                  keys: newKeys,
                  lastKey: key
                })
              }
            ,handleInfoClose: ({keys}) => 
              (key) => {
                const newKeys = keys;
                if(keys.indexOf(key)>=0)
                  newKeys.splice(keys.indexOf(key),1);
                return ({
                  isOpen: (newKeys.length>0),
                  keys: newKeys
                })
              }
          }
    ),
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
      center={props.center}
      mapTypeId= {'terrain'}>
      {
        props.path.map( (lap, index) => {
          const strokeColor = randomColor({luminosity: 'dark'});
          return <Polyline key={index} 
                    path={lap} 
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
      <Marker position={props.path[0][0]} 
              key={0+"_"+0}
              label={"A"}
              onClick={()=>props.handleMarkClick(0+"_"+0)}>
        {props.isOpen && (props.keys.indexOf(0+"_"+0)!==-1) && 
          <InfoWindow onCloseClick={()=>props.handleInfoClose(0+"_"+0)}>
            <InfoViewContent lat={props.path[0][0].lat} lng={props.path[0][0].lng}/>
          </InfoWindow>
        }
      </Marker>
      <MarkerClusterer  averageCenter 
                        gridSize={80} 
                        minimumClusterSize={6}
                        >
      {
        props.path.map( (lap, indexLap) => {
          return lap.map( (position, indexPosition) => {
            if((indexPosition===0 && indexLap===0 ) 
              || 
              (indexLap === props.path.length-1 && indexPosition === props.path[props.path.length-1].length-1))
                return "";
            const key = indexLap+"_"+indexPosition;
            return  <Marker key={key} 
                      position={position} 
                      icon='https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png'
                      onClick={()=>props.handleMarkClick(key)}
                      >
                      {props.isOpen && props.keys.indexOf(key)!==-1 && 
                        <InfoWindow onCloseClick={()=>props.handleInfoClose(key)}>
                          <InfoViewContent lat={position.lat} lng={position.lng}/>
                        </InfoWindow>
                      }
                      </Marker>
            
          }) 
        })
      }
      </MarkerClusterer>
      <Marker position={props.path[props.path.length-1][props.path[props.path.length-1].length-1]}
              key={(props.path.length-1)+"_"+(props.path[props.path.length-1].length-1)}
              label={"B"}
              onClick={()=>props.handleMarkClick((props.path.length-1)+"_"+(props.path[props.path.length-1].length-1))}
              >
              {props.isOpen && (props.keys.indexOf((props.path.length-1)+"_"+(props.path[props.path.length-1].length-1))!==-1) &&  
                <InfoWindow onCloseClick={()=>props.handleInfoClose((props.path.length-1)+"_"+(props.path[props.path.length-1].length-1))}>
                  <InfoViewContent  lat={props.path[props.path.length-1][props.path[props.path.length-1].length-1].lat} 
                                    lng={props.path[props.path.length-1][props.path[props.path.length-1].length-1].lng}/>
                </InfoWindow>
              }
      </Marker>
    </GoogleMap>
  );

class InfoViewContent extends Component{
  render(){
    return(
      <div>
        <h3>Position</h3>
        <h5>Latitude</h5><span>{this.props.lat}</span>
        <h5>Longitude</h5><span>{this.props.lng}</span>
      </div>
    );
  }
}

export default RouteMapComponent;
