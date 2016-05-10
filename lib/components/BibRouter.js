import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Authentication from '../containers/Authentication';
import EDS from '../containers/EDS';
import Publication from './Publication';
import A2z from '../containers/A2z';
import FullScreen from '../containers/FullScreen';
import App from './App';
import BibNavbar from '../containers/BibNavbar';

function getActiveComponent(location) {
    switch(location) {
    case 'article':
        return EDS;
    case 'publication':
        return Publication;
    case 'a2z':
        return A2z;
    }
}

const BibRouter = ({ location }) => {
    const ActiveComponent = getActiveComponent(location);

    return (
        <App>
            <FullScreen>
                <BibNavbar/>
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    <ActiveComponent key={`${location}`}/>
                </ReactCSSTransitionGroup>
            </FullScreen>
        </App>
    );
};

export default BibRouter;
