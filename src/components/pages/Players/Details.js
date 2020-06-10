import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Loc from '../../common/Locale/Loc';
import { requestAsync } from '../../helpers/Utils';
import { observable } from 'mobx';
import axios from '../../../axios';
import Spinner from '../../common/Spinner/Spinner';


@observer
class PlayerDetails extends Component {

    @observable loading = false;
    @observable player = null;

    getTeamLink(idTeam, idTournament, teamName) {
        return <Link to={'/tournaments/' + idTournament + '/teams/' + idTeam}>{teamName}</Link>;
    }

    componentDidMount = () => {
        const playerId = this.props.match.params.idPlayer;
        requestAsync(this, axios.get, null, '/players/' + playerId)
            .then(res => this.player = res);
    }

    render() {
        const player = this.player;
        if (!player) return null;

        return (
            <Spinner loading={this.loading}>
                {player ?
                        <div className='SectionContainer'>
                            <div className='Header'>
                                <h1>{player.name + ' ' + player.surname}</h1>
                            </div>
                            
                            <div className='Section'>
                                <h3><Loc>Profile</Loc></h3>
                                <div className='Content'>
                                    <p>Profile picture, basic stats, social content</p>
                                </div>
                            </div>
                            
                            <div className='Section'>
                                <h3><Loc>Awards</Loc></h3>
                                <div className='Content'>
                                    <p>Player awards</p>
                                </div>
                            </div>
                            
                            <div className='Section'>
                                <h3><Loc>Stats</Loc></h3>
                                <div className='Content'>
                                    <p>Player stats per day and tournament totals.</p>
                                </div>
                            </div>

                        </div>






                        /* <div className='CardContainer'>

                            <div className='Card Hero'>
                                <h3>Datos básicos</h3>
                                <div className='Content'>
                                    <div className='ShowSection'>
                                        {player.userData && getUploadsImg(player.userData.avatarImgUrl, player.id, 'user', 'PlayerAvatar Large')}
                                    </div>


                                    <div className='ShowSection'>
                                        <p className='FormField Separator'><Loc>Personal data</Loc></p>
                                        <ul>
                                            <DetailField label='IdCard' value={player.idCardNumber} />
                                            <DetailField label='Address1' value={player.address1} />
                                            <DetailField label='Address2' value={player.address2} />
                                            <DetailField label='City' value={player.city} />
                                            <DetailField label='State' value={player.state} />
                                            <DetailField label='CP' value={player.cp} />
                                            <DetailField label='Country' value={player.country} />

                                            <DetailField label='Email' value={player.userData && player.userData.email} />
                                            <DetailField label='Mobile' value={player.userData && player.userData.mobile} />
                                        </ul>
                                    </div>

                                    <div className='ShowSection'>
                                        <p className='FormField Separator'><Loc>Public profile data</Loc></p>
                                        <DetailField label='Age' value={getAge(player.birthDate)} />
                                        <DetailField label='Height' value={player.height} />
                                        <DetailField label='Weight' value={player.weight} />

                                        <DetailField label='FacebookKey' value={player.facebookKey} />
                                        <DetailField label='InstagramKey' value={player.instagramKey} />
                                        <DetailField label='TwitterKey' value={player.twitterKey} />
                                        <DetailField label='Motto' value={player.Motto} />
                                        <DetailField label='SignatureImgUrl' value={player.SignatureImgUrl} />
                                        <DetailField label='LargeImgUrl' value={player.LargeImgUrl} />
                                    </div>
                                    <div className='ShowActions'>
                                        {idTeam ? 
                                            // <Link className='Button' to={'edit/' + idPlayer} ><Loc>Edit</Loc></Link>   // Replace with this when functionality is enabled
                                            <button disabled className='Button'><Loc>Edit</Loc></button>
                                        :
                                        null 
                                        }
                                    </div>
                                </div>
                            </div>

                            {idTeam ? 
                                null
                            :
                            <div className='Card Hero'>
                                <h3>Equipos en los que participa</h3>
                                <div className='Content'>
                                    {(player.teams && player.teams.length > 0) ?
                                        <List
                                            canAdd={false}
                                            canEdit={false}
                                            canDelete={false}
                                            listBackButton={false}
                                            listData={player.teams.slice()}
                                            loadingStatus='ready'
                                            fieldDefinition={[
                                                { fieldName: 'logoImgUrl', localizedLabel: 'Logo', listRenderHandler: (t) => getUploadsImg(t.logoImgUrl, t.id, 'team', 'TeamLogo') },
                                                { fieldName: 'name', localizedLabel: 'Team name', listRenderHandler: (t) => this.getTeamLink(t.id, t.teamData.idTournament, t.name) },
                                                { fieldName: 'teamData.apparelNumber', localizedLabel: 'ApparelNumber' },
                                                { fieldName: 'teamData.fieldPosition', localizedLabel: 'FieldPosition', listRenderHandler: textLookup('FieldPosition', 'teamData.fieldPosition') },
                                                { fieldName: 'teamData.fieldSide', localizedLabel: 'FieldSide', listRenderHandler: textLookup('FieldSide', 'teamData.fieldSide') },
                                                { fieldName: '1', localizedLabel: 'Tournament' },
                                                { fieldName: '2', localizedLabel: 'Season' },
                                                { fieldName: '4', localizedLabel: 'Points' },
                                                { fieldName: '5', localizedLabel: 'Cards' },
                                                { fieldName: '6', localizedLabel: 'Ranking MVP' },
                                                { fieldName: '7', localizedLabel: 'Ranking points' },
                                            ]}
                                        />
                                        :
                                        <Loc>Player.NoTeams</Loc>
                                    }
                                </div>
                            </div>
                            }

                            {(player.events) ?
                                <div className='Card Hero'>
                                    <h3>Eventos</h3>
                                    <div className='Content'>
                                        <PlayerEvents player={player} />
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div> */
                : null}
            </Spinner>
        )
    }
}

export default withRouter(PlayerDetails)