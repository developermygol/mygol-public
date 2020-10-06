import React, { Component, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { observer, inject } from 'mobx-react';

import NavBar from './NavBar';
import Content from './Content';
import TopBar from './TopBar';
import Footer from './Footer';
import SponsorBanner from './SponsorBanner';

@inject('store')
@observer
class Root extends Component {
  componentDidMount = () => {
    this.props.store.organization.fetch();
  };

  render() {
    const org = this.props.store.organization.current;
    if (!org) return null;

    return (
      <Fragment>
        <div className="Root">
          <TopBar />
          <NavBar />
          <SponsorBanner className="Main" position={1} organization />
          <Content />
          {/* <GlobalSponsors /> */}
          <SponsorBanner className="Bottom" position={3} organization />
          <ToastContainer hideProgressBar={true} />
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Root;
