import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'react-bootstrap';

import Error from '../containers/Error';

import Profile from '../containers/Profile';
import Header from '../containers/Header';

const App = ({ children }) => {
    return (
        <div className="ebsco-widget">
            <Header />
            <Profile />
            <Error />
            <Grid fluid>{children}</Grid>
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired,
};

export default App;
