import React, { Component } from 'react';
import ContentSection from './ContentSection';
import Spinner from '../../common/Spinner/Spinner';
import { inject, observer } from '../../../../node_modules/mobx-react';
import { withRouter } from 'react-router-dom';

@inject('store') @observer
class ContentSummary extends Component {
    componentDidMount() {
        const target = this.props.store.contents;
        if (target.all) return;

        target.getSummaries();
    }

    render() {
        const p = this.props;
        const target = p.store.contents;
        let category = p.match.params.idCategory;

        if (category) category = parseInt(category, 10);

        return (
            <Spinner loading={target.loading}>
                <ContentSection category={category} perRow={3} limit={100} entries={target.all} />
            </Spinner>
        )
    }
}

export default withRouter(ContentSummary);