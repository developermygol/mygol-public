import React from 'react';
import Loc from './Locale/Loc';

export default props => {
    return (props.detail) ? 
        <div className='ErrorBox'>
            <p><Loc>{props.localizedMessage}</Loc></p>
            <p className='Details'>({props.detail})</p>
        </div>
        : null
}