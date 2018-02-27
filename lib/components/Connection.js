import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { BibButton } from './BibButton';

const Connection = ({ logged, logout, showLogin, text }) => {
    const connectionRoot = document.getElementById('ebsco_widget_connection');

    if (!connectionRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="connection">
            {logged ? (
                <BibButton
                    bsStyle="link"
                    className="connection"
                    onClick={() => logout()}
                    label={text.disconnect}
                />
            ) : (
                <BibButton
                    bsStyle="link"
                    className="connection"
                    onClick={() => showLogin()}
                    label={text.connect}
                />
            )}
        </div>,
        connectionRoot,
    );
};

Connection.propTypes = {
    logged: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    showLogin: PropTypes.func.isRequired,
    text: PropTypes.any,
};

Connection.defaultProps = {
    text: {
        connect: 'Connexion',
        disconnect: 'Déconnexion',
    },
};

export default Connection;
