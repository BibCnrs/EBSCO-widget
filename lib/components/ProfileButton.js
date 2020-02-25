import React from 'react';
import PropTypes from 'prop-types';

const ProfileButton = ({ username, domains, text }) => {
    return (
        <button className="tooltip2 btn profile-button">
            {username}
            {domains.length ? (
                <span className="tooltip-text">
                    <b>{text.authorizations} : </b>
                    {domains}
                </span>
            ) : null}
        </button>
    );
};
ProfileButton.propTypes = {
    username: PropTypes.string,
    domains: PropTypes.string,
    text: PropTypes.any,
};

ProfileButton.defaultProps = {
    text: {
        profile: 'profile',
    },
};

export default ProfileButton;
