import React, { Component } from 'react';
import ArticleSummary from './ArticleSummary';
import Loc from '../../common/Locale/Loc';
import  { Link } from 'react-router-dom';


const defaultProps = {
    category: null,
    limit: -1,
    entries: null,
    perRow: 1
}

class ContentSection extends Component {

    handleMoreButton = () => {

    }

    render() {
        const p = this.props; 
        if (!p.entries) return null;

        let entries = p.category ? p.entries.filter(e => e.idCategory === p.category) : p.entries;
        const numEntries = entries.length;
        if (p.limit > 0) entries = entries.slice(0, p.limit);

        //return 'Render summaries for section id (only specified number)';
        return (
            <div className='ArticleSection'>
                <div className='ArticleSectionWrapper'>
                    {entries.map(entry => {
                        return (
                            <ArticleSummary key={entry.id} entry={entry} perRow={p.perRow} />
                        )
                    })}
                </div>
                {p.moreButton && (numEntries > p.limit) ? 
                    <div className='MoreContents'>
                        <Link className='Button Front' to={'/content/section/' + p.category}><Loc>More contents</Loc></Link>
                        {/* <button className='Button Front' onClick={this.handleMoreButton}><Loc>More contents</Loc></button> */}
                    </div>
                    : null 
                }
            </div>
        )
    }
}

ContentSection.defaultProps = defaultProps;

export default ContentSection;