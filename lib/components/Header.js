import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { BibButton } from './BibButton';

const Header = ({
    username,
    availableDomains,
    logged,
    logout,
    showLogin,
    showProfileButton,
    showProfile,
    text,
}) => {
    const headerRoot = document.getElementById('ebsco_widget_header');

    if (!headerRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="infos bsbb">
            <div className="name bsbb">
                {logged && showProfileButton ? (
                    <BibButton
                        bsStyle="link"
                        tooltip={text.profile}
                        onClick={() => showProfile()}
                        icon={{ name: 'user' }}
                        label={username}
                    />
                ) : (
                    <span>{username}</span>
                )}
            </div>
            <div className="otherdomains bsbb">
                {availableDomains.length ? (
                    <span>
                        {text.authorizations} : {availableDomains.join(', ')}
                    </span>
                ) : null}
            </div>
            <div>
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
        </div>,
        headerRoot,
    );
};

Header.propTypes = {
    username: PropTypes.string.isRequired,
    availableDomains: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.any,
};

Header.defaultProps = {
    text: {
        authorizations: 'Domaines autorisés',
        connect: 'Connexion',
        disconnect: 'Déconnexion',
    },
};

export default Header;
