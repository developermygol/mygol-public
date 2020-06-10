import React, { Component, Fragment } from 'react';
import Loc, { Localize } from '../../../common/Locale/Loc';
import PlayerTable from '../../../pages/Players/PlayerTable';
import { withRouter } from 'react-router-dom';
import { getPlayerLink, repeatContent } from '../../../helpers/Utils';

export default withRouter(
  class MatchTeamPlayers extends Component {
    getPlayerStats = player => {
      const { idTournament } = this.props.match.params;
      const currentTeam = player.teamData.idTeam;
      const playerHasSanctionOnCurrentTeam = player.idSanction > 0 && currentTeam === player.idSanctionTeam;

      return (
        // TODO: MatchData no longer contains number of cards or points, they have to be included in the query as DayResultSummary
        <Fragment>
          {getPlayerLink(idTournament, player.teamData.idTeam, player)}
          {playerHasSanctionOnCurrentTeam && (
            <span className="SanctionedPlayer">{Localize('TeamPlayer.Sanctioned')}</span>
          )}
          {player.dayResultSummary ? (
            <Fragment>
              {repeatContent(
                <span className="PlayerStat EventType Type31" />,
                player.dayResultSummary.points
              )}
              {repeatContent(
                <span className="PlayerStat EventType Type64" />, // Green
                player.dayResultSummary.cardsType4
              )}
              {repeatContent(
                <span className="PlayerStat EventType Type63" />, // Blue
                player.dayResultSummary.cardsType3
              )}
              {repeatContent(
                <span className="PlayerStat EventType Type61" />, // Yellow
                player.dayResultSummary.cardsType1
              )}
              {repeatContent(
                <span className="PlayerStat EventType Type65" />, //  Orange
                player.dayResultSummary.cardsType5
              )}
              {repeatContent(
                <span className="PlayerStat EventType Type62" />, // Red
                player.dayResultSummary.cardsType2
              )}
            </Fragment>
          ) : null}
        </Fragment>
      );
    };

    render() {
      const p = this.props;
      const { players } = p;

      return (
        <div className="MatchPlayers">
          <h4>{Localize(p.title)}</h4>
          <div className="PlayerList">
            {players && players.length > 0 ? (
              <PlayerTable
                players={players}
                renderHandler={pl => {
                  return this.getPlayerStats(pl);
                }}
              />
            ) : (
              <p className="Center">
                <Loc>Match.NoPlayers</Loc>
              </p>
            )}
          </div>
        </div>
      );
    }
  }
);
