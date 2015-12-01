import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';
import Modal from 'react-modal';
import Icon from 'react-fa';

export default class ViewNotice extends Component {
    render() {
        const { index, status, error, data, shown, onShowNotice } = this.props;
        return (
            <span className="view_notice">
                <FetchButton
                    onClick={(e) => this.handleClick(e)}
                    status={status}
                    error={error}
                    icon="file-text"
                    label="Notice"
                />
                <Modal
                    isOpen={shown}
                    onRequestClose={() => onShowNotice(index, false)}
                >
                    <a className="close_notice" onClick={() => onShowNotice(index, false)}><Icon name="close"/></a>
                    <h4>Notices détaillées</h4>
                    <h3>{data && data.length ? data[0].value : undefined}</h3>
                    <dl className="notice">
                        {data.slice(1).map((datum, index) =>
                            <span key={index}>
                                <dt>{datum.label}</dt>
                                <dd>{datum.value}</dd>
                            </span>
                        )}
                    </dl>
                </Modal>
            </span>
        );
    }

    handleClick() {
        const { index, status, shown, onShowNotice, onFetchNotice } = this.props;
        if (status === 'SUCCESS') {
            return onShowNotice(index, !shown);
        }
        onFetchNotice(index);
    }
}

ViewNotice.propTypes = {
    index: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    error: PropTypes.string,
    data: PropTypes.array.isRequired,
    shown: PropTypes.bool,
    onShowNotice: PropTypes.func.isRequired,
    onFetchNotice: PropTypes.func.isRequired
};
