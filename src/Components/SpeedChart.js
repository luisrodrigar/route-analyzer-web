import React    from 'react';
import sizeMe from 'react-sizeme';
import Grid from 'material-ui/Grid';
import LineChart from './Charts/LineChart'
import {getLapsSpeed, getSpeedData, getAvgSpeed} from '../Utils/lapOperations';

// Using a react-sizeme library to get width and height values => Handling on resize event
const MySizeGrid = sizeMe({ monitorHeight: true })(Grid);

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
      width:  500,
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
      <MySizeGrid 
            ref={ref=>this.chartGrid = ref}
            item
            xs={4}
            style={{maxHeight:'500px', minWidth:'420px'}}>
            <LineChart  data={this.state.speeds} 
                        laps={this.state.laps}
                        dataLine={this.state.avg}
                        textYAxis={this.props.yTitle}
                        textXAxis={this.props.xTitle}
                        padding = {40}
                        width = {this.state.width}
                        height = {this.state.height}
                        track={this.props.track}
                        handleMouseOver={this.props.handleMouseOver}
                        ticks={5}/>
      </MySizeGrid>
		);
  }

}

export default SpeedChart;