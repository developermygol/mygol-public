import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import List from './List';
import Details from './Details';


/*
    Field definition: 
    
    - listRenderHandler
    - editRenderType
    - selectOptions
    - hideInList: bool
    - hideInAdd: bool
    - hideInEdit: bool
*/


const defaultProps = {
    title: null,
    loadingStatus: false,
    canList: true,
    listBackButton: true,
    listAdditionalButtons: null,

    listComponent: List,
    detailsComponent: Details,

    listData: null,

    routePath: null,
    listRoutePath: null,
    routeUrl: null,
    routeIdParamName: 'id',

    getAllAction: null,
    getByIdAction: null,

    idFieldName: null,
    fieldDefinition: null,
}

class CrudForm extends Component {

    editedItem = null;


    getListProps = () => {
        const p = this.props;
        return {
            title: p.title,
            fieldDefinition: p.fieldDefinition,
            listData: p.listData,
            loadingStatus: this.props.loadingStatus,
            idFieldName: p.idFieldName,
            listBackButton: p.listBackButton,
            additionalButtons: p.listAdditionalButtons,
        }
    }

    getDetailsProps = () => {
        const p = this.props;
        return {
            fieldDefinition: p.fieldDefinition,
            data: this.editedItem
        }        
    }
    componentDidMount = () => {
        if (!this.props.canList || !this.props.getAllAction) return;

        this.props.getAllAction();
    }

    render() {
        const path = this.props.routePath || this.props.match.path;
        const listPath = this.props.listRoutePath || path;

        const ListComponent = this.props.listComponent;
        const listProps = this.getListProps();

        const DetailsComponent = this.props.detailsComponent;
        const detailsProps = this.getDetailsProps();

        const idParamName = this.props.routeIdParamName;

        return (
            <React.Fragment>
                <Switch>
                    <Route path={listPath} exact render={ (props) => <ListComponent {...listProps} /> }  />
                    <Route path={path + '/:' + idParamName} render={ (props) => <DetailsComponent {...detailsProps} /> } />
                </Switch>
            </React.Fragment>
        )

        
    }
}



CrudForm.defaultProps = defaultProps;

export default withRouter(CrudForm);