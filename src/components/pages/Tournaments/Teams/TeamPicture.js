import React, { Component } from 'react';
import {  getUploadsImg } from '../../../helpers/Utils';

class TeamPicture extends Component {
    render() {
        const p = this.props;
        const { image } = p;
        if (!image) return null;

        return (
            <div className='TeamImg'>{getUploadsImg(image, 0, 0)}</div>
        )
    }
}

export default TeamPicture;