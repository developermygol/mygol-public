import React, { Component } from 'react';
import Menu from 'react-feather/dist/icons/menu';

class TopBarMenu extends Component {

    clickHandler = () => {
        const navbar = document.getElementById('NavBar');
        navbar.classList.toggle("Show");
    }

    render() {
        return (
            <span className='MenuOpener' onClick={this.clickHandler}><Menu /></span>
        )
    }
}

export default TopBarMenu;