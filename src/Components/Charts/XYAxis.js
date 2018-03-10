import React  from 'react';
import Axis   from './Axis';

export default class XYAxis extends React.Component{

  render(){
    const xSettings = {
      translate: `translate(0, ${this.props.height - this.props.padding})`,
      scale: this.props.xScale,
      orient: 'bottom',
      isTimeFormat: true,
      text: this.props.textXAxis,
      dX:'.71em',
      y:this.props.padding,
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
      y:6
    };
    return <g className="XYAxis">
      <Axis className={'x'} {...xSettings}/>
      <Axis className={'y'} {...ySettings}/>
    </g>
  }

}
