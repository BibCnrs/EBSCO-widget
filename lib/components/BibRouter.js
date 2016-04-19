import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Authentication from '../containers/Authentication';
import EDS from '../containers/EDS';
import Publication from './Publication';
import FullScreen from '../containers/FullScreen';
import App from './App';

function getActiveComponent(location) {
    switch(location) {
    case 'article':
        return EDS;
    case 'publication':
        return Publication;
    case 'login':
        return Authentication;
    }
}

function getChildren(location, fullScreen) {
    const activeComponent = getActiveComponent(location);
    return fullScreen ? FullScreen(activeComponent) : activeComponent;
}

const BibRouter = ({ location, fullScreen }) => {
    const Children = getChildren(location, fullScreen);

    return (
        <App>
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                <Children key={`${location}-${fullScreen ? 'full-screen' : ''}`}/>
            </ReactCSSTransitionGroup>
        </App>
    );
};

export default BibRouter;
