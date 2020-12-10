import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AssistancesRanking from './AssistancesRanking';
import GoalkeepersRanking from './GoalkeepersRanking';
import MVPsRanking from './MVPsRanking';
import ScorersRanking from './ScorersRanking';
import Loc from '../../../common/Locale/Loc';

import './Rankings.css';

const Rankings = ({ tournament, history }) => {
  const [active, setActive] = useState('scorers');
  const isScorers = active === 'scorers';
  const isKeeprs = active === 'keepers';
  const isAssists = active === 'assists';
  const isMVPs = active === 'mvps';
  const rankingLimit = 5;

  const handleActiveChange = event => setActive(event.target.name);

  return (
    <div className="Rankings">
      <Link className="ActionLink" to={`/tournaments/${tournament.id}/rankings`}>
        <Loc>View full rankings</Loc>
      </Link>
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
        {isScorers && <ScorersRanking limit={rankingLimit} />}
        {isKeeprs && <GoalkeepersRanking limit={rankingLimit} />}
        {isAssists && <AssistancesRanking limit={rankingLimit} />}
        {isMVPs && <MVPsRanking limit={rankingLimit} />}
      </div>
    </div>
  );
};

export default Rankings;
