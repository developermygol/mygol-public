import React, { Component } from 'react';
import PlayerSummaryStats from './PlayerSummaryStats';
import PlayerDayStats from './PlayerDayStats';
import InfoBox from '../../../common/InfoBox';
import Loc from '../../../common/Locale/Loc';

class PlayerDetailedStats extends Component {
  render() {
    const { data } = this.props;

    if (!data)
      return (
        <InfoBox>
          <Loc>Player.NoStatsYet</Loc>
        </InfoBox>
      );

    const lastDayResults = data.dayResults[data.dayResults.length - 1];

    return (
      <div className="PlayerDetailedStats">
        <PlayerSummaryStats data={data.dayResultSummary} />
        {/* Compare button */}
        <PlayerDayStats data={lastDayResults} />
      </div>
    );
  }
}

export default PlayerDetailedStats;
