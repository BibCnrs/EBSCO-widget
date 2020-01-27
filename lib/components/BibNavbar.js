import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Icon from 'react-fa';

import LanguageSelector from '../containers/LanguageSelector';
import translate from '../higherOrderComponents/translate';
import NavItem from './NavItem';

const BibNavbar = ({ location, text, navigate }) => {
    const dot = <Icon name="circle" className="dot" />;

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
                    {location === 'article' ? dot : null}
                    {text.article}
                </NavItem>
                <NavItem
                    className="nav-item nav-publication"
                    eventKey={'publication'}
                    onClick={() => navigate('publication')}
                >
                    {location === 'publication' ? dot : null}
                    {text.title}
                </NavItem>
                <NavItem
                    className="nav-item nav-db"
                    eventKey={'database'}
                    onClick={() => navigate('database')}
                >
                    {location === 'database' ? dot : null}
                    {text.db}
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
