import React    from 'react';
import sizeMe from 'react-sizeme';
import Grid from 'material-ui/Grid';
import BarChart from './Charts/BarChart'
import {getLapsHeartRate, getHeartRateData, getAvgBpm} from '../Utils/lapOperations';

// Using a react-sizeme library to get width and height values => Handling on resize event
const MySizeGrid = sizeMe({ monitorHeight: true })(Grid);

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
      width:  500,
      height: 200,
    };
  }

  componentDidUpdate(prevProps, prevState){
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
            ref={ref=>this.chartGrid = ref}
            item
            xs={4}
            style={{maxHeight:'500px', minWidth:'420px'}}>
            <BarChart   data={this.state.bpms} 
                        laps={this.state.laps}
                        dataLine={this.state.avg}
                        textYAxis={this.props.yTitle}
                        textXAxis={this.props.xTitle}
                        padding = {40}
                        width = {this.state.width}
                        height = {this.state.height}
                        track={this.props.track}
                        ticks={5}/>
      </MySizeGrid>
		);
  }

}

export default HeartRateChart;