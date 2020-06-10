import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { requestAsync } from '../../helpers/Utils';
import axios from '../../../axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner';
import ContentArticle from './ContentArticle';
import { observable } from 'mobx';


@observer
class ContentDetails extends Component {
    
    @observable loading = true;
    @observable error = null;
    @observable data = null;

    updateArticle = () => {
        const { idArticle } = this.props.match.params;

        requestAsync(this, axios.get, null, '/contents/' + idArticle)
            .then(res => this.data = res);
    }

    componentDidMount() {
        this.updateArticle();
    }
    
    componentDidUpdate = (prevProps) => {
        // eslint-disable-next-line eqeqeq
        if (this.props.location != prevProps.location) this.routeChangedHandler();
    }

    routeChangedHandler  = () => {
        this.updateArticle();
    }

    render() {
        const entry = this.data;

        return (
            <Spinner loading={this.loading}>
                {entry ? 
                    <ContentArticle entry={entry} />
                    : 
                    null
                }
            </Spinner>
        )
    }
}

export default withRouter(ContentDetails);