'use strict';

import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';
import Modal from 'react-modal';
import Icon from 'react-fa';

export default class ViewNotice extends Component {
    render() {
        const { status, error, data, shown } = this.props.notice;
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
                    onRequestClose={() => this.props.onShow(false)}
                >
                    <a className="close_notice" onClick={() => this.props.onShow(false)}><Icon name="close"/></a>
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
        const { notice, onShow, onFetch } = this.props;
        if (notice.status === 'SUCCESS') {
            return onShow(!notice.shown);
        }
        onFetch();
    }
}

ViewNotice.propTypes = {
    onShow: PropTypes.func.isRequired,
    onFetch: PropTypes.func.isRequired,
    notice: PropTypes.object
};
