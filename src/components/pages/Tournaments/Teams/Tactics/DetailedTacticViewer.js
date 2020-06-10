import React, { Component, Fragment } from 'react';
import TacticViewer from './TacticViewer';
import Loc from '../../../../common/Locale/Loc';
import Spinner from '../../../../common/Spinner/Spinner';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { findByIdInArray } from '../../../../helpers/Data';

@inject('store') @observer
export default class DetailedTacticViewer extends Component {

    @observable tactic = null;

    componentDidMount() {
        const t = this.props.store.tactics;
        t.fetchOnce()
            .then(res => {
                if (res && res.tactics) this.tactic = findByIdInArray(res.tactics, this.props.value);
            });
    }

    render() {
        const tactic = this.tactic;

        return (
            <div className='TacticDetails'>
                <Spinner loading={this.props.store.tactics.loading} >
                    <h3><Loc>Tactic</Loc></h3>
                    <div className='Field'>
                        <TacticViewer positions={tactic ? tactic.positions : null} players={this.props.players} />
                    </div>
                    <div className='Details'>
                        {tactic ? (
                            <Fragment>
                                {/* <p className='TacticName'>{tactic.name}</p>
                                <p className='TacticTitle'>{tactic.title}</p>
                                <p className='TacticDescription'>{tactic.description}</p> */}
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <p className='TacticName'><Loc>Tactic.NoTactic</Loc></p>
                            </Fragment>
                        )}
                    </div>
                </Spinner>
            </div>
        );
    }
}