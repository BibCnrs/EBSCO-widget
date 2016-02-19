import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';

import Loader from '../containers/Loader';
import Error from '../containers/Error';
import Notice from '../containers/Notice';

const App = ({ children }) => {

    return (
        <div className="ebsco-widget">
            <Error/>
            <Loader/>
            <Notice/>
            <Grid>{children}</Grid>
        </div>
    );
};

export default App;
