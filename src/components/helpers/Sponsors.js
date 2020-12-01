export const defaultSponsorConfig = {
  hide: false,
  inherit: true,
  type: 0,
};

export const retriveSponsorsDataByPosition = (sponsors, organizationData, tournamentData, position) => {
  let sponsorsList = [];
  let config = null;
  let isOrganization = false;
  let isTournament = false;
  const { sponsorsOrganization, sponsorsTournament } = sponsors;

  const tournamentPositionConfig = retriveSponsorConfigByPosition(tournamentData, position);
  const isNotOrgIherit = tournamentPositionConfig.inherit === false;

  if (isNotOrgIherit) {
    sponsorsList = sponsorsTournament.filter(sp => sp.position === position);
    config = tournamentPositionConfig;
    isTournament = true;
  } else {
    const organizationPositionConfig = retriveSponsorConfigByPosition(organizationData, position);
    sponsorsList = sponsorsOrganization.filter(sp => sp.position === position);
    config = organizationPositionConfig;
    isOrganization = true;
  }

  return { sponsors: sponsorsList, config, isOrganization, isTournament };
};

const retriveSponsorConfigByPosition = (stringData, position) => {
  const config = stringData === '' || !stringData ? null : JSON.parse(stringData);
  return config && config.sections ? config.sections[position] : defaultSponsorConfig;
};
