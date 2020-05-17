import React    from 'react';
import sizeMe from 'react-sizeme';
import Grid from '@material-ui/core/Grid';
import BarChart from './Charts/BarChart'
import {getLapsHeartRate, getHeartRateData, getAvgBpm} from '../Utils/operations';
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

export class HeartRateChart extends React.Component {

  constructor(props){
    super(props);
    this.handleChangeSizeContent = this.handleChangeSizeContent.bind(this);
    let lapsHeartRate = getLapsHeartRate(this.props.laps);
    let heartRates = getHeartRateData(this.props.laps);
    let avgLine = getAvgBpm(this.props.laps);
    this.state = {
      bpms:   heartRates,
      laps:   lapsHeartRate,
      avg: avgLine,
      width:  1400,
      height: 200,
    };
  }

  componentDidUpdate(prevProps, prevState, prevContext){
    if(prevProps.laps !== this.props.laps){
      let chart = this.chartGrid;
      let heartRates = getHeartRateData(this.props.laps);
      let lapsHeartRate = getLapsHeartRate(this.props.laps);
      let avgLine = getAvgBpm(this.props.laps);
      this.setState({
        bpms: heartRates,
        laps: lapsHeartRate,
        avg: avgLine,
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
                ref={ref=>this.chartGrid = ref} item
                xs={12} style={{maxHeight:'200px', minWidth:'500px'}}>
              <BarChart   textYAxis={this.props.yTitle}
                          textXAxis={this.props.xTitle}
                          track={this.props.currentTrackpoint}
                          handleMouseOver={this.props.updateTrackpoint}
                          data={this.state.bpms}
                          laps={this.state.laps}
                          dataLine={this.state.avg}
                          width = {this.state.width}
                          height = {this.state.height}
                          legend={'bpm'}
                          padding = {40}
                          ticks={5}/>
		    </MySizeGrid>
        );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(HeartRateChart);
