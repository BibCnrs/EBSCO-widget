import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { BibButton } from './BibButton';

const ProfileButton = ({
    username,
    logged,
    showProfileButton,
    showProfile,
    isAnimated,
    domains,
    text,
}) =>
    logged && showProfileButton ? (
        <BibButton
            className={classnames('profile-button', { bounce: isAnimated })}
            bsStyle="link"
            tooltip={text.profile}
            onClick={showProfile}
            icon={{
                name: 'user',
                size: 'lg',
                className: 'profile-icon',
            }}
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
    showProfileButton: PropTypes.bool.isRequired,
    isAnimated: PropTypes.bool.isRequired,
    showProfile: PropTypes.func.isRequired,
    domains: PropTypes.string,
    text: PropTypes.any,
};

ProfileButton.defaultProps = {
    text: {
        profile: 'profile',
    },
};

export default ProfileButton;
