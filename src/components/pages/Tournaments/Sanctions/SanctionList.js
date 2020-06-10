import React, { Component, Fragment } from 'react';
import DataTable from '../../../common/DataTable';
import { inject, observer } from 'mobx-react';
import Spinner from '../../../common/Spinner/Spinner';
import { textLookup } from '../../../common/FormsMobx/ListRenderHandlers';
import Loc, { Localize } from '../../../common/Locale/Loc';
import { Link, withRouter } from 'react-router-dom';
import { getFormattedDate } from '../../../common/FormsMobx/Utils';


@inject('store') @observer
class SanctionList extends Component {

    splitPlayersAndTeamsSanctions = (listData) => {
        const result = { hasTeams: false, playerSanctions: listData };

        if (listData) {
            result.playerSanctions = listData.filter(row => row && row.type !== 2);
            result.teamSanctions = listData.filter(row => row && row.type === 2);
            result.hasTeams = result.teamSanctions.length > 0;
        }

        return result;
    }

    getSanctionLink = (row) => {
        const { idTournament } = this.props.match.params;
        return <Link to={'/tournaments/' + idTournament + '/sanctions/' + row.id}>{getFormattedDate(row.startDate)}</Link>
    }

    getTeam = (idTeam) => {
        const normalTeams = this.props.store.teams.normal;
        const team = normalTeams && normalTeams[idTeam];
        return team ? team.name : '--';
    }

    getPlayer = (player) => {
        if (!player) return '--';
        return player.name + ' ' + player.surname;
    }

    playerColumns = [
        { id: 'c1', label: Localize('Sanctions.Date'), handler: this.getSanctionLink, headerClassName: 'SkewM' },
        { id: 'c2', label: Localize('Player'), handler: r => this.getPlayer(r.player), className: 'Text', headerClassName: 'SkewM' },
        { id: 'c5', label: Localize('Team'), handler: r => this.getTeam(r.idTeam), className: 'Text', headerClassName: 'SkewM' },
        { id: 'c6', label: Localize('Sanctions.NumMatches'), handler: r => r.numMatches, className: 'Integer', headerClassName: 'Center SkewM' },
        { id: 'c7', label: Localize('Sanctions.Status'), handler: textLookup('SanctionStatus', 'status'), headerClassName: 'SkewM' },
    ];

    teamColumns = [
        { id: 'c1', label: Localize('Sanctions.Date'), handler: this.getSanctionLink, headerClassName: 'SkewM' },
        { id: 'c5', label: Localize('Team'), handler: r => this.getTeam(r.idTeam), className: 'Text', headerClassName: 'SkewM' },
        { id: 'c2', label: Localize('Sanctions.Title'), fieldValue: 'title', className: 'Text', headerClassName: 'SkewM' },
        { id: 'c7', label: Localize('Sanctions.Status'), handler: textLookup('SanctionStatus', 'status'), headerClassName: 'SkewM' },
    ];

    render() {
        const p = this.props;
        const { data } = p;
        const ss = this.splitPlayersAndTeamsSanctions(data);

        return (
            <Spinner loading={p.store.sanctions.loading}>
                <Fragment>
                    <div className='Section'>
                        {ss.hasTeams && <h4><Loc>Sanctions.Players</Loc></h4>}
                        <div className='Content'>
                            <DataTable
                                columns={this.playerColumns}
                                data={ss.playerSanctions}
                                isDataNormalized={false}
                            />
                        </div>
                    </div>
                    {ss.hasTeams && (
                        <div className='Section'>
                            <h4><Loc>Sanctions.Teams</Loc></h4>
                            <div className='Content'>
                                <DataTable
                                    columns={this.teamColumns}
                                    data={ss.teamSanctions}
                                    isDataNormalized={false}
                                />
                            </div>
                        </div>
                    )}
                </Fragment>
            </Spinner>
        )
    }
}

export default withRouter(SanctionList);