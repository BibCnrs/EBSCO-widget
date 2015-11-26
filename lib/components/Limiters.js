'use strict';

import React, { PropTypes } from 'react';
import FullTextLimiter from '../containers/FullTextLimiter';
import PeerReviewedLimiter from '../containers/PeerReviewedLimiter';
import PublicationDateLimiter from '../containers/PublicationDateLimiter';
import AuthorLimiter from '../containers/AuthorLimiter';
import JournalNameLimiter from '../containers/JournalNameLimiter';
import TitleLimiter from '../containers/TitleLimiter';

const Limiters = () => (
    <div className="limiters">
        <h4>Limiter à</h4>
        <FullTextLimiter/>
        <PeerReviewedLimiter/>
        <PublicationDateLimiter/>
        <AuthorLimiter/>
        <JournalNameLimiter/>
        <TitleLimiter/>
    </div>
);

Limiters.propTypes = {
};

export default Limiters;
