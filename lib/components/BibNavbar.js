import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import LanguageSelector from '../containers/LanguageSelector';
import translate from '../higherOrderComponents/translate';
import NavItem from './NavItem';
import Connection from '../containers/Connection';

const BibNavbar = ({ location, text, navigate,  }) => {
    return (
        <Navbar fluid>
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
                    <Connection />
                </Navbar.Form>
            </Nav>
        </Navbar>
    );
};

BibNavbar.propTypes = {
    location: PropTypes.string.isRequired,
    text: PropTypes.object,
    logout: PropTypes.func,
    showLogin: PropTypes.func,
    showProfile: PropTypes.func,
    showProfileButton: PropTypes.bool,
    navigate: PropTypes.func.isRequired,
};

BibNavbar.defaultProps = {
    text: {
        search: 'Rechercher :',
        article: 'Un article',
        title: 'Une revue, un ouvrage',
        db: 'Une base de données',
        close: 'Fermer',
        connect: 'Connexion',
        disconnect: 'Déconnexion',
        profile: 'Préférences',
    },
};

export default translate(BibNavbar);
