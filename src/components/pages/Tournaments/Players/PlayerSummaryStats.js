import React, { Component } from 'react';
import StatsDetailField from '../../../common/StatsDetailField';

const defaultData = {
    gamesPlayed: 0,
    gamesWon: 0, 
    gamesDraw: 0,
    gamesLost: 0, 
    pointsInOwn: 0, 
    ranking1: 0, 
    ranking2: 0, 
    ranking3: 0, 
    cardsType1: 0, 
    cardsType2: 0
}

class PlayerSummaryStats extends Component {
    render() {
        let { data } = this.props;
        if (!data) data = defaultData;

        return (
            <div className='PlayerSummaryStats'>
                <StatsDetailField caption='GamesPlayed' value={data.gamesPlayed} />
                <StatsDetailField caption='GamesWon' value={data.gamesWon} />
                <StatsDetailField caption='GamesDraw' value={data.gamesDraw} />
                <StatsDetailField caption='GamesLost' value={data.gamesLost} />
                <StatsDetailField caption='PointsInOwn' value={data.pointsInOwn} />
                <p>&nbsp;</p>
                <StatsDetailField caption='Data2' value={data.ranking1} total={0} />
                <StatsDetailField caption='Data3' value={data.ranking2} total={0} />
                <StatsDetailField caption='Data4' value={data.ranking3} total={0} />
                <p>&nbsp;</p>
                <StatsDetailField caption='CardsType1' value={data.cardsType1} />
                <StatsDetailField caption='CardsType2' value={data.cardsType2} />
                <StatsDetailField caption='Data1' value={data.data1} />
            </div>
        )
    }
}

export default PlayerSummaryStats;