import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loc from '../../../../common/Locale/Loc';
import { Link } from 'react-router-dom';
import Upload from '../../../../common/Upload';
import { getOpErrorText } from '../../../../common/FormsMobx/Utils';
import BackButton from '../../../../common/BackButton';
import { getBaseUrl } from '../../../../helpers/Utils';


@inject('store')
@observer
export default class LogoDisplay extends Component {
    
    saveHandler = () => {
        const { teams } = this.props.store;
        teams.actions.edit(teams.current);
    }

    removeHandler = () => {
        this.props.store.teams.current.logoImgUrl = null;        
    }

    onSuccess = (imgUrl) => {
        this.props.store.teams.current.logoImgUrl = imgUrl;
    }
    
    render() {
        const team = this.props.store.teams.current;
        if (!team) return null;

        return (
            <div className='LogoEdit'>
                <h2><Loc>Logo</Loc></h2>
                <div className='Display'>    
                    <Upload 
                        type={100}  // TeamLogo
                        idObject={team.id}
                        onSuccess={this.onSuccess}
                        onError={(err) => this.error = getOpErrorText(err)}
                        className='Logo'
                        >

                        {team.logoImgUrl ? 
                            <img src={getBaseUrl(process.env.REACT_APP_STATIC_UPLOADS_URL) + '/' + team.logoImgUrl} alt='logo' /> 
                            :
                            <div className='NoImage'>
                                <h3><Loc>Logo.NoLogo</Loc></h3>
                                <p><Loc>Logo.DropImageHere</Loc></p>
                                <p><span className='Button Active'><Loc>UploadButton</Loc></span></p>
                            </div>
                        }
                    </Upload>
                    <div className='GoEditor'>
                        <h3 className='Or'><Loc>Or</Loc></h3>
                        <p><Link className='Button Active' to={this.props.match.url + '/editor'}><Loc>Logo.Create</Loc></Link></p>
                        <p><Loc>Logo.Remove</Loc></p>
                        <p><button className='Button' onClick={this.removeHandler}><Loc>Logo.RemoveButton</Loc></button></p>
                    </div>
                </div>

                <div className='BottomActions'>
                    <BackButton />
                    <button className='Button Active' onClick={this.saveHandler}><Loc>Save</Loc></button>
                </div>
            </div>
        )
    }
}