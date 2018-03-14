import React from 'react';
import AbstractChart from './AbstractChart';
import DataBar from './DataBar';
import DataLine from './DataLine';

export class LineChart extends React.Component{
    
	render(){
        let existInformedData = this.props.data && this.props.data.filter(data=>data[1]).length>0;
		return( 
			<AbstractChart {...this.props} >
                { existInformedData &&
                    <DataLine   {...this.props}/>
				}
			</AbstractChart>
		);
	}
}

export default LineChart;