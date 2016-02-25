import React, { createClass } from 'react';

import hasChanged from '../services/hasChanged';

export default function applyIfChange(Component) {

    const ApplyIfChangeComponent = createClass({
        getInitialState: function () {
            return { initialValue: this.props.value };
        },
        onApply: function () {
            if (hasChanged(this.props.value, this.state.initialValue)) {
                this.setState({ initialValue: this.props.value});
                return this.props.onApply();
            }
        },
        render: function () {
            const props = {
                ...this.props,
                onApply: this.onApply
            };

            return (
                <Component {...props}/>
            );
        }
    });

    return ApplyIfChangeComponent;
}
