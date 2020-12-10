import React, { useState } from 'react';

import ScorersRanking from './ScorersRanking';
import GoalkeepersRanking from './GoalkeepersRanking';
import AssistancesRanking from './AssistancesRanking';
import MVPsRanking from './MVPsRanking';
import Loc from '../../../common/Locale/Loc';

import './RankingAll.css';

const RankingAll = ({ match }) => {
  const rankingLimit = 1000;
  const [active, setActive] = useState('scorers');
  const isScorers = active === 'scorers';
  const isKeeprs = active === 'keepers';
  const isAssists = active === 'assists';
  const isMVPs = active === 'mvps';

  const handleActiveChange = event => setActive(event.target.name);

  return (
    <div className="RankingAll">
      <ul className="TabBar">
        <button
          name="scorers"
          className={`TabItem ${isScorers ? 'Active Color1' : 'Color2'}`}
          onClick={handleActiveChange}
        >
          <Loc>ScorersRanking</Loc>
        </button>
        <button
          name="keepers"
          className={`TabItem ${isKeeprs ? 'Active Color1' : 'Color2'}`}
          onClick={handleActiveChange}
        >
          <Loc>GoalKeepersRanking</Loc>
        </button>
        <button
          name="assists"
          className={`TabItem ${isAssists ? 'Active Color1' : 'Color2'}`}
          onClick={handleActiveChange}
        >
          <Loc>AssistancesRanking</Loc>
        </button>
        <button
          name="mvps"
          className={`TabItem ${isMVPs ? 'Active Color1' : 'Color2'}`}
          onClick={handleActiveChange}
        >
          <Loc>MvpsRanking</Loc>
        </button>
      </ul>
      <div className="TabContent">
        {isScorers && <ScorersRanking limit={rankingLimit} special />}
        {isKeeprs && <GoalkeepersRanking limit={rankingLimit} special />}
        {isAssists && <AssistancesRanking limit={rankingLimit} special />}
        {isMVPs && <MVPsRanking limit={rankingLimit} special />}
      </div>
    </div>
  );
};

export default RankingAll;
