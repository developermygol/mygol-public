import React, { Component } from 'react';
import Loc from '../../../common/Locale/Loc';

class MatchObservations extends Component {
    render() {
        const p = this.props;
        if (!p.match || !p.match.comments) return null;

        return (
            <div className='MatchMinutes'>
                <h3><Loc>Match.Minutes</Loc></h3>
                <pre className='Content'>{p.match.comments}</pre>
            </div>
        )
    }
}

export default MatchObservations;