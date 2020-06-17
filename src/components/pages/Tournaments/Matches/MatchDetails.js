import React, { Component } from 'react';
import Spinner from '../../../common/Spinner/Spinner';
import MatchHeader from './MatchHeader';
import MatchReferees from './MatchReferees';
import MatchPlayers from './MatchPlayers';
import MatchEvents from './Events/Events';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { requestAsync } from '../../../helpers/Utils';
import axios from '../../../../axios';
import Loc from '../../../common/Locale/Loc';
import MatchObservations from './MatchObservations';
import MatchSanctions from '../Sanctions/MatchSanctions';

@observer
class MatchDetails extends Component {
  @observable error = null;
  @observable data = null;
  @observable loading = false;
  @observable showSelectReferee = false;

  updateMatch = () => {
    const idMatch = this.props.match.params.idMatch;

    requestAsync(this, axios.get, null, '/matches/' + idMatch).then(
      res => (this.data = res),
      err => (this.error = err)
    );
  };

  componentDidMount = () => {
    this.updateMatch();
  };

  render() {
    const m = this.data;

    return (
      <Spinner loading={this.loading}>
        <div className="Section">
          <h2>
            <Loc>Match details</Loc>
          </h2>
          {m ? (
            <div className="MatchDetails">
              {/* <TitleTwoLinesComponent
                                title={<Fragment>{m.homeTeam.name} <span className='Vs'>vs</span></Fragment>}
                                title2={m.visitorTeam.name}
                                className='Match'
                            /> */}
              <MatchHeader match={m} onEdit={this.handleEditMatch} />
              <MatchPlayers match={m} />
              <MatchReferees referees={this.data.referees} />
              <MatchEvents data={m} />
              <MatchObservations match={m} />
              <MatchSanctions />
            </div>
          ) : null}
        </div>
      </Spinner>
    );
  }
}

export default withRouter(MatchDetails);
