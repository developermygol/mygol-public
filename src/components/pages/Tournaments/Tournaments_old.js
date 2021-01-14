import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CrudForm from '../../common/FormsMobx/CrudForm';
import TournamentDetails from './Details';
import { inject, observer } from 'mobx-react';
import { textLookup, lookupById } from '../../common/FormsMobx/ListRenderHandlers';
import { getUploadsIcon } from '../../helpers/Utils';
import TitleTwoLinesComponent from '../../common/TitleTwoLinesComponent';
import { Localize } from '../../common/Locale/Loc';

@inject('store')
@observer
class Tournaments extends Component {
  getTournamentLogo = tournament => {
    return (
      <img alt="" src={getUploadsIcon(tournament.logoImgUrl, tournament.id, 'tournament')} className="Logo" />
    );
  };

  componentDidMount = () => {
    // Load list of tournaments from server here instead of in the list.
    // This is to ensure that the list is available even when using it in inner routes.
    this.props.store.tournaments.actions.getAll();
  };

  render() {
    const tournaments = this.props.store.tournaments;
    const listData = tournaments.all ? tournaments.all.slice() : null;
    const modes = this.props.store.organization.tournamentModes;

    return (
      <React.Fragment>
        <CrudForm
          title={
            <TitleTwoLinesComponent
              title={Localize('Select')}
              title2={Localize('Tournament')}
              className="Tournament"
            />
          }
          detailsComponent={TournamentDetails}
          routeIdParamName="idTournament"
          listData={listData}
          fieldDefinition={[
            {
              fieldName: 'logoImgUrl',
              localizedLabel: 'Logo',
              listRenderHandler: this.getTournamentLogo,
              editRenderType: 'upload',
              passProps: { uploadType: 300, idField: 'id' },
              hideInAdd: true,
            },
            {
              fieldName: 'name',
              localizedLabel: 'Tournament',
              localizedHint: 'Tournament name',
              listRenderHandler: v => <Link to={'/tournaments/' + v.id}>{v.name}</Link>,
              editRenderType: 'text',
              selectOptions: null,
              rules: 'required|between:4,50',
            },
            {
              fieldName: 'idTournamentMode',
              localizedLabel: 'Tournament mode',
              listRenderHandler: lookupById(modes, 'idTournamentMode', 'name'),
              headerClassName: 'Expend',
              className: 'Expend',
            },
            {
              fieldName: 'status',
              localizedLabel: 'TournamentStatus',
              listRenderHandler: textLookup('TournamentStatus', 'status'),
              hideInEdit: true,
              hideInAdd: true,
              headerClassName: 'Expend',
              className: 'Expend',
            },
          ]}
        />
      </React.Fragment>
    );
  }
}

export default Tournaments;
