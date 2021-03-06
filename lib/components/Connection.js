import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ProfileButton from '../containers/ProfileButton';
import { BibButton } from './BibButton';

const Connection = ({ logged, logout, showLogin, text }) => {
    const connectionRoot = document.getElementById('ebsco_widget_connection');

    const connectionElement = (
        <div>
            {logged ? (
                <div className="connection">
                    <ProfileButton />
                    <br />
                    <BibButton
                        bsStyle="link"
                        className="logout"
                        onClick={logout}
                        label={text.disconnect}
                    />
                </div>
            ) : (
                <BibButton
                    bsStyle="link"
                    className="login-button"
                    onClick={showLogin}
                    label={text.connect}
                />
            )}
        </div>
    );

    return !connectionRoot
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
