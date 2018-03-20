import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ProfileButton from '../containers/ProfileButton';

const Header = ({ rights, text }) => {
    const headerRoot = document.getElementById('ebsco_widget_header');

    if (!headerRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="header">
            <div className="infos">
                <div className="name">
                    <ProfileButton />
                </div>
                <div className="otherdomains">
                    {rights.length ? (
                        <span>
                            {text.authorizations} : {rights.join(', ')}
                        </span>
                    ) : null}
                </div>
            </div>
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
        authorizations: 'Domaines autorisés',
        connect: 'Connexion',
        disconnect: 'Déconnexion',
    },
};

export default Header;
