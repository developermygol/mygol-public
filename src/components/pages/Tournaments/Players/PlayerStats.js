import React, {Fragment} from 'react';
import Loc from '../../../common/Locale/Loc';
import PointsChart from './PointsChart';
import PointsSummary from './PointsSummary';
import PlayerDetailedStats from './PlayerDetailedStats';

export default props => {
    const p = props.player;
    return (
        <Fragment>
            <div className='PlayerStats Section'>
                <h3><Loc>Statistics</Loc></h3>
                <PointsSummary data={p.dayResultSummary} />
                <PointsChart data={p.dayResults} numDays={40} />
            </div>
            <div className='Section'>
                <PlayerDetailedStats data={p} />
            </div>
        </Fragment>
    );
}