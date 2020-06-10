import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class SocialIcons extends Component {
    render() {
        const p = this.props;
        const org = p.store.organization.current;
        if (!org) return null;

        return (
            <div className='Social Bar'>
                {org.social2link ? <a className='Facebook' href={org.social2link} target='_blank'>Facebook</a> : null }
                {org.social3link ? <a className='Twitter' href={org.social3link} target='_blank'>Twitter</a> : null }
                {org.social4link ? <a className='Instagram' href={org.social4link} target='_blank'>Instagram</a> : null }
                {org.social5link ? <a className='Youtube' href={org.social5link} target='_blank'>Youtube</a> : null }
            </div>
        )
    }
}

export default SocialIcons;