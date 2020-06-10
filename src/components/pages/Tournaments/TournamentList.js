import React, { Component, Fragment } from 'react';
import { getUploadsImg } from '../../helpers/Utils';
import { Link } from 'react-router-dom';
import Loc from '../../common/Locale/Loc';

class TournamentList extends Component {
    render() {
        const p = this.props;
        const { listData } = p;

        return (
            <Fragment>
                <h2><Loc>Tournaments</Loc></h2>
            <div className='Grid'>
                {listData && listData.map(row => {
                    return (
                        <div key={row.id} className='GridItem4'>
                            <Link to={'/tournaments/' + row.id}>{getUploadsImg(row.logoImgUrl, row.id, 'tournament', 'TournamentLogo Large')}</Link>
                            <Link className='LargeTournamentName' to={'/tournaments/' + row.id}>{row.name}</Link>
                        </div>
                    )
                })}
            </div>
            </Fragment>
        )
    }

    /*
        {p.title || null }
        <div className='ActionBar'>
            {p.additionalButtons ? p.additionalButtons : null}
        </div>
        <Spinner loading={p.loading}>
            <DataTable
                isDataNormalized={false}
                columns={columns}
                data={p.listData}
                idFieldName={p.idFieldName}
            />
        </Spinner>
    */
}

export default TournamentList;