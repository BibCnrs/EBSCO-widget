'use strict';

import React, { Component, PropTypes } from 'react';
import RcCheckbox from 'rc-checkbox';

export default class Limiters extends Component {
    render() {
        const { value } = this.props;
        return (
            <div>
                <label>Texte Intégral</label>
                <RcCheckbox
                    onChange={(e, value) => this.handleChange(e, value)}
                    checked={value ? 1 : 0}
                />
            </div>
        );
    }

    handleChange(e, value) {
        this.props.onChange(!value);
    }
}

Limiters.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired
};
