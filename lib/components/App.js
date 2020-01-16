import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'react-bootstrap';

import Error from '../containers/Error';
import Authentication from '../containers/Authentication';
import Profile from '../containers/Profile';
import Header from '../containers/Header';

const App = ({ children, isJanusAccount = false }) => {
    return (
        <div className="ebsco-widget">
            <Header />
            <Authentication />

            <Error />
            <Grid fluid className="grid">
                {children}
                {isJanusAccount ? <Profile /> : null}
            </Grid>
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired,
    isJanusAccount: PropTypes.bool,
};

export default App;
