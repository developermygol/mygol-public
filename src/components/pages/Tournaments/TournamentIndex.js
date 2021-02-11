import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { connect } from 'react-redux';

import { retriveSponsorsDataByPosition } from '../../helpers/Sponsors';
import {
  setActiveTournament,
  startLoadTournamentDreamTeamRankings,
} from '../../../store/actions/tournaments';
import { startLoadingSponsorsByIdTournament } from '../../../store/actions/sponsors';
import { setActiveTheme, setTournamentTheme } from '../../../store/actions/theme';

import Classification from './Classification';
import Spinner from '../../common/Spinner/Spinner';
import Calendar from './Calendar/Calendar';
// import SponsorBanner from '../../common/SponsorBanner';
import SharedSponsorBanners from '../../shared/SponsorBanners';
import TournamentSanctionsSummary from './Sanctions/TournamentSanctionsSummary';
import Rankings from './Rankings/Rankings';
import DreamTeam from './DreamTeam/DreamTeam';
import Loc from '../../common/Locale/Loc';
import { validJsonString } from '../../helpers/Utils';

@inject('store')
@observer
class CompetitionHome extends Component {
  state = {
    loaded: false,
  };

  componentDidMount = async () => {
    const tournamentId = parseInt(this.props.match.params.idTournament, 10);
    await this.props.onStartLoadingSponsorsByIdTournament(tournamentId);
    await this.props.onSetActiveTournamnet(
      this.props.tournaments.tournaments.find(t => t.id === tournamentId)
    );
    await this.props.onStartLoadTournamentDreamTeamRankings(tournamentId);
    // 🚧🔎 MOB-X
    await this.props.store.tournaments.setCurrent(tournamentId);

    const { appearanceData } = this.props.tournaments.activeTournament;
    const theme = validJsonString(appearanceData);
    if (theme) {
      this.props.onSetTournamentTheme(theme);
      this.props.onSetActiveTheme(theme);
    }
    this.setState({ loaded: true });
  };

  componentWillUnmount = () => {
    this.props.onSetTournamentTheme(null);
    if (this.props.theme.themeOrganization) this.props.onSetActiveTheme(this.props.theme.themeOrganization);
  };

  render() {
    const t = this.props.store.tournaments.current;

    if (this.state.loaded !== true) return null;

    const middleBanner = retriveSponsorsDataByPosition(
      this.props.sponsors,
      this.props.organizations.activeOrganization.sponsorData,
      this.props.tournaments.activeTournament.sponsorData,
      2
    );

    return (
      <div className="SectionContainer">
        <div className="Header"></div>
        <Spinner loading={t === undefined || t === null}>
          <div className="Section">
            <h3 className="Color2">
              <Loc>Classification</Loc>
            </h3>
            <div className="Content">
              <Classification data={t} />
            </div>
          </div>

          {/* <SponsorBanner className="Secondary" position={2} organization /> */}
          <SharedSponsorBanners
            isOrganization={middleBanner.isOrganization}
            isTournament={middleBanner.isTournament}
            sponsors={middleBanner.sponsors}
            config={middleBanner.config}
          />

          <div className="Section">
            <h3 className="Color2">
              <Loc>Calendar</Loc>
            </h3>
            <div className="Content">
              <Link className="ActionLink" to={this.props.match.url + '/matches'}>
                <Loc>View complete calendar</Loc>
              </Link>
              <Calendar />
            </div>
          </div>

          {}

          <div className="Section">
            <h3 className="Color2">
              <Loc>Dream team</Loc>
            </h3>
            <DreamTeam />
          </div>

          {}

          <div className="Section">
            <h3 className="Color2">
              <Loc>Rankings</Loc>
            </h3>
            <Rankings tournament={t} history={this.props.history} />
          </div>

          {}

          <div className="Section">
            <h3 className="Color2">
              <Loc>Sanctions</Loc>
            </h3>
            <div className="Content">
              <TournamentSanctionsSummary />
            </div>
          </div>
        </Spinner>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  organizations: state.organizations,
  tournaments: state.tournaments,
  sponsors: state.sponsors,
  theme: state.theme,
});

const mapDispatchToProps = dispatch => ({
  onSetActiveTournamnet: tournament => dispatch(setActiveTournament(tournament)),
  onStartLoadTournamentDreamTeamRankings: id => dispatch(startLoadTournamentDreamTeamRankings(id)),
  onStartLoadingSponsorsByIdTournament: id => dispatch(startLoadingSponsorsByIdTournament(id)),
  onSetTournamentTheme: theme => dispatch(setTournamentTheme(theme)),
  onSetActiveTheme: theme => dispatch(setActiveTheme(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompetitionHome));
