import React, { Component } from 'react';
import ApparelSvg from './ApparelSvg';
import Loc from '../../../../common/Locale/Loc';

export default class Apparel extends Component {
    render() {
        const p = this.props;
        if (!p.data) return null;

        const apparelConfig = JSON.parse(p.data);

        return (
            <div className='ApparelDetails'>
                <h3><Loc>Apparel</Loc></h3>
                <ApparelSvg {...apparelConfig} />
            </div>
        );
    }
}