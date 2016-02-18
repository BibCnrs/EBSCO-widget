import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Icon from 'react-fa';

import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
const Loader = ({ pathname, logout }) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <span>EDS</span>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    {pathname == '/' ?
                        <LinkContainer to={{ pathname: '/advancedEDS' }}>
                            <NavItem ><Icon name="expand"/> Recherche Avancée</NavItem>
                        </LinkContainer>
                    :
                        <IndexLinkContainer to='/'>
                            <NavItem ><Icon name="compress"/> Close</NavItem>
                        </IndexLinkContainer>
                    }
                    <NavItem onClick={() => logout()}><Icon name="sign-out"/> Logout</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

Loader.propTypes = {
    open: PropTypes.bool.isRequired
};

export default Loader;
