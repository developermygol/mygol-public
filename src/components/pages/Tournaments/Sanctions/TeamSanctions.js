import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SanctionList from './SanctionList';
import { withRouter } from 'react-router-dom';

@inject('store') @observer
class TeamSanctions extends Component {
    componentDidMount = () => {
        const { idTeam, idTournament } = this.props.match.params;
        this.props.store.sanctions.getAllForTeam(idTeam, idTournament);
    }
    
    render() {
        return (
            <SanctionList data={this.props.store.sanctions.all} />
        )
    }
}

export default withRouter(TeamSanctions);