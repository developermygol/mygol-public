import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MatchDetails from './MatchDetails';
import AllMatches from './AllMatches';

export default withRouter(class Matches extends Component {
    render() {
        const path = this.props.match.path;
        return (
            <Switch>
                <Route path={path + '/:idMatch'} component={MatchDetails} />
                <Route path={path} exact component={AllMatches} />
            </Switch>
        )
    }
})