// We need: 
// - The table data (an array of objects)
//   - Including id (key)
//   - If a column can have links, a way to specify that as well
//   - If a column has images, a way to specify it
//   - If there is a tree structure (parents and children), a way to specify it
//   - If a column is a lookup, a way to specify it. 
//   - My guess is that all these special fields will become functions and this
//     component may provide helpers to help in solving the common tasks.
//     Maybe components instead of functions, just have to find a way to specify the parameters
// - A column collection with captions types and sortability
// - if checkboxes to select items are needed or not
// - Action buttons associated to each record
//   - Callbacks associated to each button

import React, { Component } from 'react';
import { objToArray } from '../helpers/Utils';

/*
    props: 
        - columns: an array of objects with at least the following properties:
            - id
            - label
            - width
            - fieldValue
            - handler: handler method that will receive the row being rendered and this column definition. Should return a component.
        - data: object array with fields. Field names match the fieldValue.
        - idFieldName: ID field name in the data. Default 'id'. Use to create unique keys. 
        - isDataNormalized: true if the data object is in normalized form.
*/

const defaultProps = {
    isDataNormalized: false,

}


class DataTable extends Component {

    getFieldValue(row, columnDefinition, index) {
        if (columnDefinition.handler) {
            return columnDefinition.handler(row, columnDefinition, index);
        } 
        else if (columnDefinition.fieldValue) {
            return row[columnDefinition.fieldValue];
        }

        return "";
    }

    render() {

        const data = (this.props.isDataNormalized) ? objToArray(this.props.data) : this.props.data;
        if (!data) return null;

        const idFieldName = this.props.idFieldName || 'id';

        return (
            <table className='DataTable'>
                <thead>
                    <tr className='DataTableHeaderRow'>
                        {this.props.columns.map(col => {
                            if (!col) return null;
                            return <th className={'DataTableHeaderCell DataTableCell ' + (col.headerClassName || '')} key={col.id} style={{ width: col.width }}><span className='DataTableHeaderSpan'>{col.label}</span></th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => {
                        return <tr className='DataTableRow' key={row[idFieldName]}>
                            {this.props.columns.map(col => {
                                if (col === null) return null;
                                const value = this.getFieldValue(row, col, i);
                                return <td className={'DataTableCell ' + (col.className || '')} key={row[idFieldName] + col.id}>{value}</td>
                            })}
                        </tr>
                    } ) }
                </tbody>
            </table>
        );
    }
}

DataTable.defaultProps = defaultProps;

export default DataTable;