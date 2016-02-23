import React, { PropTypes } from 'react';
import PeerReviewedPublicationLimiter from '../containers/PeerReviewedPublicationLimiter';

const PublicationLimiters = () => (
    <div className="limiters">
        <h4>Limiter à</h4>
        <PeerReviewedPublicationLimiter/>
    </div>
);

PublicationLimiters.propTypes = {
};

export default PublicationLimiters;
