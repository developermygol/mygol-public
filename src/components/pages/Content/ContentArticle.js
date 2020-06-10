import React, { Component } from 'react';
import { getUploadsImg } from '../../helpers/Utils';
import { setupRawContent } from '../../../store-mobx/ContentStore';
import VideoContainer from './VideoContainer';


class ContentArticle extends Component {

    render() {
        const p = this.props;
        const { entry } = p;
        if (!entry) return null;

        return (
            <div className='ContentArticle'>
                <div className='MainMedia'>
                    {entry.videoUrl ? <VideoContainer video={entry.videoUrl} /> : null }
                    {entry.mainImgUrl ? getUploadsImg(entry.mainImgUrl, entry.id, null, 'MainImage') : null}
                </div>

                {/* <div 
                    className='MainImg'
                    style={{backgroundImage: 'url(' + getUploadsIcon(entry.mainImgUrl, entry.id, 'summary', '') + ')' }} >
                    
                    <div className='Summary'>
                        <p className='SummaryTitle'><Link to={'/content/' + entry.id}>{entry.title}</Link></p>
                    </div>
                </div> */}

                <h1>{entry.title}</h1>
                {entry.subTitle ? <h2>{entry.subTitle}</h2> : null }
                <div className='RawContent' dangerouslySetInnerHTML={{__html: setupRawContent(entry.rawContent)}} >
                </div>
            </div>
        )
    }
}

export default ContentArticle;