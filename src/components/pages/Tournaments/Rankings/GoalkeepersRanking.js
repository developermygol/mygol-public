import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { requestAsync, getPlayerLink, getTeamLink, getTeamLogo, getUploadsImg } from '../../../helpers/Utils';
import { Redirect, withRouter } from 'react-router-dom';
import axios from '../../../../axios';
import DataTable from '../../../common/DataTable';
import Spinner from '../../../common/Spinner/Spinner';
import { Localize } from '../../../common/Locale/Loc';
import {
  rankHandler,
  goalsConceadedDividedByGamesPlayedHandler,
} from '../../../common/FormsMobx/ListRenderHandlers';
import { groupBy } from '../../../helpers/Data';
import TabControl from '../../../common/TabControl';

@inject('store')
@observer
class GoalkeepersRanking extends Component {
  @observable rankingType = 1;
  @observable data = null;
  @observable first = null;
  @observable loading = true;
  @observable error = null;

  items = [
    { id: 1, name: Localize('Tournament') }, // Competicion
    { id: 2, name: Localize('ByStage') }, // Fase
    { id: 3, name: Localize('ByGroup') }, // Grupo
  ];

  componentDidMount = () => {
    this.setVisibleRanking(1);
  };

  setVisibleRanking = type => {
    const p = this.props;
    const limit = p.limit ? `/${p.limit}` : '';
    const { idTournament } = p.match.params;

    requestAsync(
      this,
      axios.get,
      null,
      '/tournaments/' + idTournament + '/ranking/goalkeepers/' + type + limit
    ).then(
      action(res => {
        this.rankingType = type;
        switch (type) {
          case 2:
            this.data = groupBy(res, p.store.stages.all, 'id', 'idStage');
            break;
          case 3:
            this.data = groupBy(res, p.store.groups.all, 'id', 'idGroup');
            break;
          default:
            this.data = res;
            break;
        }

        if (!this.data[0]) return null;
        const noIdPlayer = this.data[0].idPlayer === 0;

        if (noIdPlayer)
          this.props.store.players.actions.get('/user/' + this.data[0].idUser).then(
            action(res => {
              this.first = res;
            })
          );
        else
          this.props.store.players.actions.get(this.data[0].idPlayer).then(
            action(res => {
              this.first = res;
            })
          );
      })
    );
  };

  getRankTable = () => {
    const p = this.props;
    const normalTeams = p.store.teams.normal;
    const { idTournament } = p.match.params;

    switch (this.rankingType) {
      case 1:
        return (
          <GoalKeepersTable
            idTournament={idTournament}
            normalTeams={normalTeams}
            data={this.data}
            special={p.special}
            first={this.first}
          />
        );

      case 2:
      case 3:
        return (
          <Fragment>
            {this.data.map(target => {
              return (
                <div className="">
                  <h4>{target.name}</h4>
                  <GoalKeepersTable
                    idTournament={idTournament}
                    normalTeams={normalTeams}
                    data={target.grouped}
                    special={p.special}
                    first={this.first}
                  />
                </div>
              );
            })}
          </Fragment>
        );
      default:
        return null;
    }
  };

  getContent = item => {
    return <Spinner loading={this.loading}>{this.data ? this.getRankTable() : null}</Spinner>;
  };

  render() {
    return (
      <TabControl
        className="ScorersRanking"
        items={this.items}
        contentCallback={this.getContent}
        onChange={item => this.setVisibleRanking(item.id)}
      />
    );
  }
}

export default withRouter(GoalkeepersRanking);

class GoalKeepersTable extends Component {
  getTeam = (team, idTournament, normalTeams) => {
    const isExternal = !normalTeams;
    if (isExternal) return <Redirect to={`/tournaments/${this.props.idTournament}`} />; // 💥

    var nTeam = normalTeams[team.idTeam];

    return (
      <span>
        {getTeamLogo(idTournament, team.idTeam, nTeam && nTeam.logoImgUrl)}{' '}
        {getTeamLink(idTournament, team.idTeam, nTeam && nTeam.name)}
      </span>
    );
  };

  getPlayerTeam = info => {
    const { idTeam } = info;

    return (
      <div className="Team">{this.getTeam({ idTeam }, this.props.idTournament, this.props.normalTeams)}</div>
    );
  };

  getPlayerNameAndLink = info => {
    const { idTeam, idPlayer, playerName, playerSurname } = info;
    return getPlayerLink(this.props.idTournament, idTeam, {
      id: idPlayer,
      name: playerName,
      surname: playerSurname,
    });
  };

  render() {
    const { idTournament, data, normalTeams } = this.props;
    const isSpecial = this.props.special;
    const firstPlayer = this.props.first;
    const first = data[0];

    return (
      <React.Fragment>
        {isSpecial && firstPlayer && (
          <div className="LargeRankingCell">
            <div className="RankingTop">
              <div className="Award Award_MaxGoalKeeper">
                <span className="Value">
                  GE/PJ: {Math.round((first.pointsAgainst / first.gamesPlayed) * 100) / 100}
                </span>
              </div>
            </div>
            <div className="Avatar">
              <p>
                {getUploadsImg(
                  firstPlayer.userData.avatarImgUrl,
                  firstPlayer.userData.id,
                  'user',
                  'PlayerAvatar Medium'
                )}
              </p>
              <p className="UserLink">{this.getPlayerNameAndLink(first)}</p>
            </div>
            {this.getPlayerTeam(first)}
          </div>
        )}
        <DataTable
          columns={[
            {
              id: 'g0',
              label: Localize('Ranking'),
              fieldValue: 'tournamentRank',
              handler: rankHandler,
              className: 'LargeText Integer',
              headerClassName: 'Center SkewM',
            },
            {
              id: 'g3',
              label: Localize('GamesPlayed.little'),
              fieldValue: 'gamesPlayed',
              className: 'Integer',
              headerClassName: 'Center SkewM',
            },
            {
              id: 'g4',
              label: Localize('PointsAgainstDevidedByGamesPlayes'),
              fieldValue: 'gamesPlayed',
              handler: goalsConceadedDividedByGamesPlayedHandler,
              className: 'Integer',
              headerClassName: 'Center SkewM',
            },
            {
              id: 'g5',
              label: Localize('PointsAgainst.little'),
              fieldValue: 'pointsAgainst',
              className: 'Integer',
              headerClassName: 'Center SkewM',
            },
            {
              id: 'g6',
              label: Localize('Player'),
              handler: r =>
                getPlayerLink(idTournament, r.idTeam, {
                  id: r.idPlayer,
                  name: r.playerName,
                  surname: r.playerSurname,
                }),
              headerClassName: 'SkewM',
            },
            {
              id: 'g7',
              label: Localize('Team'),
              handler: r => this.getTeam(r, idTournament, normalTeams),
              headerClassName: 'SkewM',
            },
          ]}
          data={data}
          isDataNormalized={false}
          idFieldName="idPlayer"
        />
      </React.Fragment>
    );
  }
}
