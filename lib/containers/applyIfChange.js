import React, { createClass } from 'react';

export default function applyIfChange(Component) {

    const ApplyIfChangeComponent = createClass({
        getInitialState: function () {
            return { initialValue: this.props.value };
        },
        onApply: function () {
            if (this.props.value !== this.state.initialValue) {
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
