import React, { Component } from 'react';
import { getUploadsIcon } from '../../helpers/Utils';
import { Link } from 'react-router-dom';
import VideoContainer from './VideoContainer';

class ArticleSummary extends Component {
  render() {
    const p = this.props;
    const { entry } = p;
    if (!entry) return null;

    const hasVideo = entry.videoUrl;

    return (
      <div
        className={
          'ArticleSummary Color1' + (p.perRow ? ' PerRow' + p.perRow : '') + (hasVideo ? ' WithVideo' : '')
        }
        style={
          !hasVideo
            ? {
                backgroundImage:
                  'url(' +
                  getUploadsIcon(entry.thumbImgUrl || entry.mainImgUrl, entry.id, 'summary', '') +
                  ')',
              }
            : null
        }
      >
        {hasVideo ? <VideoContainer video={entry.videoUrl} /> : null}

        <div className="Summary">
          <p className="SummaryTitle">
            <Link to={'/content/' + entry.id}>{entry.title}</Link>
          </p>
          <p className="SummarySubtitle">
            <Link to={'/content/' + entry.id}>{entry.subTitle}</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default ArticleSummary;
