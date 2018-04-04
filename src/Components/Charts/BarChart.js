import React from 'react';
import AbstractChart from './AbstractChart';
import DataBar from './Data/DataBar';
import DataLine from './Data/DataLine';
import {getColorObject} from '../../Utils/colors';

export class BarChart extends React.Component{
    
	render(){
        let existInformedData = this.props.data && this.props.data.filter(data=>data[1]).length>0;
		return( 
			<AbstractChart {...this.props} >
				{ existInformedData && 
	              	<DataBar   {...this.props}/>
                }
                { existInformedData &&
                    <DataLine   {...this.props} 
                                color={getColorObject('Red')[500]}
                                strokeWidth={1}/>
				}
			</AbstractChart>
		);
	}
}

export default BarChart;