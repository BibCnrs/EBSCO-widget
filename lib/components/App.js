import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';

import Loader from '../containers/Loader';
import Error from '../containers/Error';
import Authentication from '../containers/Authentication';

const App = ({ children }) => {

    return (
        <div className="ebsco-widget">
            <Authentication/>
            <Error/>
            <Loader/>
            <Grid>{children}</Grid>
        </div>
    );
};

export default App;
