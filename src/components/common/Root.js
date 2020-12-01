import React, { Component, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { observer, inject } from 'mobx-react';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import Content from './Content';
import TopBar from './TopBar';
import Footer from './Footer';
import SharedSponsorBanners from '../shared/SponsorBanners';
import { retriveSponsorsDataByPosition } from '../helpers/Sponsors';

import { startLoadOrganization } from '../../store/actions/organizations';
import { startLoadTournaments } from '../../store/actions/tournaments';
import { startLoadingSponsorsByIdOrganization } from '../../store/actions/sponsors';

@inject('store')
@observer
class Root extends Component {
  state = {
    loaded: null,
    showTournamentSponsors: false,
  };

  componentDidMount = async () => {
    this.props.store.organization.fetch();

    await this.props.onStartLoadOrganitzation();
    await this.props.onStartLoadTournaments();
    await this.props.onStartLoadingSponsorsByIdOrganization(1);
    this.setState({ loaded: true });
  };

  componentDidUpdate = (prevPorps, prevState) => {
    // debugger;
  };

  render() {
    const org = this.props.store.organization.current;

    if (!org || !this.state.loaded) return null;

    const topBanner = retriveSponsorsDataByPosition(
      this.props.sponsors,
      this.props.organizations.activeOrganization.sponsorData,
      this.props.tournaments.activeTournament ? this.props.tournaments.activeTournament.sponsorData : null,
      1
    );
    const bottomBanner = retriveSponsorsDataByPosition(
      this.props.sponsors,
      this.props.organizations.activeOrganization.sponsorData,
      this.props.tournaments.activeTournament ? this.props.tournaments.activeTournament.sponsorData : null,
      3
    );

    return (
      <Fragment>
        <div className="Root">
          <TopBar />
          <NavBar />
          {/* <SponsorBanner className="Main" position={1} organization /> */}

          <SharedSponsorBanners
            isOrganization={topBanner.isOrganization}
            isTournament={topBanner.isTournament}
            sponsors={topBanner.sponsors}
            config={topBanner.config}
          />

          <Content />
          {/* <GlobalSponsors /> */}
          {/* <SponsorBanner className="Bottom" position={3} organization /> */}

          <SharedSponsorBanners
            isOrganization={bottomBanner.isOrganization}
            isTournament={bottomBanner.isTournament}
            sponsors={bottomBanner.sponsors}
            config={bottomBanner.config}
          />

          <ToastContainer hideProgressBar={true} />
          {/* <SlicSlider /> */}
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  organizations: state.organizations,
  tournaments: state.tournaments,
  sponsors: state.sponsors,
});

const mapDispatchToProps = dispatch => ({
  onStartLoadOrganitzation: () => dispatch(startLoadOrganization()),
  onStartLoadTournaments: () => dispatch(startLoadTournaments()),
  onStartLoadingSponsorsByIdOrganization: id => dispatch(startLoadingSponsorsByIdOrganization(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
