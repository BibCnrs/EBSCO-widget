import PropTypes from 'prop-types';
import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import EDS from './EDS';
import Publication from './Publication';
import Database from '../containers/Database';
import FullScreen from '../containers/FullScreen';
import App from './App';
import BibNavbar from '../containers/BibNavbar';

function getActiveComponent(location) {
    switch(location) {
    case 'article':
        return EDS;
    case 'publication':
        return Publication;
    case 'database':
        return Database;
    }
}

const BibRouter = ({ location }) => {
    const ActiveComponent = getActiveComponent(location);

    return (
        <App>
            <FullScreen>
                <BibNavbar/>
                {/* <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}> */}
                    <ActiveComponent key={`${location}`}/>
                {/* </ReactCSSTransitionGroup> */}
            </FullScreen>
        </App>
    );
};

BibRouter.propTypes = {
    location: PropTypes.string.isRequired
};

export default BibRouter;
