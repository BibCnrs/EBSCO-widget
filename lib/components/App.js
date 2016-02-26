import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';

import Loader from '../containers/Loader';
import Error from '../containers/Error';

const App = ({ children }) => {

    return (
        <div className="ebsco-widget">
            <Error/>
            <Loader/>
            <Grid>{children}</Grid>
        </div>
    );
};

export default App;
