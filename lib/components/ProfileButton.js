import React from 'react';
import PropTypes from 'prop-types';

const ProfileButton = ({
    username,
    domains,
    availableDomains,
    favorite_domain,
    changeFavoriteDomaine,
    apiUpdateProfile,
    text,
}) => {
    const setFavoriteDomain = async event => {
        event.preventDefault();
        changeFavoriteDomaine(event.target.value);
        await apiUpdateProfile();
    };
    const domainDisplay = domains.join(', ');
    return (
        <button className="tooltip2 btn profile-button">
            {username}
            {domains.length ? (
                <span className="tooltip-text">
                    <b>{text.favorite_domain} : </b>
                    {favorite_domain}
                    <br />
                    <select
                        className="form-control"
                        onChange={setFavoriteDomain}
                    >
                        {availableDomains.map((domain, index) => (
                            <option
                                key={index}
                                value={domain}
                                selected={
                                    favorite_domain === domain ? 'selected' : ''
                                }
                            >
                                {domain}
                            </option>
                        ))}
                    </select>
                    <b>{text.authorizations} : </b>
                    {domainDisplay}
                </span>
            ) : null}
        </button>
    );
};
ProfileButton.propTypes = {
    username: PropTypes.string,
    favorite_domain: PropTypes.string,
    availableDomains: PropTypes.array.isRequired,
    domains: PropTypes.array.isRequired,
    changeFavoriteDomaine: PropTypes.func.isRequired,
    apiUpdateProfile: PropTypes.func.isRequired,
    text: PropTypes.any,
};

ProfileButton.defaultProps = {
    text: {
        profile: 'profile',
    },
};

export default ProfileButton;
