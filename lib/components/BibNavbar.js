import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import BibButton from './BibButton';

const BibNavbar = ({ location, fullScreen, logout, navigate, setFullScreen }) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <div>{`Recherche`}</div>
                    <div>{`${location}`}</div>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem ><BibButton onClick={() => navigate('article')} label="Article" bsStyle="link" icon={{name: ''}}/></NavItem>
                    <NavItem ><BibButton onClick={() => navigate('publication')} label="Publication" bsStyle="link" icon={{name: ''}}/></NavItem>
                </Nav>
                    <Nav pullRight>
                        {fullScreen ?
                            <NavItem ><BibButton onClick={() => setFullScreen(false)} bsStyle="link" tooltip="fermer" icon={{name: 'compress'}}/></NavItem>
                        :
                            <NavItem ><BibButton onClick={() => setFullScreen(true)} bsStyle="link" tooltip="plein écran" icon={{name: 'expand'}}/></NavItem>
                        }
                        <NavItem><BibButton onClick={() => logout()} bsStyle="link" tooltip="déconnexion" icon={{name: 'sign-out'}}/></NavItem>
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
