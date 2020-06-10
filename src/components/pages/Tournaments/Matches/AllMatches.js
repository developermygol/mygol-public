import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import axios from '../../../../axios';
import { getOpErrorText } from '../../../common/FormsMobx/Utils';
import FlatDayView from '../Calendar/FlatDayView';
import Spinner from '../../../common/Spinner/Spinner';



@observer
class AllMatches extends Component {
    @observable error = null;
    @observable loading = true;
    @observable calendar = null;

    componentDidMount() {
        const idTournament = this.props.match.params.idTournament;

        axios.get("/matches/fortournament/" + idTournament)
            .then(res => {
                this.calendar = res.data;
                this.loading = false;
            })
            .catch(err => {
                this.error = getOpErrorText(err);
                this.loading = false;
            });
    }


    render() {
        const idTournament = this.props.match.params.idTournament;

        return (
            <Fragment>
                <Spinner loading={this.loading}>
                    <div className='MatchesTable'>
                        {this.calendar && this.calendar.length > 0 ?
                            this.calendar.map(day => {
                                return (
                                    <Fragment>
                                        <h3>{day.name}</h3>
                                        <table>
                                            <tbody>
                                                <FlatDayView key={day.id} value={day} idTournament={idTournament} />
                                            </tbody>
                                        </table>
                                    </Fragment>
                                )
                            })
                            : null}
                    </div>
                </Spinner>
            </Fragment>
        )
    }
}

export default AllMatches;