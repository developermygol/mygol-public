import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import SlicSlider from './SlicSlider';

import SponsorItem from './SponsorItem';

const SponsorBanner = ({ className, isOrganization, isTournament, sponsors, config }) => {
  if (sponsors.length === 0 || config.hide) return null;
  let isSlider = config.type === 1;

  const sponsorsItems = sponsors.map(sp => <SponsorItem key={uuidv4()} className={className} sponsor={sp} />);

  if (isSlider)
    return (
      <div className={`SponsorSlider ${className}`}>
        <SlicSlider items={sponsorsItems} />
      </div>
    );

  return <div className={`SponsorContainer ${className}`}>{sponsorsItems}</div>;
};

export default SponsorBanner;
