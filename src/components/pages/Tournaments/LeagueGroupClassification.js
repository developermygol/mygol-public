import React, { Component } from 'react';
import { getTeamLogo, getTeamLink } from '../../helpers/Utils';
import InfoBox from '../../common/InfoBox';
import Loc, { Localize } from '../../common/Locale/Loc';
import DataTable from '../../common/DataTable';
import { rankHandler } from '../../common/FormsMobx/ListRenderHandlers';

class LeagueGroupClassification extends Component {
    render() {
        const p = this.props;
        const { classification, normalTeams } = p;
        const t = p.tournament;
        if (!classification) return <InfoBox><Loc>Classification.NoData</Loc> 3</InfoBox>;

        return (
            <DataTable
                columns={[
                    { id: 'c0', label: Localize('Ranking'), fieldValue: 'tournamentRank', handler: rankHandler, className: 'LargeText Integer', headerClassName: 'SkewT' },
                    { id: 'c2', label: '', handler: r => getTeamLogo(t.id, r.idTeam, normalTeams[r.idTeam].logoImgUrl), headerClassName: 'SkewT' },
                    { id: 'c3', label: Localize('Team'), fieldValue: '', handler: r => getTeamLink(t.id, r.idTeam, normalTeams[r.idTeam].name), headerClassName: 'SkewT' },
                    { id: 'c1', label: Localize('TournamentPoints'), fieldValue: 'tournamentPoints', handler: null, className: 'LargeText Integer', headerClassName: 'SkewT' },
                    { id: 'c4', label: Localize('GamesPlayed'), fieldValue: 'gamesPlayed', handler: null, className: 'Integer', headerClassName: 'Center SkewT' },
                    { id: 'c8', label: Localize('GamesWon'), fieldValue: 'gamesWon', handler: null, className: 'Integer', headerClassName: 'Center SkewT' },
                    { id: 'c9', label: Localize('GamesDraw'), fieldValue: 'gamesDraw', handler: null, className: 'Integer', headerClassName: 'Center SkewT' },
                    { id: 'cc', label: Localize('GamesLost'), fieldValue: 'gamesLost', handler: null, className: 'Integer', headerClassName: 'Center SkewT' },
                    { id: 'c5', label: Localize('Points'), fieldValue: 'points', className: 'Integer', headerClassName: 'Center SkewT' },
                    { id: 'c6', label: Localize('PointsAgainst'), fieldValue: 'pointsAgainst', handler: null, className: 'Integer', headerClassName: 'Center SkewT' },
                    { id: 'c7', label: Localize('PointsDiff'), fieldValue: 'pointDiff', handler: null, className: 'Integer', headerClassName: 'Center SkewT' },
                ]}
                data={classification}
                isDataNormalized={false}
                idFieldName='idTeam'
            />


        )

    }
}

export default LeagueGroupClassification;