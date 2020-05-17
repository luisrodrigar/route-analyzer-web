import React    from 'react';
import sizeMe from 'react-sizeme';
import Grid from '@material-ui/core/Grid';
import LineChart from './Charts/LineChart'
import {getLapsSpeed, getSpeedData, getAvgSpeed} from '../Utils/operations';
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

export class SpeedChart extends React.Component {

  constructor(props){
    super(props);
    this.handleChangeSizeContent = this.handleChangeSizeContent.bind(this);
    let lapsSpeed = getLapsSpeed(this.props.laps);
    let speed = getSpeedData(this.props.laps);
    let avgLine = getAvgSpeed(this.props.laps);
    this.state = {
      speeds: speed,
      laps:   lapsSpeed,
      avg:    avgLine,
      width:  1400,
      height: 200,
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.laps !== this.props.laps){
      let chart = this.chartGrid;
      let lapsSpeed = getLapsSpeed(this.props.laps);
      let speed = getSpeedData(this.props.laps);
      let avgLine = getAvgSpeed(this.props.laps);
      this.setState({
        speeds: speed,
        laps:   lapsSpeed,
        avg:    avgLine,
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
        <MySizeGrid ref={ref=>this.chartGrid = ref} item
                    xs={12} style={{maxHeight:'200px', minWidth:'500px'}}>
          <LineChart  data={this.state.speeds}
                      laps={this.state.laps}
                      dataLine={this.state.avg}
                      textYAxis={this.props.yTitle}
                      textXAxis={this.props.xTitle}
                      padding = {40}
                      width = {this.state.width}
                      height = {this.state.height}
                      track={this.props.currentTrackpoint}
                      handleMouseOver={this.props.updateTrackpoint}
                      legend={'m/s'}
                      ticks={5}/>
        </MySizeGrid>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(SpeedChart);
