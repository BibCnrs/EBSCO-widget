import React, { Component } from 'react';

import hasChanged from '../services/hasChanged';

export default function applyIfChange(PureComponent) {

    class ApplyIfChangeComponent extends Component{
        constructor(props) {
            super(props);
            this.state = { initialValue: this.props.value };
        }
        onApply = () => {
            if (hasChanged(this.props.value, this.state.initialValue)) {
                this.setState({ initialValue: this.props.value});
                return this.props.onApply();
            }
        }
        render() {
            const props = {
                ...this.props,
                onApply: this.onApply
            };

            return (
                <PureComponent {...props}/>
            );
        }
    }

    return ApplyIfChangeComponent;
}
