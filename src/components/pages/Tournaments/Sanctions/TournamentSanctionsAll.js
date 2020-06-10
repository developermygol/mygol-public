import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SanctionList from './SanctionList';
import { withRouter } from 'react-router-dom';

@inject('store') @observer
class TournamentSanctionsAll extends Component {
    componentDidMount = () => {
        const { idTournament } = this.props.match.params;
        this.props.store.sanctions.getAllForTournament(idTournament);
    }
    
    render() {
        return (
            <SanctionList data={this.props.store.sanctions.all} />
        )
    }
}

export default withRouter(TournamentSanctionsAll);