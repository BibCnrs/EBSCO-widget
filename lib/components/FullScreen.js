import React, { Component, PropTypes } from 'react';

export default class FullScreen extends Component {
    componentWillUpdate({ fullScreen }) {
        if (fullScreen) {
            return document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        }
        document.getElementsByTagName('html')[0].style.overflow = '';
    }
    render() {
        const { children, fullScreen } = this.props;
        return (
            <div className={fullScreen ? 'full-screen' : ''}>
                <div className="content">{ children }</div>
            </div>
        );
    }
}

FullScreen.propTypes = {
    children: PropTypes.array.isRequired,
    fullScreen: PropTypes.bool.isRequired
};
