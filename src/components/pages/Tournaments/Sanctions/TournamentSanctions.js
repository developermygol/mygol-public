import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import SanctionDetails from './SanctionDetails';
import TournamentSanctionsAll from './TournamentSanctionsAll';

class TournamentSanctions extends Component {
    render() {
        const p = this.props;
        const basePath = p.match.path;

        return (
            <Switch>
                <Route path={basePath + '/:idSanction'} component={SanctionDetails} />
                <Route path={basePath} exact component={TournamentSanctionsAll} />
            </Switch>
        )
    }
}

export default withRouter(TournamentSanctions);