import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import RouteMap from './RouteMap';
import './RouteMapContainer.css';

export class RouteMapContainer extends Component {

	constructor(props){
		super(props);
		this.state = {laps:[]};
	}

	componentDidMount(){
	  	this.setState({ laps: this.props.laps });
	}

	componentDidUpdate(prevProps, prevState) {
    if(prevProps.laps !== this.props.laps){
      this.setState({
        laps: this.props.laps
      });
    }
  }

	render(){
		return(
			<Route path="/" render={(props) => <RouteMap laps={this.state.laps} {...props}/>}/> 
		);
	}

}