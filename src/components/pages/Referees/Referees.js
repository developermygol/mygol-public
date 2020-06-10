import React, { Component } from 'react';
import CrudForm from '../../common/FormsMobx/CrudForm';
import { observer, inject } from 'mobx-react';
import { getUploadsImg } from '../../helpers/Utils';

@inject('store')
@observer
class Facilities extends Component {
    render() {
        const target = this.props.store.referees;

        return (
            <CrudForm 
                    title='Referees'
                    addMessage='Create new referee'
                    editMessage='Edit referee'
                    
                    getAllAction={target.actions.getAll}
                    editAction={(data) => target.actions.edit(data)}
                    addAction={(data) => target.actions.create(data)}
                    deleteAction={(data) => target.actions.remove(data)}

                    listData={target.all ? target.all.slice() : null}
                    loadingStatus={target.loading}    

                    addData={{
                        name: '',
                        email: '', 
                        mobile: '',
                        avatarImgUrl: null,
                    }}

                    fieldDefinition={[
                        { fieldName: 'avatarImgUrl', localizedLabel: 'AvatarImg', hideInAdd: true, listRenderHandler: (r) => getUploadsImg(r.avatarImgUrl, r.id, 'user', 'PlayerAvatar Mini'), editRenderType: 'upload', passProps: { uploadType: 200, idField: 'id' } },
                        { fieldName: 'name', localizedLabel: 'Name', listRenderHandler: null, editRenderType: 'text', rules: 'required|between:5,100' },
                        { fieldName: 'email', localizedLabel: 'Email', hideInList: true, editRenderType: 'text', rules: 'required|email' },
                        { fieldName: 'mobile', localizedLabel: 'Mobile', hideInList: true, editRenderType: 'text', rules: 'required|between:9,15' },
                    ]}
                />
        )
    }
}

export default Facilities;