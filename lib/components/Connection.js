import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { BibButton } from './BibButton';

const Connection = ({ logged, logout, showLogin, fullScreen, text }) => {
    const connectionRoot = document.getElementById('ebsco_widget_connection');

    const connectionElement = (
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
        </div>
    );

    return !connectionRoot || fullScreen
        ? connectionElement
        : ReactDOM.createPortal(connectionElement, connectionRoot);
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
