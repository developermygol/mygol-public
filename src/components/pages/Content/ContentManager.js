import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Loc from '../../common/Locale/Loc';
import Spinner from '../../common/Spinner/Spinner';
import ContentSection from './ContentSection';
import { connect } from 'react-redux';
import SharedSponsorBanners from '../../shared/SponsorBanners';
import { defaultSponsorConfig } from '../../helpers/Sponsors';

@inject('store')
@observer
class Content extends Component {
  componentDidMount() {
    const target = this.props.store.contents;

    target.getSummaries();
  }

  render() {
    const p = this.props;
    const target = p.store.contents;
    
    const MiddleSponsors = this.props.sponsors.sponsorsOrganization.filter(sp => sp.position === 2);
    const stringSponsorsData = this.props.organizations.activeOrganization.sponsorData;
    const sponsorsConfig = !stringSponsorsData || stringSponsorsData === '' ? null : JSON.parse(stringSponsorsData);

    return (
      <Spinner loading={target.loading}>
        {target.all ? (
          <div className="">
            <ContentSection category={2} perRow={1} entries={target.all} limit={1} moreButton />
            {/* <SponsorBanner className="Secondary" position={2} organization /> */}
            <SharedSponsorBanners
              isOrganization
              sponsors={MiddleSponsors}
              config={sponsorsConfig ? sponsorsConfig.sections[1] : defaultSponsorConfig}
            />
            <ContentSection category={3} perRow={3} entries={target.all} limit={9} moreButton />
          </div>
        ) : (
          <Loc>NoNews.PleaseAddSome</Loc>
        )}
      </Spinner>
    );
  }
}

const mapStateToProps = state => ({ organizations: state.organizations, sponsors: state.sponsors });

export default connect(mapStateToProps)(Content);
