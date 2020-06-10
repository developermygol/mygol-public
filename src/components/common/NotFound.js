import React from 'react';
import Loc from './Locale/Loc';

export default props => (
    <div>
        <h2 className='Error'><Loc>Error.NotFound</Loc></h2>
        <p><Loc>Error.NotFound.Desc</Loc></p>
    </div>
)