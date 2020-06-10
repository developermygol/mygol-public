import React, { Component } from 'react';
import Spinner from '../../common/Spinner/Spinner';
import DataTable from '../../common/DataTable';
import { getFieldLabel } from './Utils';
import { observer } from 'mobx-react';
import { getNestedValue } from './ListRenderHandlers';

const defaultProps = {
    additionalButtons: null,
    fieldDefinition: null,
    loading: false,
    listData: null
}

@observer
class List extends Component {

    getColumns = () => {
        const p = this.props;

        if (!p.fieldDefinition) return [];

        const fields = p.fieldDefinition.filter(f => f.hideInList === undefined || f.hideInList !== true);
        const columns = fields.map(f => {
            const fieldLabel = getFieldLabel(f);
            const fieldHandler = f.listRenderHandler || (v => getNestedValue(v, f.fieldName));
            
            return { id: f.fieldName, label: fieldLabel, handler: fieldHandler, className: f.className, headerClassName: f.headerClassName }
        });

        return columns;
    }


    render() {
        const p = this.props;
        const columns = this.getColumns();

        return (
            <React.Fragment>
                {p.title || null }
                <div className='ActionBar'>
                    {p.additionalButtons ? p.additionalButtons : null}
                </div>
                <Spinner loading={p.loading}>
                    <DataTable
                        isDataNormalized={false}
                        columns={columns}
                        data={p.listData}
                        idFieldName={p.idFieldName}
                    />
                </Spinner>
            </React.Fragment>
        )
    }
}

List.defaultProps = defaultProps;

export default List;