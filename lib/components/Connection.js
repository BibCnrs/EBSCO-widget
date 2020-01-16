import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ProfileButton from '../containers/ProfileButton';
import { BibButton } from './BibButton';

const Connection = ({ logged, showLogin, domains, text }) => {
    const connectionRoot = document.getElementById('ebsco_widget_connection');

    const connectionElement = (
        <div className="connection">
            {logged ? (
                <ProfileButton domains={domains} />
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
