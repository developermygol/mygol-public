import React from 'react';
import './Spinner.css';
import { isIE } from '../../helpers/Utils';

export default props => (
    props.status === 'busy' || props.loading ?
        (
            isIE ?
                <div className="spinnerIe">...</div>
                :
                <div className="Spinner"></div>
        )
        : 
        props.children
)

