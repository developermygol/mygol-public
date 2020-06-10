import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import SanctionList from './SanctionList';
import { withRouter, Link } from 'react-router-dom';
import Loc from '../../../common/Locale/Loc';

@inject('store') @observer
class TournamentSanctionsSummary extends Component {
    componentDidMount = () => {
        const { idTournament } = this.props.match.params;
        this.props.store.sanctions.getSummaryForTournament(idTournament);
    }
    
    render() {
        const { idTournament } = this.props.match.params;

        return (
            <Fragment>
                <Link to={'/tournaments/' + idTournament + '/sanctions'}><Loc>See all</Loc></Link>
                <SanctionList data={this.props.store.sanctions.all} />
            </Fragment>
        )
    }
}

export default withRouter(TournamentSanctionsSummary);