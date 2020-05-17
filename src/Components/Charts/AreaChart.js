import React from 'react';
import AbstractChart from './AbstractChart';
import DataArea from './Data/DataArea';

export default class AreaChart extends React.Component{

	render(){
		return( 
			<AbstractChart {...this.props}  >
				{ this.props.data && this.props.data.length && 
	              	<DataArea   {...this.props}/>
				}
			</AbstractChart>
		);
	}
}
