import React, { Component } from 'react';

export default function (Component) {

    class FullScreen extends React.Component {
        componentWillMount() {
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        }
        componentWillUnmount() {
            document.getElementsByTagName('html')[0].style.overflow = '';
        }
        render() {
            return (
                <div className="full-screen">
                    <Component/>
                </div>
            );
        }
    }
    FullScreen.propTypes = {};

    return FullScreen;
}
