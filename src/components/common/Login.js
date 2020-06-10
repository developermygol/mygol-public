import React, { Component } from 'react';
import Loc from './Locale/Loc';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { getBaseUrl } from '../helpers/Utils';

@observer
class Login extends Component {

    render() {    
        return ( 
            <div className='Login'>
                <a href={getBaseUrl(process.env.REACT_APP_ADMINURL)} className=''><Loc>Sign in</Loc></a>
            </div>
        ) 
    }
}

export default withRouter(Login);