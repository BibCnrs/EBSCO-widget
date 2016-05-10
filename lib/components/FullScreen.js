import React, { Component } from 'react';

export default class FullScreen extends React.Component {
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
                { children }
            </div>
        );
    }
}
