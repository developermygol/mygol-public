import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Loc from '../../../common/Locale/Loc';
import { getSettings } from '../../../common/Chart';


const defaultProps = {
    data: [],
    numDays: 10
}


class TeamGoalsChart extends Component {


    constructor(props) {
        super(props);

        const s = getSettings('Points', props.data, props.numDays);

        // Adapt settings to this chart
        s.options.scales.yAxes[0].ticks.stepSize = 1;

        this.settings = s;
    }    

    render() {
        if (!this.settings) return null;
        
        return (
            <div className='Chart'>
                <h4><Loc>Points</Loc></h4>
                <Bar width={4} height={1} data={this.settings.data} options={this.settings.options} />
            </div>
        )
    }
}

TeamGoalsChart.defaultProps = defaultProps;

export default TeamGoalsChart;