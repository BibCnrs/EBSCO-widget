import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { BibButton } from './BibButton';

const ProfileButton = ({ username, logged, isAnimated, domains, text }) =>
    logged ? (
        <BibButton
            className={classnames('profile-button', { bounce: isAnimated })}
            label={username}
        />
    ) : (
        <div className="tooltip2">
            {username}
            <span className="tooltip-text">
                <b>{text.authorizations} : </b> {domains}
            </span>
        </div>
    );

ProfileButton.propTypes = {
    username: PropTypes.string,
    logged: PropTypes.bool.isRequired,
    isAnimated: PropTypes.bool.isRequired,
    domains: PropTypes.string,
    text: PropTypes.any,
};

ProfileButton.defaultProps = {
    text: {
        profile: 'profile',
    },
};

export default ProfileButton;
