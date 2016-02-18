import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import BibButton from './BibButton';

import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
const BibNavbar = ({ pathname, logout }) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <span>Recherche</span>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    {pathname == '/' ?
                        <LinkContainer to={{ pathname: '/advancedEDS' }}>
                            <NavItem ><BibButton onClick={() => null} bsStyle="link" tooltip="plein écran" icon={{name: 'expand'}}/></NavItem>
                        </LinkContainer>
                    :
                        <IndexLinkContainer to='/'>
                            <NavItem ><BibButton onClick={() => null} bsStyle="link" tooltip="fermer" icon={{name: 'compress'}}/></NavItem>
                        </IndexLinkContainer>
                    }
                    <NavItem><BibButton onClick={() => logout()} bsStyle="link" tooltip="déconnexion" icon={{name: 'sign-out'}}/></NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

BibNavbar.propTypes = {
};

export default BibNavbar;
