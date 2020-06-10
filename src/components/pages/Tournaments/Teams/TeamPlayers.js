import React, { Component } from 'react';
import List from '../../../common/FormsMobx/List';
import { Link, withRouter } from 'react-router-dom';
import { logo, textLookup } from '../../../common/FormsMobx/ListRenderHandlers';

class TeamPlayers extends Component {

    isFilteredPosition = (player) => {
        if (!player) return true;
        const position = player.teamData && player.teamData.fieldPosition;
        return (position === 5 || position === 6);
    }

    apparelNumberRenderHandler = (player) => {
        if (this.isFilteredPosition(player)) return <span />
        if (!player.teamData) return <span />

        return <span className='ApparelNumber'>{player.teamData.apparelNumber}</span>;
    }

    getPlayerLink = (player) => {
        const p = this.props.match.params;
        return (
            <Link to={'/tournaments/' + p.idTournament + '/teams/' + p.idTeam + '/players/' + player.id}>
                {player.name + ' ' + player.surname}
            </Link>
        )
    }

    adaptPlayerList = (players) => {
        if (!players) return null;

        const filtered = [];

        // Move coach and delegates to end
        var result = players.filter(p => {
            if (this.isFilteredPosition(p)) {
                filtered.push(p);
                return false;
            }

            return true;
        });

        result.push(...filtered);

        return result;
    }

    render() {
        return (
            <div>
                <List 

                    fieldDefinition={[
                        { fieldName: 'userData.avatarImgUrl', localizedLabel: '', listRenderHandler: logo('userData.avatarImgUrl', 'id', 'user', 'PlayerAvatar Mini'), className: '', headerClassName: 'Skew' },
                        { fieldName: 'teamData.apparelNumber', localizedLabel: 'ApparelNumber', className: 'Center', listRenderHandler: this.apparelNumberRenderHandler, headerClassName: 'Bottom' },
                        { fieldName: 'name', localizedLabel: 'Name', listRenderHandler: this.getPlayerLink, className: '', headerClassName: 'Bottom' },
                        { fieldName: 'teamData.fieldPosition', localizedLabel: 'FieldPosition', listRenderHandler: textLookup('FieldPosition', 'teamData.fieldPosition'), className: '', headerClassName: 'Bottom' },
                        { fieldName: 'dayResultSummary.gamesPlayed', localizedLabel: 'GamesPlayed', listRenderHandler: null, className: 'Integer', headerClassName: 'Skew' },
                        { fieldName: 'dayResultSummary.gamesWon', localizedLabel: 'GamesWon', listRenderHandler: null, className: 'Integer', headerClassName: 'Skew' },
                        { fieldName: 'dayResultSummary.gamesLost', localizedLabel: 'GamesLost', listRenderHandler: null, className: 'Integer', headerClassName: 'Skew' },
                        { fieldName: 'dayResultSummary.gamesDraw', localizedLabel: 'GamesDraw', listRenderHandler: null, className: 'Integer', headerClassName: 'Skew' },
                        { fieldName: 'dayResultSummary.points', localizedLabel: 'Points', listRenderHandler: null, className: 'LargeText Integer', headerClassName: 'Skew' },
                        { fieldName: 'dayResultSummary.pointsAgainst', localizedLabel: 'PointsAgainst', listRenderHandler: null, className: 'Integer', headerClassName: 'Skew' },
                        { fieldName: 'dayResultSummary.pointsInOwn', localizedLabel: 'PointsInOwn', listRenderHandler: null, className: 'Integer', headerClassName: 'Skew' },
                        { fieldName: 'dayResultSummary.cardsType1', localizedLabel: 'CardsType1', listRenderHandler: null, className: 'Integer', headerClassName: 'Skew' },
                        { fieldName: 'dayResultSummary.cardsType2', localizedLabel: 'CardsType2', listRenderHandler: null, className: 'Integer', headerClassName: 'Skew' },
                    ]}

                    listData={this.adaptPlayerList(this.props.data)}
                />
            </div>
        )
    }
}

export default withRouter(TeamPlayers);