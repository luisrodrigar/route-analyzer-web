import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {GoogleApiWrapper} from 'google-maps-react';

export class RouteMapContainer extends React.Component {
	
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDEtc96UC9co31AFUNuNsPZ1xV4SYEMwfA',
  libraries: ['visualization']
})(MapContainer)