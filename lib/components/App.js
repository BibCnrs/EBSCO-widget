import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';

import Error from '../containers/Error';
import Authentication from '../containers/Authentication';

const App = ({ children }) => {

    return (
        <div className="ebsco-widget">
            <Authentication/>
            <Error/>
            <Grid>{children}</Grid>
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;
