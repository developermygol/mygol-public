import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SanctionList from './SanctionList';
import Loc from '../../../common/Locale/Loc';
import { withRouter } from 'react-router-dom';

@inject('store')
@observer
class MatchSanctions extends Component {
  componentDidMount = () => {
    const { idMatch } = this.props.match.params;
    this.props.store.sanctions.getAllForMatch(idMatch);
  };

  render() {
    const p = this.props;
    const sanctions = p.store.sanctions.all;
    if (!sanctions || sanctions.length === 0) return null;

    return (
      <div className="Section">
        <h3 className="Color1">
          <Loc>Sanctions.Match.All</Loc>
        </h3>
        <SanctionList data={sanctions} />
      </div>
    );
  }
}

export default withRouter(MatchSanctions);
