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
        <div className="header">
            <div className="infos">
                <div className="name">
                    {logged && showProfileButton ? (
                        <BibButton
                            bsStyle="link"
                            tooltip={text.profile}
                            onClick={() => showProfile()}
                            icon={{
                                name: 'user',
                                size: 'lg',
                                className: 'profile-icon',
                            }}
                            label={username}
                        />
                    ) : (
                        <span>{username}</span>
                    )}
                </div>
                <div className="otherdomains">
                    {availableDomains.length ? (
                        <span>
                            {text.authorizations} : {availableDomains.join(', ')}
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="connect">
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
