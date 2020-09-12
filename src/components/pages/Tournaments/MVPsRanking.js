import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { requestAsync, getPlayerLink, getTeamLink, getTeamLogo } from '../../helpers/Utils';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios';
import DataTable from '../../common/DataTable';
import Spinner from '../../common/Spinner/Spinner';
import { Localize } from '../../common/Locale/Loc';
import { rankHandler } from '../../common/FormsMobx/ListRenderHandlers';
import { groupBy } from '../../helpers/Data';
import TabControl from '../../common/TabControl';

@inject('store')
@observer
class MVPsRanking extends Component {
  @observable rankingType = 1;
  @observable data = null;
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
    const { idTournament } = p.match.params;
    requestAsync(this, axios.get, null, '/tournaments/' + idTournament + '/ranking/mvps/' + type).then(
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
      })
    );
  };

  getRankTable = () => {
    const p = this.props;
    const normalTeams = p.store.teams.normal;
    const { idTournament } = p.match.params;

    switch (this.rankingType) {
      case 1:
        return <MVPsTable idTournament={idTournament} normalTeams={normalTeams} data={this.data} />;

      case 2:
      case 3:
        return (
          <Fragment>
            {this.data.map(target => {
              return (
                <div className="">
                  <h4>{target.name}</h4>
                  <MVPsTable idTournament={idTournament} normalTeams={normalTeams} data={target.grouped} />
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

export default withRouter(MVPsRanking);

class MVPsTable extends Component {
  getTeam = (team, idTournament, normalTeams) => {
    var nTeam = normalTeams[team.idTeam];

    return (
      <span>
        {getTeamLogo(idTournament, team.idTeam, nTeam && nTeam.logoImgUrl)}{' '}
        {getTeamLink(idTournament, team.idTeam, nTeam && nTeam.name)}
      </span>
    );
  };

  render() {
    const { idTournament, data, normalTeams } = this.props;
    return (
      <DataTable
        columns={[
          {
            id: 'm0',
            label: Localize('Ranking'),
            fieldValue: 'tournamentRank',
            handler: rankHandler,
            className: 'LargeText Integer',
            headerClassName: 'Center SkewM',
          },
          {
            id: 'm4',
            label: Localize('GamesPlayed.little'),
            fieldValue: 'gamesPlayed',
            className: 'Integer',
            headerClassName: 'Center SkewM',
          },
          {
            id: 'm5',
            label: Localize('MVPs'),
            fieldValue: 'mvpPoints',
            className: 'Integer',
            headerClassName: 'Center SkewM',
          },
          {
            id: 'm6',
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
            id: 'm7',
            label: Localize('Team'),
            handler: r => this.getTeam(r, idTournament, normalTeams),
            headerClassName: 'SkewM',
          },
        ]}
        data={data}
        isDataNormalized={false}
        idFieldName="idPlayer"
      />
    );
  }
}