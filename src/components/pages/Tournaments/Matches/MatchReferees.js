import React, { Component } from 'react';
import Loc from '../../../common/Locale/Loc';
import { getUploadsImg } from '../../../helpers/Utils';
import { observer } from 'mobx-react';

@observer
export default class MatchReferees extends Component {
    
    renderReferees = (referees) => {
        return referees.map(r => (
            <li key={r.idUser} className='Refer'>
                {getUploadsImg(r.referee.avatarImgUrl, r.idUser, 'user', 'PlayerAvatar Mini')}
                <p className='Name'>{r.referee.name}</p>
                {/* <Loc>{r.role}</Loc> */}
            </li>

        ))
    }
    
    render() {
        const p = this.props;
        const refers = p.referees;

        return (
            <div className='MatchRefers'>
                <h3><Loc>Referees</Loc></h3>
                {refers && refers.length > 0 ? 
                    <div className='Horizontal'>
                        {this.renderReferees(refers)}
                    </div>
                    : 
                    <p className='InfoBox'><Loc>Match.NoReferees</Loc></p>
                }
            </div>
        )
    }
}