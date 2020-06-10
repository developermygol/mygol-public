import React, { Component } from 'react';
import Loc from '../../../common/Locale/Loc';
import MatchTeamPlayers from './MatchTeamPlayers';

class MatchPlayers extends Component {
  filterPlayerBasedOnState = players => {
    const p = this.props;
    const m = p.match;
    if (!players || !m) return null;

    if (m.status < 3) return players; // Started

    return players.filter(p => p.matchData && p.matchData.status === 1);
  };

  render() {
    const m = this.props.match;

    return (
      <div className="MatchPlayersTop">
        <h3>
          <Loc>Players</Loc>
        </h3>
        <div className="MatchPlayersContainer">
          <MatchTeamPlayers players={this.filterPlayerBasedOnState(m.homePlayers)} title="Match.HomeTeam" />
          <MatchTeamPlayers
            players={this.filterPlayerBasedOnState(m.visitorPlayers)}
            title="Match.VisitorTeam"
          />
        </div>
        {/* :
                    <Fragment>
                        <p className='InfoBox'><Loc>Match.NoPlayers</Loc></p>
                    </Fragment>
                } */}
      </div>
    );
  }
}

export default MatchPlayers;
