import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Icon from 'react-fa';

import LanguageSelector from '../containers/LanguageSelector';
import translate from '../higherOrderComponents/translate';
import NavItem from './NavItem';


const BibNavbar = ({ location, fullScreen, logged, text, logout, showLogin, showProfile, showProfileButton, navigate, setFullScreen }) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Toggle />
                <Navbar.Brand>
                    { text.search }
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav bsStyle="pills" activeKey={location}>
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
                    {
                        <NavItem
                            className="nav-item nav-db"
                            eventKey={'database'}
                            onClick={() =>  navigate('database')}
                        >
                            {text.db}
                        </NavItem>
                    }
                </Nav>
                <Nav pullRight>
                    <Navbar.Form pullLeft>
                        <LanguageSelector/>
                    </Navbar.Form>
                    {logged ? (
                        <NavItem
                            className="connection"
                            onClick={() => logout()}
                        >
                            <span>{text.disconnect}</span>
                        </NavItem>
                    ): (
                        <NavItem
                             className="connection"
                            onClick={() => showLogin()}
                        >
                            <span>{text.connect}</span>
                        </NavItem>
                    )}
                    {logged && showProfileButton && (
                        <NavItem
                            tooltip={text.profile}
                            onClick={() => showProfile()}
                        >
                            <Icon name="user"/>
                        </NavItem>
                    )}
                    {fullScreen ?
                        <NavItem
                            tooltip={text.close}
                            onClick={() => setFullScreen(false)}
                        >
                            <Icon name="compress"/>
                        </NavItem>
                    :
                        <NavItem
                            tooltip={text.fullScreen}
                            onClick={() => setFullScreen(true)}
                        >
                            <Icon name="expand"/>
                        </NavItem>
                    }
                </Nav>
            </Navbar.Collapse>
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
    setFullScreen: PropTypes.func.isRequired
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
    }
};

export default translate(BibNavbar);
