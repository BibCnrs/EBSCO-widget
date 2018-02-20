import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Header = ({ username, availableDomains, text }) => {
    const headerRoot = document.getElementById('ebsco_widget_header');

    if (!headerRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="infos bsbb">
            <div className="name bsbb">{username}</div>
            <div className="otherdomains bsbb">
                {availableDomains.length ? (
                    <span>
                        {text.authorizations} : {availableDomains.join(', ')}
                    </span>
                ) : null}
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
    },
};

export default Header;
