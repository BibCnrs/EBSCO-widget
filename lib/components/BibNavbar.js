import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Icon from 'react-fa';

const BibNavbar = ({ location, fullScreen, logout, navigate, setFullScreen }) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Recherche</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav activeKey={location}>
                    <NavItem
                        eventKey={'article'}
                        onClick={() => navigate('article')}
                    >
                        Article
                    </NavItem>
                    <NavItem
                        eventKey={'publication'}
                        onClick={() => navigate('publication')}
                    >
                        Publication
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    {fullScreen ?
                        <NavItem onClick={() => setFullScreen(false)}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="close">fermer</Tooltip>}>
                                <Icon name="compress"/>
                            </OverlayTrigger>
                        </NavItem>
                    :
                        <NavItem onClick={() => setFullScreen(true)}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="full-screen">plein écran</Tooltip>}>
                                <Icon name="expand"/>
                            </OverlayTrigger>
                        </NavItem>
                    }
                    <NavItem onClick={() => logout()}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="disconnect">déconnexion</Tooltip>}>
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

export default BibNavbar;
