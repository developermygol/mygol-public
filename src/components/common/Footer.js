import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getUploadsImg } from '../helpers/Utils';
import Loc from './Locale/Loc';

@inject('store') @observer
class Footer extends Component {
    render() {
        const p = this.props;
        const org = p.store.organization.current;
        if (!org) return null;

        return (
            <footer>
                <div className='Wrapper'>

                    <div className='Data'>
                        <div className='OrgAddress'>
                            <div className='Basic'>
                                <p className='OrgName'>{org.name}</p>
                                {org.motto ? <p className='OrgMotto'>{org.motto}</p> : null}
                            </div>
                            <p>{org.address1}</p>
                            <p>{org.address2}</p>
                            <p>{org.address3}</p>
                            {org.social1link ? <p className='Website'><a href={org.social1link} target='_blank'><Loc>Website</Loc></a></p> : null}
                        </div>
                        <div className='Social Bar'>
                            {org.social2link ? <a className='Facebook' href={org.social2link} target='_blank'>Facebook</a> : null }
                            {org.social3link ? <a className='Twitter' href={org.social3link} target='_blank'>Twitter</a> : null }
                            {org.social4link ? <a className='Instagram' href={org.social4link} target='_blank'>Instagram</a> : null }
                            {org.social5link ? <a className='Youtube' href={org.social5link} target='_blank'>Youtube</a> : null }
                        </div>
                        <div className='Logo'>
                            {getUploadsImg(org.logoImgUrl, org.id, 'org', 'Logo')}
                        </div>
                    </div>
                    <div className='Copy'>
                        <p className='MyGol'><a href='http://mygol.es'>MyGol Plataforma de Gestión Deportiva</a></p>
                        <p className='Devel'>(C) 2018 Desarrollado por <a href='https://dyquo.com'>Dyquo Labs</a> para <a href='http://tsmgroup.es/'>Technology Sports Management</a></p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;