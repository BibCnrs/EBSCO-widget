import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Collapse, Well } from 'react-bootstrap';

import translate from '../higherOrderComponents/translate';
import FavouriteResourceList from '../containers/FavouriteResourceList';
import PersonalResourceList from '../containers/PersonalResourceList';
import BibButton from './BibButton';

const getIconType = open => {
    if (open) {
        return { name: 'chevron-down' };
    }

    return { name: 'chevron-right' };
};

const Profile = ({ text }) => {
    const [displayInfo, setDisplayInfo] = useState(true);

    return (
        <div id="homepageResource">
            <BibButton
                className="resource-opener float-right"
                icon={getIconType(!!displayInfo)}
                bsStyle="link"
                onClick={() => setDisplayInfo(!displayInfo)}
            />
            <Collapse in={displayInfo}>
                <Well>
                    <div className="profile">
                        <div className="profile-left">
                            <FavouriteResourceList text={text} />
                        </div>
                        <div className="profile-right">
                            <PersonalResourceList text={text} />
                        </div>
                    </div>
                </Well>
            </Collapse>
        </div>
    );
};

Profile.propTypes = {
    text: PropTypes.object,
};

Profile.defaultProps = {
    text: {
        account: 'Vos préférences pour le compte:',
        contact: 'Nous contacter',
        info: `<p>Si vous êtes ayant-droit de plusieurs domaines, vous pouvez définir le domaine par défaut sur lequel porteront vos recherches.</p>
        <p>La prise en compte de votre domaine favori nécessite la déconnexion puis la reconnexion à BibCnrs dès que vous enregistrez un autre domaine.</p>
        <p>A tout moment, vous pouvez changer votre domaine favori.</p>`,
        save: 'Enregistrer',
        saveSuccess: 'Domaine enregistré',
        title: 'Mon profil',
    },
};

export default translate(Profile, 'Profile');
