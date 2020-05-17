import React  from 'react';
import Axis   from './Axis';

export default class XYAxis extends React.Component{
  render(){
    const xSettings = {
      translate: `translate(0, ${this.props.height - this.props.padding})`,
      scale: this.props.xScale,
      orient: 'bottom',
      isTimeFormat: true,
      timeFormat:"%H:%M:%S",
      text: this.props.textXAxis,
      dX:'.71em',
      y:(this.props.padding-10),
      x:(this.props.width - this.props.padding - this.props.textXAxis.length)
    };
    const ySettings = {
      translate: `translate(${this.props.padding}, 0)`,
      scale: this.props.yScale,
      orient: 'left',
      isTimeFormat: false,
      text: this.props.textYAxis,
      textTranslate: 'rotate(-90)',
      dY:'.71em',
      x:-1,
      y:(-1*(this.props.padding-5))
    };
    return <g className="x-y-axis">
      <Axis className={'x'} {...xSettings} ticks = {this.props.ticks}/>
      <Axis className={'y'} {...ySettings} ticks = {this.props.ticks}/>
    </g>
  }
}
