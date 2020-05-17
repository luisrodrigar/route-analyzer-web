import React from 'react';
import AbstractChart from './AbstractChart';
import DataLine from './Data/DataLine';
import DataMultiLine from './Data/DataMultiLine';
import {getColorObject} from '../../Utils/colors';

export default class LineChart extends React.Component{
    
	render(){
		let color = getColorObject('Red')[200];
        let existInformedData = this.props.data && this.props.data.filter(data=>data[1]).length>0;
		return( 
			<AbstractChart {...this.props} >
				{ existInformedData &&
                    <DataMultiLine   {...this.props}/>
				}
                { existInformedData &&
                    <DataLine   {...this.props} color={color}/>
				}
			</AbstractChart>
		);
	}
}
