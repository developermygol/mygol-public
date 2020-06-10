import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Players from './Players/TournamentPlayers';
import BreadCrumb from '../../common/Breadcrumb';
import Matches from './Matches/Matches';
import TournamentIndex from './TournamentIndex';
import Teams from './Teams/Teams';
import TournamentSanctions from './Sanctions/TournamentSanctions';
//import Calendar from './Calendar/Calendar';
//import Sanctions from './Sanctions/Sanctions';


@inject("store") @observer
class Details extends Component {

    componentDidMount = () => {
        // Set the current tournament
        const id = this.props.match.params.idTournament;
        this.props.store.tournaments.setCurrent(id);
    }

    render() {
        //const baseUrl = this.props.match.url;
        //const tournament = this.props.store.tournaments.current;

        return (
            
            <React.Fragment>
                {/* <ul className='SecNavBar'>
                    <li><NavLink className='SecNavItem' onClick={this.linkClick} to={baseUrl} exact><Loc>Home</Loc></NavLink></li>
                    <li><NavLink className='SecNavItem' onClick={this.linkClick} to={baseUrl + '/teams'}><Loc>Teams</Loc></NavLink></li>
                    <li><NavLink className='SecNavItem' onClick={this.linkClick} to={baseUrl + '/calendar'}><Loc>Calendar</Loc></NavLink></li>
                    <li><NavLink className='SecNavItem' onClick={this.linkClick} to={baseUrl + '/players'}><Loc>Players</Loc></NavLink></li>
                    <li><NavLink className='SecNavItem' onClick={this.linkClick} to={baseUrl + '/sanctions'}><Loc>Sanctions</Loc></NavLink></li>
                </ul> */}

                <div className='SecContent'>
                    <BreadCrumb />
                    <Switch>
                        {/* <Route path='/tournaments/:idTournament/calendar' component={Calendar} /> */}
                        <Route path='/tournaments/:idTournament/teams' component={Teams} />
                        <Route path='/tournaments/:idTournament/players' component={Players} />
                        {/* <Route path='/tournaments/:idTournament/sanctions' component={Sanctions} /> */}
                        <Route path='/tournaments/:idTournament/matches' component={Matches} />
                        <Route path='/tournaments/:idTournament/sanctions' component={TournamentSanctions} />
                        <Route path='/tournaments/:idTournament' exact component={TournamentIndex} />
                    </Switch>
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(Details)

