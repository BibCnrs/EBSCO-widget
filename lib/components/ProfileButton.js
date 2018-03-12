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
        <span>{username}</span>
    );

ProfileButton.propTypes = {
    username: PropTypes.string.isRequired,
    logged: PropTypes.bool.isRequired,
    showProfileButton: PropTypes.bool.isRequired,
    isAnimated: PropTypes.bool.isRequired,
    showProfile: PropTypes.func.isRequired,
    text: PropTypes.any,
};

ProfileButton.defaultProps = {
    text: {
        profile: 'profile',
    },
};

export default ProfileButton;
