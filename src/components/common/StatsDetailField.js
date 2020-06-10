import React, { Component } from 'react';
import Loc from './Locale/Loc';

class StatsDetailField extends Component {
    render() {
        const p = this.props;
        return (
            <div className='StatsDetailField'>
                <span className='Value'>{p.value || 0}{p.total ? <span className='Total'>/{p.total}</span> : null }</span>
                <span className='Caption'><Loc>{p.caption}</Loc></span>
                {p.extra || null}
            </div>
        )
    }
}

export default StatsDetailField;