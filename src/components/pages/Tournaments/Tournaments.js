import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Teams from './Teams/Teams';
import Players from './Players/TournamentPlayers';
import Matches from './Matches/Matches';
import TournamentIndex from './TournamentIndex';
import TournamentSanctions from './Sanctions/TournamentSanctions';
import RankingAll from './Rankings/RankingAll';
import AllTournaments from './AllTournaments';

class Tournaments extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route path='/tournaments/:idTournament/calendar' component={Calendar} /> */}
          {/* <Route path='/tournaments/:idTournament/sanctions' component={Sanctions} /> */}
          <Route path="/tournaments/:idTournament/teams" component={Teams} />
          <Route path="/tournaments/:idTournament/players" component={Players} />
          <Route path="/tournaments/:idTournament/matches" component={Matches} />
          <Route path="/tournaments/:idTournament/sanctions" component={TournamentSanctions} />
          <Route path="/tournaments/:idTournament" exact component={TournamentIndex} />
          <Route path="/tournaments/:idTournament/rankings" exact component={RankingAll} />
          <Route path="/tournaments" exact component={AllTournaments} />
        </Switch>
      </div>
    );
  }
}

export default Tournaments;
