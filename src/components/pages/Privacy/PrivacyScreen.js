import React from 'react';
import { useSelector } from 'react-redux';

import Loc, { LocalizeIMultyple } from '../../common/Locale/Loc';

const PrivacyScreen = () => {
  const { activeOrganization } = useSelector(state => state.organizations);
  const {
    name,
    dpCompanyName,
    dpCompanyId,
    dpCompanyAddress,
    dpCompanyEmail,
    dpCompanyPhone,
  } = activeOrganization;
  const hasOrgTermsData =
    name && dpCompanyName && dpCompanyId && dpCompanyAddress && dpCompanyEmail && dpCompanyPhone;

  if (!hasOrgTermsData)
    return (
      <div className="PrivacyScreen">
        <p className="InfoBox">
          <Loc>Terms.NoOrgData</Loc>
        </p>
      </div>
    );

  return (
    <div className="PrivacyScreen">
      <h2>
        <Loc>Privacy policy title</Loc>
      </h2>
      <p className="Literal">
        {LocalizeIMultyple('DataProtectionGeneral', dpCompanyName, dpCompanyId, dpCompanyAddress)}
      </p>
      <h2>
        <Loc>General terms title</Loc>
      </h2>
      <p className="Literal">
        {LocalizeIMultyple(
          'DataProtectionLSSI',
          dpCompanyName,
          dpCompanyId,
          dpCompanyAddress,
          name,
          dpCompanyEmail,
          dpCompanyPhone,
          '' // 🔎💥
        )}
      </p>
    </div>
  );
};

export default PrivacyScreen;
