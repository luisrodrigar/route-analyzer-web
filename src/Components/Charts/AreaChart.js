import React from 'react';
import AbstractChart from './AbstractChart';
import DateArea from './DataArea';

export class AreaChart extends React.Component{

	render(){
		return( 
			<AbstractChart {...this.props}  >
				{ this.props.data && this.props.data.length && 
	              	<DateArea   {...this.props}/>
				}
			</AbstractChart>
		);
	}
}

export default AreaChart;