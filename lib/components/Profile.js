import PropTypes from 'prop-types';
import React from 'react';
import {
    Alert,
    ControlLabel,
    FormControl,
    FormGroup,
    Modal,
    Panel,
    Tabs,
    Tab,
} from 'react-bootstrap';

import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';
import FavouriteResourceList from '../containers/FavouriteResourceList';

const Profile = ({
    changeFavoriteDomaine,
    domains,
    favorite_domain,
    hideProfile,
    invalidFavoriteDomainShown,
    onSubmit,
    profileShown,
    status,
    text,
    username,
}) => (
    <Modal className="authentication" show={profileShown} onHide={hideProfile}>
        <Modal.Header closeButton>{text.title}</Modal.Header>
        <Modal.Body>
            <Tabs defaultEventKey={1}>
                <Tab title={text.favouriteResourcesTab} eventKey={1}>
                    <FavouriteResourceList />
                </Tab>
                <Tab title={text.favouriteDomainTab} eventKey={2}>
                    {invalidFavoriteDomainShown && (
                        <Alert bsStyle="danger">
                            <p>
                                {text.invalidFavoriteDomain}{' '}
                                <b>{favorite_domain}</b>.
                            </p>
                        </Alert>
                    )}
                    <p>
                        {text.account} <b>{username}</b>
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: text.info }} />

                    <Panel className="bibapi" collapsible defaultExpanded>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>{text.favoriteDomain}</ControlLabel>
                            <FormControl
                                className="favorite_domain"
                                value={favorite_domain}
                                onChange={e =>
                                    changeFavoriteDomaine(e.target.value)
                                }
                                componentClass="select"
                                placeholder={text.login}
                                name="username"
                            >
                                {domains.map(domain => (
                                    <option key={domain} value={domain}>
                                        {domain}
                                    </option>
                                ))}
                            </FormControl>
                        </FormGroup>

                        <FetchButton
                            className="api"
                            block={true}
                            bsStyle={
                                status === 'SUCCESS' ? 'success' : undefined
                            }
                            onClick={() => onSubmit()}
                            status={status}
                            icon="check"
                            label={
                                status === 'SUCCESS'
                                    ? text.saveSuccess
                                    : text.save
                            }
                        />
                    </Panel>
                </Tab>
            </Tabs>
        </Modal.Body>
        <Modal.Footer>
            <a href="mailto:assistance-portail@inist.fr">{text.contact}</a>
        </Modal.Footer>
    </Modal>
);

Profile.propTypes = {
    changeFavoriteDomaine: PropTypes.func.isRequired,
    domains: PropTypes.arrayOf(PropTypes.string).isRequired,
    favorite_domain: PropTypes.string,
    hideProfile: PropTypes.func.isRequired,
    invalidFavoriteDomainShown: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    profileShown: PropTypes.bool.isRequired,
    status: PropTypes.string,
    text: PropTypes.object,
    username: PropTypes.string.isRequired,
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
