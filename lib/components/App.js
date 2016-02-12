import React, { PropTypes } from 'react';
import Loader from '../containers/Loader';
import Error from '../containers/Error';


const App = ({ children }) => {

    return (
        <div className="ebsco-widget">
            <Error/>
            <Loader/>
            <div>{children}</div>
        </div>
    );
};

export default App;
