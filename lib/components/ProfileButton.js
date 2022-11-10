import React from 'react';
import PropTypes from 'prop-types';
import IconAvatar from './IconAvatar';

const ProfileButton = ({
    username,
    isJanusAccount,
    domains, // all domains
    availableDomains, // all authorized domains for favorite
    favorite_domain,
    changeFavoriteDomaine,
    apiUpdateProfile,
    text,
    logout,
    navigate,
}) => {
    const setFavoriteDomain = async event => {
        event.preventDefault();
        changeFavoriteDomaine(event.target.value);
        await apiUpdateProfile();
    };
    return (
        <button
            className="tooltip2 btn profile-button"
            aria-label={text.profile}
        >
            <IconAvatar />
            <i className="arrow down"></i>
            {domains.length ? (
                <span className="tooltip-text">
                    <h5>
                        <b>{username}</b>
                    </h5>
                    <hr />
                    {isJanusAccount === true && availableDomains.length > 1 ? (
                        <span className="available-domain">
                            <b>{text.favorite_domain} : </b>
                            <br />
                            <select
                                className="form-control"
                                onChange={setFavoriteDomain}
                                value={favorite_domain}
                                aria-label={text.selectFavoriteDomain}
                            >
                                {availableDomains.map((domain, index) => (
                                    <option key={index} value={domain}>
                                        {domain}
                                    </option>
                                ))}
                            </select>
                        </span>
                    ) : (
                        ''
                    )}
                    <hr />
                    <a
                        href="#"
                        className="license"
                        onClick={() => navigate('license')}
                    >
                        {text.licenses}
                    </a>
                    <hr />
                    <a href="#" className="logout" onClick={logout}>
                        {text.logout}
                    </a>
                </span>
            ) : null}
        </button>
    );
};
ProfileButton.propTypes = {
    username: PropTypes.string,
    isJanusAccount: PropTypes.bool.isRequired,
    favorite_domain: PropTypes.string,
    availableDomains: PropTypes.array.isRequired,
    domains: PropTypes.array.isRequired,
    changeFavoriteDomaine: PropTypes.func.isRequired,
    apiUpdateProfile: PropTypes.func.isRequired,
    text: PropTypes.any,
    logout: PropTypes.func,
    navigate: PropTypes.func,
};

ProfileButton.defaultProps = {
    text: {
        profile: 'profile',
    },
};

export default ProfileButton;
