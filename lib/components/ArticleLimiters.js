import React, { PropTypes } from 'react';

import FullTextLimiter from '../containers/FullTextLimiter';
import PeerReviewedArticleLimiter from '../containers/PeerReviewedArticleLimiter';
import PublicationDateLimiter from '../containers/PublicationDateLimiter';

const ArticleLimiters = () => {
    return (
        <div className="limiters">
            <FullTextLimiter/>
            <PeerReviewedArticleLimiter/>
            <PublicationDateLimiter/>
        </div>
    );
};

ArticleLimiters.propTypes = {
};

export default ArticleLimiters;
