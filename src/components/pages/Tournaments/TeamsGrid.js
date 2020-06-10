import React, { Component } from 'react';
import Grid from '../../common/Grid';
import { getTeamLogo, getTeamLink } from '../../helpers/Utils';

class TeamsGrid extends Component {
    render() {
        const p = this.props;
        const { teams, idTournament } = p;

        return (
            <Grid className='Grid5' data={teams} renderer={
                team => (
                    <div className='TeamsItem'>
                        {getTeamLogo(idTournament, team.id, team.logoImgUrl)}
                        {getTeamLink(idTournament, team.id, team.name)}
                    </div>
                )
            } />
        )
    }
}

export default TeamsGrid;