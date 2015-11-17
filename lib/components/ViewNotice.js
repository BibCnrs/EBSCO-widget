'use strict';

import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';

export default class ViewNotice extends Component {
    render() {
        const { status, error, data, shown } = this.props.notice;
        return (
            <span>
                <FetchButton
                    onClick={(e) => this.handleClick(e)}
                    status={status}
                    error={error}
                    icon="file-text"
                    label="Notice"
                />
                {shown ? <dl>
                    {Object.keys(data).map((key) =>
                        <span key={key}>
                            <dt>{key}</dt>
                            <dd>{data[key]}</dd>
                        </span>
                    )}
                </dl> : null}
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
