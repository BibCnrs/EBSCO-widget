import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'react-bootstrap';

import translate from '../higherOrderComponents/translate';
import Error from '../containers/Error';
import Profile from '../containers/Profile';
import Header from '../containers/Header';

const App = ({
    children,
    isJanusAccount = false,
    isInistAccount = false,
    text,
}) => {
    return (
        <div className="ebsco-widget">
            <Header />
            <Error />
            <Grid fluid className="grid">
                {children}
                {isJanusAccount ? <Profile /> : null}
                {isInistAccount && (
                    <div className="inist-message">
                        <p>{text.inistExplanation}</p>
                    </div>
                )}
            </Grid>
        </div>
    );
};

App.propTypes = {
    children: PropTypes.array.isRequired,
    isJanusAccount: PropTypes.bool,
    isInistAccount: PropTypes.bool,
    text: PropTypes.object,
};

export default translate(App, 'App');
