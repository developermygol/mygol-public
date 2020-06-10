import React, { Component } from 'react';
import Login from './Login';
import TopBarMenu from './TopBarMenu';
import { observer, inject } from 'mobx-react';
import { Localize } from './Locale/Loc';
import { Link } from 'react-router-dom';
import { getUploadsIcon } from '../helpers/Utils';
import SocialIcons from './SocialIcons';

@inject('store') @observer
class TopBar extends Component {
    
    render() {
        const org = this.props.store.organization.current || {
            name: Localize('Empty organization'),
            motto: Localize('Empty organization2'),
            logoImgUrl: '/static/org/mygol-logo.png'
        };

        return (
            <div className='TopBar'>
                {org ? (
                    <div className='OrgData'>
                        <TopBarMenu />
                        <div className='Logo' style={{backgroundImage: `url('${getUploadsIcon(org.logoImgUrl, org.id, 'org')}')`}} />
                        <div className="OrgName">
                        <Link to='/'><h1>{org.name}</h1></Link>
                        {org.motto ? <h2>{org.motto}</h2> : null}
                        </div>
                    </div>
                    ) : null
                }
                <div className='Actions'>
                    <SocialIcons />
                    <Login />
                </div>
            </div>
        )
    };
}

export default TopBar;