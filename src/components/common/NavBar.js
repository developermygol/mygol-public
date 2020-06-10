import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loc from './Locale/Loc';
import routes from './NavBarRoutes';
import { inject, observer } from 'mobx-react';
import { getBaseUrl } from '../helpers/Utils';

@inject('store') @observer
class NavBar extends Component {

    handleClick = () => {
        const navbar = document.getElementById('NavBar');
        navbar.classList.remove("Show");
    }

    render() {
        const p = this.props;
        const navBarRoutes = routes.filter(r => r.navbar);
        const orgMenuEntries = p.store.organization.menuEntries;

        return (
            <nav className='NavBar' id='NavBar'>

                <ul className='Items'>
                    {navBarRoutes.map( item => ( 
                        <li key={item.route}>
                            <Link className='NavBarLink' to={item.route} onClick={this.handleClick}>
                                <Loc>{item.localizedText}</Loc>
                            </Link>
                        </li>
                    ))}

                    {orgMenuEntries ? 
                        orgMenuEntries.map(en => (
                            <li key={en.id}>
                                <Link className='NavBarLink' to={'/content/' + en.id} onClick={this.handleClick}>
                                    {en.title}
                                </Link>
                            </li>
                        ))
                        : 
                        null
                    }

                    <li><Link className='NavBarLink' to='/contact' onClick={this.handleClick}><Loc>Contact</Loc></Link></li>
                    <li className='NavBarLogin'><a href={getBaseUrl(process.env.REACT_APP_ADMINURL)} className='NavBarLink'><Loc>Sign in</Loc></a></li>
                </ul>
            </nav>
        )
    }
}

export default NavBar;