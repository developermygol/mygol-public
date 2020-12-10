import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SanctionList from './SanctionList';
import Loc from '../../../common/Locale/Loc';
import { withRouter } from 'react-router-dom';

@inject('store')
@observer
class PlayerSanctions extends Component {
  render() {
    return (
      <div className="Section">
        <h3 className="Color2">
          <Loc>Sanctions.Player.All</Loc>
        </h3>
        <SanctionList data={this.props.sanctions} />
      </div>
    );
  }
}

export default withRouter(PlayerSanctions);
