import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loc from './Locale/Loc';

@inject('store') @observer
class GlobalSponsors extends Component {

    render() {
        let org = this.props.store.organization.current;        
        if (!org || !org.sponsors) org = { sponsors: [
            { logoImgUrl: '/static/org/sponsors/adidas.png', link: 'http://adidas.com', alt: 'Adidas'},
            { logoImgUrl: '/static/org/sponsors/bk.png', link: 'http://burgerking.com', alt: 'Burger King, tú eres el king'},
            { logoImgUrl: '/static/org/sponsors/nike.png', link: 'http://nike.com', alt: 'Nike'},
            { logoImgUrl: '/static/org/sponsors/bbva.png', link: 'http://bbva.com', alt: 'BBVA'},
            { logoImgUrl: '/static/org/sponsors/gatorade.png', link: 'http://gatorade.com', alt: 'Gatorade'},
        ]};

        return (
            <div className='Sponsors'>
                <h4><Loc>Sponsors</Loc></h4>
                {org.sponsors.map((sponsor, i) => {
                    return <a key={i} className="Logo" href={sponsor.link}><img src={sponsor.logoImgUrl} alt={sponsor.alt} /></a>;
                })}
            </div>
        )
    }
}

export default GlobalSponsors;