import React    from 'react';
import sizeMe from 'react-sizeme';
import Grid from 'material-ui/Grid';
import AreaChart from './Charts/AreaChart';
import {getElevationData, getLapsElevations} from '../Utils/operations';
import { connect } from "react-redux";
import { updateTrackpoint } from "../actions/index";

// Using a react-sizeme library to get width and height values => Handling on resize event
const MySizeGrid = sizeMe({ monitorHeight: true })(Grid);

const mapStateToProps = state => {
  return {
    currentTrackpoint:  state.container.currentTrackpoint,
    laps:               state.container.laps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTrackpoint: (idLap, idTrackpoint) => dispatch(updateTrackpoint(idLap, idTrackpoint))
  };
};

export class ElevationsChart extends React.Component {

  constructor(props){
    super(props);
    this.handleChangeSizeContent = this.handleChangeSizeContent.bind(this);
    let elevationsData = getElevationData(this.props.laps);
    let lapsElevations = getLapsElevations(this.props.laps);
    this.state = {
      elevations: elevationsData,
      laps:   lapsElevations,
      width:  1400,
      height: 200,
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.laps !== this.props.laps){
      let chart = this.chartGrid;
      let elevationsData = getElevationData(this.props.laps);
      let lapsElevations = getLapsElevations(this.props.laps);
      this.setState({
        elevations: elevationsData,
        laps: lapsElevations,
        width:chart.state.width,
        height:chart.state.height,
      });
    }
  }

  handleChangeSizeContent(){
    let chart = this.chartGrid;
    this.setState({
      width:chart.state.width,
      height:chart.state.height,
    });
  }

  componentDidMount(){
    window.addEventListener("resize", this.handleChangeSizeContent);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.handleChangeSizeContent);
  }

	render(){
		return(
      <MySizeGrid 
            ref={ref=>this.chartGrid = ref}
            item
            xs={12}
            style={{maxHeight:'200px', minWidth:'500px'}}>
            <AreaChart  data={this.state.elevations} 
                        laps={this.state.laps}
                        textYAxis={this.props.yTitle}
                        textXAxis={this.props.xTitle}
                        padding = {40}
                        width = {this.state.width}
                        height = {this.state.height}
                        track={this.props.currentTrackpoint}
                        handleMouseOver={this.props.updateTrackpoint}
                        legend={'m'}
                        ticks={5}/>
      </MySizeGrid>
		);
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(ElevationsChart);