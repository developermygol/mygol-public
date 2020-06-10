import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class BaseDialog extends Component {

    render() {
        if (!this.props.show) return null;

        return (
            <div className="BackDrop" onClick={() => this.props.onClose('Cancel')}>
                <div className="ModalWindow" onClick={(e) => e.stopPropagation()}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

BaseDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};