import React, { Component } from 'react';
import { inject, observer } from '../../../node_modules/mobx-react';
import { getUploadUrl } from '../helpers/Utils';

class SponsorDetail extends Component {
  render() {
    const p = this.props;
    const { sponsor } = p;

    if (sponsor.rawCode)
      return (
        <div
          className={'SponsorBanner ' + p.className}
          dangerouslySetInnerHTML={{ __html: sponsor.rawCode }}
        ></div>
      );

    return (
      <div className={'SponsorBanner ' + p.className}>
        <a href={sponsor.url} target="_blank">
          <img
            title={sponsor.altText}
            alt={sponsor.altText}
            src={getUploadUrl(sponsor.imgUrl)}
            className="SponsorImg"
          />
        </a>
      </div>
    );
  }
}

@inject('store')
@observer
class SponsorBanner extends Component {
  getSponsorForPosition = (sponsors, position) => {
    const result = sponsors
      .filter(s => s.position === position)
      .slice()
      .sort((a, b) => a.sequenceOrder - b.sequenceOrder);

    if (result.length === 0) return null;

    // console.log('getSponsorForPosition:', result);
    return result;
  };

  render() {
    const p = this.props;
    const sponsors = p.organization ? p.store.sponsors.forOrganization : p.store.sponsors.forTeam;
    if (!sponsors) return null;

    const sponsor = this.getSponsorForPosition(sponsors, p.position);
    if (!sponsor) return null;

    if (sponsor.rawCode)
      return <div dangerouslySetInnerHTML={{ html: sponsor.rawCode }} className="SponsorRaw" />;

    return (
      <div className={'SponsorContainer ' + p.className}>
        {sponsor.map(sponsor => (
          <SponsorDetail key={sponsor.id} className={p.className} sponsor={sponsor} />
        ))}
      </div>
    );
  }
}

export default SponsorBanner;
