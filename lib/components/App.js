import React, { PropTypes } from 'react';
import Loader from '../containers/Loader';
import Error from '../containers/Error';
import { Grid } from 'react-bootstrap';

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
