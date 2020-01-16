import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Connection from '../containers/Connection';
import Authentication from '../containers/Authentication';

const Header = ({ rights }) => {
    const headerRoot = document.getElementById('ebsco_widget_header');

    if (!headerRoot) {
        return null;
    }

    const domains = rights.length ? rights.join(', ') : '';

    return ReactDOM.createPortal(
        <div className="header pull-right">
            <Connection domains={domains} />
            <Authentication />
        </div>,
        headerRoot,
    );
};

Header.propTypes = {
    rights: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.any,
};

Header.defaultProps = {
    text: {
        connect: 'Connexion',
        disconnect: 'Déconnexion',
    },
};

export default Header;
