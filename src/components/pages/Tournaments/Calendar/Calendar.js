import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import CalendarView from './CalendarView';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { getOpErrorText } from '../../../common/FormsMobx/Utils';
import axios from '../../../../axios';
import Spinner from '../../../common/Spinner/Spinner';

@observer
class Calendar extends Component {
  @observable error = null;
  @observable loading = true;
  @observable calendar = null;

  componentDidMount() {
    const idTournament = this.props.match.params.idTournament;

    axios
      .get('/matches/fortournament/' + idTournament)
      .then(res => {
        this.calendar = res.data.map(el => ({ ...el, matches: this.reorderMatches(el.matches) }));
        this.loading = false;
      })
      .catch(err => {
        this.error = getOpErrorText(err);
        this.loading = false;
      });
  }

  reorderMatches(matches) {
    // Resting match goes first in position
    const restMatch = matches.find(m => m.idVisitorTeam === -1 || m.idHomeTeam === -1);
    if (restMatch) {
      matches = matches.filter(m => m.id !== restMatch.id);
      matches.unshift(restMatch);
    }
    return matches;
  }

  render() {
    const idTournament = this.props.match.params.idTournament;

    return (
      <Fragment>
        <Spinner loading={this.loading}>
          {this.calendar && this.calendar.length > 0 ? (
            <CalendarView value={this.calendar} idTournament={idTournament} />
          ) : null}
        </Spinner>
      </Fragment>
    );
  }
}

export default withRouter(Calendar);
