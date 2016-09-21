import React from 'react';

import createCheckBoxLimiterContainer from '../containers/createCheckBoxLimiterContainer';
import PublicationDateLimiter from '../containers/PublicationDateLimiter';
import PublicationIdLimiter from '../containers/PublicationIdLimiter';

const FullTextLimiter = createCheckBoxLimiterContainer('article', 'fullText');
const PeerReviewedArticleLimiter = createCheckBoxLimiterContainer('article', 'peerReviewedArticle');

const ArticleLimiters = () => {
    return (
        <div className="limiters">
            <FullTextLimiter/>
            <PeerReviewedArticleLimiter/>
            <PublicationDateLimiter/>
            <PublicationIdLimiter/>
        </div>
    );
};

ArticleLimiters.propTypes = {
};

export default ArticleLimiters;
