import React from 'react';

import { getUploadUrl } from '../helpers/Utils';

const SponsorItem = ({ className, sponsor }) => {
  const { rawCode, url, altText, imgUrl } = sponsor;
  if (rawCode && rawCode !== '')
    return (
      <div
        className={`SponsorBanner ${className}`}
        dangerouslySetInnerHTML={{ __html: sponsor.rawCode }}
      ></div>
    );

  return (
    <div className={`SponsorBanner ${className}`}>
      <a href={url} target="_blank">
        <img title={altText} alt={altText} src={getUploadUrl(imgUrl)} className="SponsorImg" />
      </a>
    </div>
  );
};

export default SponsorItem;
