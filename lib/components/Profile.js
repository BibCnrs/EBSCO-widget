import React, { PropTypes } from 'react';
import { Alert, ControlLabel, FormControl, FormGroup, Modal, Panel } from 'react-bootstrap';

import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

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
        <Modal.Header closeButton>
            <b>{username}</b> - {text.title}
        </Modal.Header>
        <Modal.Body>
            {invalidFavoriteDomainShown &&
                <Alert bsStyle="danger">
                    <p>{text.invalidFavoriteDomain} <b>{favorite_domain}</b>.</p>
                </Alert>
            }
            <p><small dangerouslySetInnerHTML={{__html:text.info}}></small></p>

            <Panel
                className="bibapi"
                collapsible
                expanded
            >
                <FormGroup controlId="formControlsSelect">
                     <ControlLabel>{text.favoriteDomain}</ControlLabel>
                    <FormControl
                        className="favorite_domain"
                        value={favorite_domain}
                        onChange={(e) => changeFavoriteDomaine(e.target.value)}
                        componentClass="select"
                        placeholder={text.login}
                        name="username"
                    >
                        {domains.map(domain => <option key={domain} value={domain}>{domain}</option>)}
                    </FormControl>
                </FormGroup>

                <FetchButton
                    className="api"
                    block={true}
                    bsStyle={status === 'SUCCESS' ? 'success' : undefined}
                    onClick={() => onSubmit()}
                    status={status}
                    icon="check"
                    label={text.save}
                />
            </Panel>
        </Modal.Body>
        <Modal.Footer><a href="mailto:assistance-portail@inist.fr">{text.contact}</a></Modal.Footer>
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
        contact: 'Nous contacter',
        favoriteDomain: 'Communauté favorite',
        info: 'Vos préférences pour le compte:',
        invalidFavoriteDomain: 'Vous n\'avez pas/plus accès à votre communauté favorite:',
        save: 'Enregistrer',
        title: 'Préférences',
    }
};

export default translate(Profile, 'Profile');
