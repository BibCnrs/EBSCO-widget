import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Icon from 'react-fa';

import LanguageSelector from '../containers/LanguageSelector';
import translate from '../higherOrderComponents/translate';
import NavItem from './NavItem';
import { BibButton } from './BibButton';

const BibNavbar = ({
    location,
    fullScreen,
    logged,
    text,
    logout,
    showLogin,
    showProfile,
    showProfileButton,
    navigate,
    setFullScreen,
}) => {
    return (
        <Navbar>
            <Nav bsStyle="tabs" activeKey={location} onSelect={navigate}>
                <Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Brand>{text.search}</Navbar.Brand>
                </Navbar.Header>
                <NavItem
                    className="nav-item nav-article"
                    eventKey={'article'}
                    onClick={() => navigate('article')}
                >
                    {text.article}
                </NavItem>
                <NavItem
                    className="nav-item nav-publication"
                    eventKey={'publication'}
                    onClick={() => navigate('publication')}
                >
                    {text.title}
                </NavItem>
                <NavItem
                    className="nav-item nav-db"
                    eventKey={'database'}
                    onClick={() => navigate('database')}
                >
                    {text.db}
                </NavItem>
                <Navbar.Form pullRight>
                    <LanguageSelector />
                    {logged ? (
                        <BibButton
                            bsStyle="link"
                            className="connection"
                            onClick={() => logout()}
                            label={text.disconnect}
                        />
                    ) : (
                        <BibButton
                            bsStyle="link"
                            className="connection"
                            onClick={() => showLogin()}
                            label={text.connect}
                        />
                    )}
                    {logged &&
                        showProfileButton && (
                            <NavItem
                                tooltip={text.profile}
                                onClick={() => showProfile()}
                            >
                                <Icon name="user" />
                            </NavItem>
                        )}
                    {fullScreen ? (
                        <BibButton
                            bsStyle="link"
                            tooltip={text.close}
                            onClick={() => setFullScreen(false)}
                            icon={{ name: 'compress' }}
                        />
                    ) : (
                        <BibButton
                            bsStyle="link"
                            tooltip={text.fullScreen}
                            onClick={() => setFullScreen(true)}
                            icon={{ name: 'expand' }}
                        />
                    )}
                </Navbar.Form>
            </Nav>
        </Navbar>
    );
};

BibNavbar.propTypes = {
    location: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    logged: PropTypes.bool.isRequired,
    text: PropTypes.object,
    logout: PropTypes.func.isRequired,
    showLogin: PropTypes.func.isRequired,
    showProfile: PropTypes.func.isRequired,
    showProfileButton: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    setFullScreen: PropTypes.func.isRequired,
};

BibNavbar.defaultProps = {
    text: {
        search: 'Rechercher :',
        article: 'Un article',
        title: 'Une revue, un ouvrage',
        db: 'Une base de données',
        close: 'Fermer',
        fullScreen: 'Plein écran',
        connect: 'Connexion',
        disconnect: 'Déconnexion',
        profile: 'Préférences',
    },
};

export default translate(BibNavbar);
