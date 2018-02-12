import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'react-bootstrap';

import Error from '../containers/Error';
import Authentication from '../containers/Authentication';
import Profile from '../containers/Profile';

const App = ({ children }) => {

    return (
        <div className="ebsco-widget">
            <Authentication/>
            <Profile/>
            <Error/>
            <Grid>{children}</Grid>
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;
