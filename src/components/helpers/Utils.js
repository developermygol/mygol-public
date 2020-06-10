import React from 'react';
import { toast } from 'react-toastify';
import { getOpErrorText } from '../common/FormsMobx/Utils';
import { Localize } from '../common/Locale/Loc';
import { Link } from 'react-router-dom';


export const startsWith = (str, stringBuscada, posicion) => {
    posicion = posicion || 0;
    return str.indexOf(stringBuscada, posicion) === posicion;
}


export const objToArray = (obj) =>  {
    const result = [];
    for (let p in obj) result.push(obj[p]);
    
    return result;
}

export const getOptionsFromKeyedObject = (data, valueField = 'fullName', idField = 'id') => {
    const result = objToArray(data);
    return result.map( m => ( { label: m[valueField], value: m[idField] } ) );
}

export const getRandomId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


const defIcons = {
    'team': 10,
    'tournament': 3,
    'user': 8,
    'summary': 2
};

export const getUploadsIcon = (imgSrc, idObject, type='team') => {
    if (imgSrc && imgSrc.length > 0 && imgSrc[0] === '/') return imgSrc;
    
    if (imgSrc) return getUploadUrl(imgSrc);

    if (typeof(idObject) === 'undefined') idObject = 0;
    const i = idObject % defIcons[type] + 1;
    return '/static/' + type + '/default' + i + '.png';
}

export const getUploadsImg = (imgSrc, idObject, type, className = null, alt='') => {
    return <img src={getUploadsIcon(imgSrc, idObject, type)} alt={alt} className={className} />;
}

export const getUploadUrl = (repoPath) => {
    if (!repoPath) return null;
    if (startsWith(repoPath, 'http')) return repoPath;
    return getUploadRoot() + '/' + repoPath;
}

export const getTeamLink = (idTournament, idTeam, content) => {
    if (!content) content = '--';
    return <Link to={'/tournaments/' + idTournament + '/teams/' + idTeam}>{content}</Link>;
}

export const getTeamLogo = (idTournament, idTeam, teamLogoUrl) => {
    return getTeamLink(idTournament, idTeam, getUploadsImg(teamLogoUrl, idTeam, 'team', 'TeamLogo'));
}

export const getMatchLink = (idTournament, idMatch, content) => {
    return <Link to={'/tournaments/' + idTournament + '/matches/' + idMatch}>{content}</Link>
}

export const getTournamentLink = (idTournament, content) => {
    if (!content) content = '--';
    return <Link to={'/tournaments/' + idTournament}>{content}</Link>;
}

export const getUploadRoot = () => {
    return getBaseUrl(process.env.REACT_APP_STATIC_UPLOADS_URL);
}


export const getBaseUrl = (url) => {
    return url.replace('{{BaseHost}}', window.location.hostname);
}

export const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const getPlayerLink = (idTournament, idTeam, player) => {
    if (!player) return '--';
    return <Link to={'/tournaments/' + idTournament + '/teams/' + idTeam + '/players/' + player.id}>{player.name + ' ' + player.surname}</Link>
    //return <Link to={'/tournaments/' + idTournament + '/players/' + player.id}>{player.name + ' ' + player.surname}</Link>
}

export const requestAsync = function(state, operation, okMessage, ...args) {
    return new Promise((resolve, reject) => {
        if (state) state.loading = true;

        operation(...args)
            .then(res => {
                if (state) state.loading = false;
                if (okMessage) toast.success(Localize(okMessage));
                resolve(res.data);
            },
            err => {
                if (state) state.loading = false;
                const errorMsg = getOpErrorText(err);
                toast.error(errorMsg);
                reject(errorMsg);
            })
    })
}

export const repeatContent = (content, times) => {
    let result = [];
    for (let i = 0; i < times; ++i) result.push(React.cloneElement(content, { key: i }));
    return result;
}


// Internet Explorer 6-11
export const isIE = /*@cc_on!@*/false || !!document.documentMode;


export const isDefaultDate = (date) => {
    return (date.getFullYear() === 1);
}

export const getCurrentDaysInObjectArray = (array, getDateCallback) => {
    const result = { previous: null, next: null, previousIdx: -1, nextIdx: 0 };
    if (!array || array.length === 0) return result;

    let lastTarget = null;
    const today = removeTimeFromDate(new Date());

    for (let i = 0; i < array.length; ++i) {
        const row = array[i];
        if (!row) continue;
        
        let objectDate = removeTimeFromDate(getDateCallback(row));
        if (!objectDate) continue;

        if (objectDate >= today) {
            result.previous = lastTarget;
            result.next = row;
            result.nextIdx = i;
            result.previousIdx = i - 1;
            break;
        }

        lastTarget = row;
    }

    return result;
}


export const removeTimeFromDate = (date) => {
    if (!date || !(typeof date.getMonth === 'function')) return null;

    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);

    return date;
}
