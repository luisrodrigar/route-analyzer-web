import React, {Component} from 'react';
import XYAxis             from './Axis/XYAxis';
import Paper              from 'material-ui/Paper';

export class AbstractChart extends Component{
    
    render() {
        return(
          <Paper  style={{overflowX:'auto'}}>
          
            <svg  height={this.props.height} 
                  width={this.props.width} >

                {this.props.children}

                <XYAxis {...this.props}/>
            </svg>
          </Paper>
        );
    }
}

export default AbstractChart;