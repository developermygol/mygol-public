import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ContentManager from '../Content/ContentManager';
import Loc from '../../common/Locale/Loc';

class Home extends Component {
    render() {
        return (
            <div className='Home'>
                <div className='Tournaments'>
                    <Link to='/tournaments'><Loc>Tournaments</Loc></Link>
                </div>

                <ContentManager />
            </div>
        )
    }
}

export default withRouter(Home);