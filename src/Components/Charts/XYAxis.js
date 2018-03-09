import React  from 'react';
import Axis   from './Axis';

export default class XYAxis extends React.Component{

  render(){
    const xSettings = {
      translate: `translate(0, ${this.props.height - this.props.padding})`,
      scale: this.props.xScale,
      orient: 'bottom'
    };
    const ySettings = {
      translate: `translate(${this.props.padding}, 0)`,
      scale: this.props.yScale,
      orient: 'left'
    };
    return <g className="XYAxis">
      <Axis {...xSettings}/>
      <Axis {...ySettings}/>
    </g>
  }

}
