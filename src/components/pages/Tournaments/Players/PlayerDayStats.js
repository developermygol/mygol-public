import React, { Component } from 'react';
import StatsDetailField from '../../../common/StatsDetailField';
import Loc from '../../../common/Locale/Loc';
//
const defaultData = {
  points: 0,
  pointsInOwn: 0,
  ranking1: 0,
  ranking2: 0,
  ranking3: 0,
  cardsType1: 0,
  cardsType2: 0,
};

class PlayerDayStats extends Component {
  render() {
    let { data } = this.props;
    const palyerDayResults =
      data && data.playerDayResults
        ? data.playerDayResults.find(results => results.idDay === data.id)
        : defaultData;

    return (
      <div className="PlayerDayStats">
        <h4>
          <Loc>LastDay</Loc>
        </h4>
        <StatsDetailField caption="Points" value={palyerDayResults.points} />
        <StatsDetailField caption="PointsInOwn" value={palyerDayResults.pointsInOwn} />
        <p>&nbsp;</p>
        <StatsDetailField caption="Data2" value={palyerDayResults.ranking1} total={0} />
        <StatsDetailField caption="Data3" value={palyerDayResults.ranking2} total={0} />
        <StatsDetailField caption="Data4" value={palyerDayResults.ranking3} total={0} />
        <p>&nbsp;</p>
        <StatsDetailField caption="CardsType1" value={palyerDayResults.cardsType1} />
        <StatsDetailField caption="CardsType2" value={palyerDayResults.cardsType2} />
        <StatsDetailField caption="Data1" value={palyerDayResults.data1} />
      </div>
    );
  }
}

export default PlayerDayStats;
