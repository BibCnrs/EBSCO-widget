import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Icon from 'react-fa';

import LanguageSelector from '../containers/LanguageSelector';
import translate from '../higherOrderComponents/translate';

const BibNavbar = ({ location, fullScreen, text, logout, navigate, setFullScreen }) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">{text.search}</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav activeKey={location}>
                    <NavItem
                        eventKey={'article'}
                        onClick={() => navigate('article')}
                    >
                        {text.article}
                    </NavItem>
                    <NavItem
                        eventKey={'publication'}
                        onClick={() => navigate('publication')}
                    >
                        {text.title}
                    </NavItem>
                    <NavItem
                        eventKey={'a2z'}
                        onClick={() => navigate('a2z')}
                    >
                        {text.a2z}
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <Navbar.Form pullLeft>
                        <LanguageSelector/>
                    </Navbar.Form>
                    {fullScreen ?
                        <NavItem onClick={() => setFullScreen(false)}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="close">{text.close}</Tooltip>}>
                                <Icon name="compress"/>
                            </OverlayTrigger>
                        </NavItem>
                    :
                        <NavItem onClick={() => setFullScreen(true)}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="full-screen">{text.fullScreen}</Tooltip>}>
                                <Icon name="expand"/>
                            </OverlayTrigger>
                        </NavItem>
                    }
                    <NavItem onClick={() => logout()}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="disconnect">{text.disconnect}</Tooltip>}>
                            <Icon name="sign-out"/>
                        </OverlayTrigger>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

BibNavbar.propTypes = {
    location: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setFullScreen: PropTypes.func.isRequired
};

BibNavbar.defaultProps = {
    text: {
        article: 'Article',
        title: 'Titre',
        a2z: 'A à Z',
        search: 'Recherche',
        close: 'fermer',
        fullScreen: 'plein écran',
        disconnect: 'déconnexion'
    }
};

export default translate(BibNavbar);
