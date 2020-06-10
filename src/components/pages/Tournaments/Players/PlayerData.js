import React from 'react';
import { getAge, getUploadsImg } from '../../../helpers/Utils';
import Loc from '../../../common/Locale/Loc';
import { findByIdInArray } from '../../../helpers/Data';


export const getTeam = (player) => {
    if (!player.teamData || !player.teams) return null;
    return findByIdInArray(player.teams, player.teamData.idTeam);
}


export default (props) => {
    const { player } = props;
    const { teamData } = player;
    const team = getTeam(player);
    const backImg = player.largeImgUrl;

    return (
        <div className={'PlayerData Section' + (backImg ? ' WithBackground' : '')}>
            <div className='SimpleTeam'>
                {getUploadsImg(player.userData.avatarImgUrl, player.id, 'user', 'PlayerAvatar Medium')}
                
                {getUploadsImg(team && team.logoImgUrl, team && team.id, 'team', 'TeamLogo')}
                <p className="TeamName">{team && team.name}</p>
            </div>
            <table className="DetailsTable">
                <tbody>
                    <tr><td className='Key'><Loc>Name</Loc></td><td>{player.name} {player.surname}</td></tr>
                    <tr><td className='Key'><Loc>Age</Loc></td><td>{getAge(player.birthDate)}</td></tr>
                    <tr><td className='Key'><Loc>Height</Loc></td><td>{player.height} cm</td></tr>
                    <tr><td className='Key'><Loc>Weight</Loc></td><td>{player.weight} Kg</td></tr>
                    <tr><td className='Key'><Loc>FieldPosition</Loc></td><td><Loc>{teamData && teamData.fieldPosition ? 'FieldPosition' + player.teamData.fieldPosition : ''}</Loc></td></tr>
                    <tr><td className='Key'><Loc>TeamName</Loc></td><td>{team.name}</td></tr>
                    <tr><td className='Key'><Loc>ApparelNumber</Loc></td><td>{player.teamData.apparelNumber}</td></tr>
                </tbody>
            </table>
        </div>
    );
}