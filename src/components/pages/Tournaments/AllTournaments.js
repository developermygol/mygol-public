import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';

import { getUploadsIcon } from '../../helpers/Utils';
import Loc, { Localize } from '../../common/Locale/Loc';

const initialActiveSeasonId = seasons => {
  if (!seasons || seasons.length === 0) return null;

  const today = moment(new Date());

  let activeSeason = seasons.find(season => {
    const start = moment(season.startDate);
    const end = moment(season.endDate);

    return today.isBetween(start, end);
  });

  if (activeSeason) return activeSeason.id;

  // NO season in range return lastest
  return seasons.sort(
    (seasonA, seasonB) => new Date(seasonA.endDate).getTime() - new Date(seasonB.endDate).getTime()
  )[0].id;
};

@inject('store')
@observer
class Tournaments extends Component {
  state = {
    activeSeasonId: null,
  };

  setActiveSeasonId = seasonId => this.setState({ activeSeasonId: seasonId });

  componentDidMount = () => {
    // Load list of tournaments from server here instead of in the list.
    // This is to ensure that the list is available even when using it in inner routes.
    this.props.store.tournaments.actions.getAll();
    // 🚧🚧🚧
    this.setActiveSeasonId(initialActiveSeasonId(this.props.seasons.seasons));
    // this.setState({ activeSeasonId: initialActiveSeasonId(this.props.seasons) });
  };

  render() {
    const { activeOrganization } = this.props.organizations;
    const { seasons } = this.props.seasons;
    const { tournaments } = this.props.tournaments;

    const filteredTournaments = tournaments.filter(
      tournament => tournament.idSeason === this.state.activeSeasonId
    );
    const sortedSeasons = seasons.sort(
      (seasonA, seasonB) => new Date(seasonA.endDate).getTime() - new Date(seasonB.endDate).getTime()
    );

    const getTournamentLogo = tournament => {
      return (
        <img
          alt=""
          src={getUploadsIcon(tournament.logoImgUrl, tournament.id, 'tournament')}
          className="Logo"
        />
      );
    };
    const getTournamentModeName = modeId => {
      const mode = activeOrganization.modes.find(mode => mode.id === modeId);
      if (!mode) return null;
      return mode.name;
    };
    const getTournamentStatusName = statusId => Localize(`TournamentStatus${statusId}`);

    return (
      <div className="Tournaments">
        <div className="ActionBar">
          <ul className="TabBar">
            {sortedSeasons.map(season => (
              <button
                key={uuidV4()}
                className={`TabItem ${this.state.activeSeasonId === season.id ? 'Active Color1' : 'Color2'}`}
                onClick={() => this.setActiveSeasonId(season.id)}
              >
                {season.name}
              </button>
            ))}
          </ul>
        </div>
        <div className="DataTableWrapper">
          <table className="DataTable">
            <thead>
              <tr className="DataTableHeaderRow Color1">
                <th className="DataTableHeaderCell DataTableCell">
                  <span className="DataTableHeaderSpan Color3">
                    <Loc>Logo</Loc>
                  </span>
                </th>
                <th className="DataTableHeaderCell DataTableCell">
                  <span className="DataTableHeaderSpan Color3">
                    <Loc>Tournament</Loc>
                  </span>
                </th>
                <th className="DataTableHeaderCell DataTableCell Expend">
                  <span className="DataTableHeaderSpan Color3">
                    <Loc>Tournament mode</Loc>
                  </span>
                </th>
                <th className="DataTableHeaderCell DataTableCell Expend">
                  <span className="DataTableHeaderSpan Color3">
                    <Loc>TournamentStatus</Loc>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTournaments.map(tournament => (
                <tr key={uuidV4()} className="DataTableRow">
                  <td className="DataTableCell ">{getTournamentLogo(tournament)}</td>
                  <td className="DataTableCell ">
                    <Link to={'/tournaments/' + tournament.id}>{tournament.name}</Link>
                  </td>
                  <td className="DataTableCell Expend">{getTournamentModeName(tournament.type)}</td>
                  <td className="DataTableCell Expend">{getTournamentStatusName(tournament.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  organizations: state.organizations,
  tournaments: state.tournaments,
  seasons: state.seasons,
});

export default connect(mapStateToProps)(Tournaments);
