import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Loc from '../../../common/Locale/Loc';
import PointsChart from './PointsChart';
import PointsSummary from './PointsSummary';
import PlayerDetailedStats from './PlayerDetailedStats';

const PlayerStats = ({ player }) => {
  const { activeTheme: theme } = useSelector(state => state.theme);
  return (
    <Fragment>
      <div className="PlayerStats Section">
        <h3 className="Color2">
          <Loc>Statistics</Loc>
        </h3>
        <PointsSummary data={player.dayResultSummary} />
        <PointsChart data={player.dayResults} numDays={40} theme={theme} />
      </div>
      <div className="Section">
        <PlayerDetailedStats data={player} />
      </div>
    </Fragment>
  );
};

export default PlayerStats;
