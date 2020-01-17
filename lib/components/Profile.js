import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-bootstrap';

import translate from '../higherOrderComponents/translate';
import FavouriteResourceList from '../containers/FavouriteResourceList';
import FavouriteDomainItem from './FavouriteDomainItem';

const Profile = ({
    apiUpdateProfile,
    changeFavoriteDomaine,
    domains,
    favorite_domain,
    invalidFavoriteDomainShown,
    text,
}) => {
    async function setFavoriteDomain(domain) {
        await apiUpdateProfile(domain);
        changeFavoriteDomaine(domain);
    }

    return (
        <div className="profile">
            <div className="profile-left">
                <h4>{text.favouriteResourcesTab}</h4>
                <FavouriteResourceList />
            </div>
            <div className="profile-right">
                <div className="domains">
                    <h4>{text.domainsTab}</h4>
                    {invalidFavoriteDomainShown && (
                        <Alert bsStyle="danger">
                            <p>
                                {text.invalidFavoriteDomain}{' '}
                                <b>{favorite_domain}</b>.
                            </p>
                        </Alert>
                    )}
                    {domains.map(domain => (
                        <FavouriteDomainItem
                            title={text.favouriteDomainTab}
                            favourite={domain === favorite_domain}
                            key={domain}
                            domain={domain}
                            onStar={() => setFavoriteDomain(domain)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    changeFavoriteDomaine: PropTypes.func.isRequired,
    domains: PropTypes.arrayOf(PropTypes.string).isRequired,
    favorite_domain: PropTypes.string,
    invalidFavoriteDomainShown: PropTypes.bool.isRequired,
    apiUpdateProfile: PropTypes.func.isRequired,
    status: PropTypes.string,
    text: PropTypes.object,
    username: PropTypes.string,
};

Profile.defaultProps = {
    text: {
        account: 'Vos préférences pour le compte:',
        contact: 'Nous contacter',
        favoriteDomain: 'Communauté favorite',
        info: `<p>Si vous êtes ayant-droit de plusieurs domaines, vous pouvez définir le domaine par défaut sur lequel porteront vos recherches.</p>
        <p>La prise en compte de votre domaine favori nécessite la déconnexion puis la reconnexion à BibCnrs dès que vous enregistrez un autre domaine.</p>
        <p>A tout moment, vous pouvez changer votre domaine favori.</p>`,
        invalidFavoriteDomain:
            "Vous n'avez pas/plus accès à votre communauté favorite:",
        save: 'Enregistrer',
        saveSuccess: 'Domaine enregistré',
        title: 'Mon profil',
    },
};

export default translate(Profile, 'Profile');
