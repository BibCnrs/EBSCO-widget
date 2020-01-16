import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import EDS from './EDS';
import Publication from './Publication';
import Database from '../containers/Database';
import FullScreen from '../containers/FullScreen';
import App from './App';
import BibNavbar from '../containers/BibNavbar';

function getActiveComponent(location) {
    switch (location) {
        case 'article':
            return EDS;
        case 'publication':
            return Publication;
        case 'database':
            return Database;
    }
}

const BibRouter = ({ location, isInistAccount, isJanusAccount }) => {
    const ActiveComponent = getActiveComponent(location);

    return (
        <App isJanusAccount={isJanusAccount}>
            <FullScreen>
                <BibNavbar />
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {isInistAccount ? (
                        <ActiveComponent key={`${location}`} isInistAccount />
                    ) : (
                        <ActiveComponent key={`${location}`} />
                    )}
                </CSSTransitionGroup>
            </FullScreen>
        </App>
    );
};

BibRouter.propTypes = {
    location: PropTypes.string.isRequired,
    isInistAccount: PropTypes.bool.isRequired,
    isJanusAccount: PropTypes.bool.isRequired,
};

export default BibRouter;
