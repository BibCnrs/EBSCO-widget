import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Collapse, Well } from 'react-bootstrap';

import translate from '../higherOrderComponents/translate';
import FavouriteResourceList from '../containers/FavouriteResourceList';
import PersonalResourceList from '../containers/PersonalResourceList';
import FormFavouriteResource from '../containers/FormFavouriteResource';
import BibButton from './BibButton';
import addTooltip from '../higherOrderComponents/addTooltip';
const TooltipButton = addTooltip(BibButton);

const getIconType = open => {
    if (open) {
        return { name: 'chevron-down' };
    }

    return { name: 'chevron-right' };
};

const Profile = ({ text }) => {
    const [displayInfo, setDisplayInfo] = useState(true);
    const [openPersonalResource, setOpenPersonalResource] = useState(false);

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
                            <h4>
                                {text.favouriteResourcesTab}
                                <TooltipButton
                                    className="more"
                                    icon={{
                                        name: 'question',
                                    }}
                                    tooltipPlacement="bottom"
                                    tooltip="liste des articles, des revues ou des bases de données bookmarqués depuis BibCnrs"
                                />
                            </h4>
                            <FavouriteResourceList />
                        </div>
                        <div className="profile-right">
                            <h4>
                                {text.personalResourceTab}
                                <TooltipButton
                                    className="more"
                                    icon={{
                                        name: 'question',
                                    }}
                                    tooltipPlacement="bottom"
                                    tooltip="liste des ressources bookmarquées manuellement hors BibCnrs"
                                />
                                <BibButton
                                    className="more"
                                    bsStyle="default"
                                    onClick={() =>
                                        setOpenPersonalResource(
                                            !openPersonalResource,
                                        )
                                    }
                                    icon={{
                                        name: openPersonalResource
                                            ? 'minus'
                                            : 'plus',
                                    }}
                                />
                            </h4>
                            {openPersonalResource === true ? (
                                <FormFavouriteResource />
                            ) : (
                                ''
                            )}
                            <PersonalResourceList />
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
