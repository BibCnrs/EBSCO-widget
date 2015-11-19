'use strict';

import React, { Component, PropTypes } from 'react';
import FullTextLimiter from './FullTextLimiter';

export default class Limiters extends Component {
    render() {
        const { onChangeFullText } = this.props;
        const { fullText } = this.props.limiters;
        return (
            <div className="limiters">
                <h4>Limiter à</h4>
                <FullTextLimiter
                    onChange={onChangeFullText}
                    value={fullText}
                />
            </div>
        );
    }
}

Limiters.propTypes = {
};
