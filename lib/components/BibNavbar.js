import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import LanguageSelector from '../containers/LanguageSelector';
import translate from '../higherOrderComponents/translate';
import NavItem from './NavItem';

const BibNavbar = ({ location, text, navigate }) => {
    return (
        <Navbar fluid>
            <Nav bsStyle="tabs" activeKey={location} onSelect={navigate}>
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
                <NavItem
                    className="nav-item nav-metadore"
                    eventKey={'metadore'}
                    onClick={() => navigate('metadore')}
                >
                    {text.metadore}
                </NavItem>

                <Navbar.Form pullRight>
                    <LanguageSelector />
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
    navigate: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
};

BibNavbar.defaultProps = {
    text: {
        search: 'Rechercher :',
        article: 'Un article',
        title: 'Une revue, un ouvrage',
        db: 'Une base de données',
        metadore: 'Données de recherche',
        close: 'Fermer',
        connect: 'Connexion',
        disconnect: 'Déconnexion',
        profile: 'Préférences',
    },
};

export default translate(BibNavbar);
