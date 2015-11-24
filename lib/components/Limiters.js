'use strict';

import React, { PropTypes } from 'react';
import FullTextLimiter from '../containers/FullTextLimiter';
import PublicationDateLimiter from '../containers/PublicationDateLimiter';

const Limiters = () => (
    <div className="limiters">
        <h4>Limiter à</h4>
        <FullTextLimiter/>
        <PublicationDateLimiter/>
    </div>
);

Limiters.propTypes = {
};

export default Limiters;
