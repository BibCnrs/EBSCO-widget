import PropTypes from 'prop-types';
import React from 'react';

import EDS from './EDS';
import Publication from './Publication';
import License from './License';
import Database from '../containers/Database';
import App from './App';
import BibNavbar from '../containers/BibNavbar';
import Metadore from './Metadore/Metadore';

function getActiveComponent(location) {
    switch (location) {
        case 'article':
            return EDS;
        case 'publication':
            return Publication;
        case 'database':
            return Database;
        case 'license':
            return License;
        case 'metadore':
            return Metadore;
    }
}

const BibRouter = ({ location, isInistAccount, isJanusAccount }) => {
    const ActiveComponent = getActiveComponent(location);

    return (
        <App isJanusAccount={isJanusAccount}>
            <BibNavbar
                isLogged={isJanusAccount || isInistAccount ? true : false}
            />
            {isInistAccount ? (
                <ActiveComponent key={`${location}`} isInistAccount />
            ) : (
                <ActiveComponent key={`${location}`} />
            )}
        </App>
    );
};

BibRouter.propTypes = {
    location: PropTypes.string.isRequired,
    isInistAccount: PropTypes.bool.isRequired,
    isJanusAccount: PropTypes.bool.isRequired,
};

export default BibRouter;
