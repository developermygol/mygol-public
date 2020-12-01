import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { connect } from 'react-redux';

import Classification from './Classification';
import Spinner from '../../common/Spinner/Spinner';
import Calendar from './Calendar/Calendar';
// import SponsorBanner from '../../common/SponsorBanner';
import SharedSponsorBanners from '../../shared/SponsorBanners';
import Loc from '../../common/Locale/Loc';
import TournamentSanctionsSummary from './Sanctions/TournamentSanctionsSummary';
import Rankings from './Rankings/Rankings';
import { retriveSponsorsDataByPosition } from '../../helpers/Sponsors';
import { setActiveTournament } from '../../../store/actions/tournaments';
import { startLoadingSponsorsByIdTournament } from '../../../store/actions/sponsors';

@inject('store')
@observer
class CompetitionHome extends Component {
  state = {
    loaded: false,
  };

  componentDidMount = () => {
    if (this.props.tournaments.activeTournament) this.setState({ loaded: true });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (!prevProps.tournaments.activeTournament) {
      const tournamentId = parseInt(this.props.match.params.idTournament, 10);
      await this.props.onStartLoadingSponsorsByIdTournament(tournamentId);
      await this.props.onSetActiveTournamnet(
        this.props.tournaments.tournaments.find(t => t.id === tournamentId)
      );
      this.setState({ loaded: true });
    }
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
            <h3>
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
            <h3>
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
            <h3>
              <Loc>Rankings</Loc>
            </h3>
            <Rankings tournament={t} history={this.props.history} />
          </div>

          {}

          <div className="Section">
            <h3>
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
});

const mapDispatchToProps = dispatch => ({
  onSetActiveTournamnet: tournament => dispatch(setActiveTournament(tournament)),
  onStartLoadingSponsorsByIdTournament: id => dispatch(startLoadingSponsorsByIdTournament(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompetitionHome));
