import React, { Component } from 'react';
import { startsWith } from '../../helpers/Utils';

class VideoContainer extends Component {
    getVimeoId = (url) => {
        const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
        const parseUrl = regExp.exec(url)
        return parseUrl[5];
    }

    getYoutubeId = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        // eslint-disable-next-line eqeqeq
        return (match&&match[7].length==11)? match[7] : false;
    }

    getVideoEmbed = (videoUrl) => {
        if (startsWith(videoUrl, 'https://youtu')) return <iframe title='youtube' className="Video" src={"https://www.youtube.com/embed/" + this.getYoutubeId(videoUrl) + "?rel=0&amp;showinfo=0"} frameBorder="0" allow="encrypted-media" allowFullScreen></iframe>
        if (startsWith(videoUrl, 'https://vimeo')) return <iframe title='vimeo' className="Video" src={"https://player.vimeo.com/video/" + this.getVimeoId(videoUrl)} frameBorder="0" allowFullScreen></iframe>
        
        return null;
    }

    render() {
        const p = this.props;
        const { video } = p;
        if (!video) return null;

        return (
            <div className="VideoContainer">
                {this.getVideoEmbed(video)}
            </div>

        )
    }
}

export default VideoContainer;