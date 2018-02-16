import React, { Component } from 'react';
import PropTypes from 'prop-types';

import hasChanged from '../services/hasChanged';

export default function applyIfChange(PureComponent) {
    class ApplyIfChangeComponent extends Component {
        static propTypes = {
            value: PropTypes.any,
            onApply: PropTypes.func.isRequired,
        };

        state = { initialValue: this.props.value };

        onApply = () => {
            if (hasChanged(this.props.value, this.state.initialValue)) {
                this.setState({ initialValue: this.props.value });
                return this.props.onApply();
            }
        };
        render() {
            const props = {
                ...this.props,
                onApply: this.onApply,
            };

            return <PureComponent {...props} />;
        }
    }

    return ApplyIfChangeComponent;
}
