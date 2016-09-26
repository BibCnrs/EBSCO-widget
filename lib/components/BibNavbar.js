import React, { PropTypes } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Icon from 'react-fa';

import LanguageSelector from '../containers/LanguageSelector';
import translate from '../higherOrderComponents/translate';
import NavItem from './NavItem';

const BibNavbar = ({ location, fullScreen, logged, dbUrl, text, logout, showLogin, navigate, setFullScreen }) => {
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
                        dbUrl ? (
                            <NavItem
                                className="nav-item nav-db"
                                eventKey={'db'}
                                onClick={() =>  navigate('db')}
                            >
                                {text.db}
                            </NavItem>
                        ) : (<span/>)
                    }
                </Nav>
                <Nav pullRight>
                    <Navbar.Form pullLeft>
                        <LanguageSelector/>
                    </Navbar.Form>
                    {logged ? (
                        <NavItem onClick={() => logout()}>
                            <span>{text.disconnect}</span>
                        </NavItem>
                    ): (
                        <NavItem
                            onClick={() => showLogin()}
                            tooltip={text.connect}
                        >
                            <span>{text.connect}</span>
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
    dbUrl: PropTypes.string.isRequired,
    text: PropTypes.object,
    logout: PropTypes.func.isRequired,
    showLogin: PropTypes.func.isRequired,
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
        disconnect: 'Déconnexion'
    }
};

export default translate(BibNavbar);
