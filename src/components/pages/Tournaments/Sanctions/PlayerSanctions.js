import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SanctionList from './SanctionList';
import Loc from '../../../common/Locale/Loc';
import { withRouter } from 'react-router-dom';

@inject('store')
@observer
class PlayerSanctions extends Component {
  render() {
    const { sanctions, currentIdTeam, currentIdTournament } = this.props;
    // console.log(sanctions, currentIdTeam, currentIdTournament);
    const filteredSanctions = sanctions.filter(
      sanction =>
        sanction.idTournament === parseInt(currentIdTournament, 10) &&
        sanction.idTeam === parseInt(currentIdTeam, 10)
    );

    return (
      <div className="Section">
        <h3 className="Color2">
          <Loc>Sanctions.Player.All</Loc>
        </h3>
        {/* <SanctionList data={sanctions} /> */}
        <SanctionList data={filteredSanctions} />
      </div>
    );
  }
}

export default withRouter(PlayerSanctions);
