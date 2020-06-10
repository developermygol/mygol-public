import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import TeamIndex from './TeamIndex';
import PlayerIndex from '../Players/PlayerIndex';

class TournamentTeams extends Component {    

    render() {
        const { path } = this.props.match;

        return (
            <Switch>
                <Route path={path + '/:idTeam/players/:idPlayer'} component={PlayerIndex} />
                <Route path={path + '/:idTeam'} component={TeamIndex}  />
            </Switch>
        )
    }
}


export default withRouter(TournamentTeams);