import React, { Component } from 'react';
import CrudForm from '../../common/FormsMobx/CrudForm';
import { observer, inject } from 'mobx-react';


// DAVE: Use this as the reference CRUD impl

@inject('store')
@observer
class Facilities extends Component {
    render() {
        const target = this.props.store.facilities;

        return (
            <CrudForm 
                    title='Fields'
                    addMessage='Create new field'
                    editMessage='Edit field'
                    
                    getAllAction={target.actions.getAll}
                    editAction={(data) => target.actions.edit(data)}
                    addAction={(data) => target.actions.create(data)}
                    deleteAction={(data) => target.actions.remove(data)}

                    listData={target.all ? target.all.slice() : null}
                    loadingStatus={target.loading}    

                    addData={{
                        name: '',
                        address: '', 
                        location: '',
                        description: ''
                    }}

                    fieldDefinition={[
                        { fieldName: 'name', localizedLabel: 'Name', listRenderHandler: null, editRenderType: 'text', selectOptions: null, rules: 'required' },
                        { fieldName: 'address', localizedLabel: 'Address', listRenderHandler: null, editRenderType: 'text', selectOptions: null, rules: null },
                        { fieldName: 'location', localizedLabel: 'Location', listRenderHandler: null, editRenderType: 'text', selectOptions: null, rules: null },
                        { fieldName: 'description', localizedLabel: 'Description', listRenderHandler: null, editRenderType: 'text', selectOptions: null, rules: null, visibleInList: false },
                    ]}
                />
        )
    }
}

export default Facilities;