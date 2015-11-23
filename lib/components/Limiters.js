'use strict';

import React, { PropTypes } from 'react';
import FullTextLimiter from '../containers/FullTextLimiter';

const Limiters = () => (
    <div className="limiters">
        <h4>Limiter à</h4>
        <FullTextLimiter/>
    </div>
);

Limiters.propTypes = {
};

export default Limiters;
